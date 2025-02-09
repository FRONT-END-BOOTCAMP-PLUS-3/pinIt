import style from '@/app/(anon)/challenge/_component/PinJoinedChallengeContainer.module.scss';
import { ShowPinList } from '@/application/usecases/pin/dto/ShowPinListDto';
import PinCard from '@/components/Card/PinCard/PinCard';
import { useEffect, useState } from 'react';
import { fetchMyId } from '../_api/showMyId';
import { ComboBoxOption } from './ComboBox';
import SelectablePinCard from '@/components/Card/SelectablePinCard/SelectablePinCard';

const PinJoinedChallengeContainer = ({
  selectedOption,
  isFiltering,
  setSelectedPins,
}: {
  selectedOption: ComboBoxOption | null;
  isFiltering: boolean;
  setSelectedPins: React.Dispatch<React.SetStateAction<ShowPinList[]>>;
}) => {
  const [pinData, setPinData] = useState<ShowPinList[]>([]);
  const [isChecked, setIsChecked] = useState<{ [key: string]: boolean }>({});

  // 챌린지에 참여한 핀 리스트 데이터 패치 함수
  async function fetchChallengedPinList() {
    if (!selectedOption) return;

    const response = await fetch('/api/show-challenged-pin-list', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: selectedOption.id }),
    });

    if (!response.ok) {
      console.log('해당 챌린지에 참여 중인 핀이 없습니다.');
      setPinData([]);
      return;
    }

    const data = await response.json();
    setPinData(data);
  }

  // 챌린지에 참여한 핀 리스트 데이터 렌더링
  useEffect(() => {
    fetchChallengedPinList();
  }, [selectedOption]);

  // 챌린지에 참여한 핀 중 내가 등록한 핀 데이터 렌더링
  useEffect(() => {
    async function filterChallengedPinList() {
      const myProfile = await fetchMyId();
      const myId = myProfile.id;
      if (!myId) return;

      setPinData((prevPins) => prevPins.filter((pin) => pin.userId === myId));
    }

    if (isFiltering) {
      filterChallengedPinList();
    } else {
      fetchChallengedPinList();
    }
  }, [isFiltering]);

  // isFiltering이 변경되면 isChecked 상태 초기화
  useEffect(() => {
    setIsChecked({});
  }, [isFiltering]);

  const handleSelectablePin = (item: ShowPinList) => {
    setSelectedPins((prevSelectedPins) => {
      const isSelected = prevSelectedPins.some((pin) => pin.id === item.id);

      if (isSelected) {
        return prevSelectedPins.filter((pin) => pin.id !== item.id);
      } else {
        return [...prevSelectedPins, item];
      }
    });

    setTimeout(() => {
      setIsChecked((prev) => ({
        ...prev,
        [item.id]: !prev[item.id],
      }));
    }, 0);
  };

  return (
    <div className={style.list_container}>
      {pinData?.map((pin) =>
        isFiltering ? (
          <SelectablePinCard
            key={pin.id}
            alt={pin.placeName}
            url={pin.image}
            location={pin.placeName}
            address={pin.address}
            checked={isChecked[pin.id] || false}
            onClickCheckButton={() => handleSelectablePin(pin)}
          />
        ) : (
          <PinCard
            id={pin.id}
            key={pin.id}
            url={pin.image}
            alt={pin.placeName}
            location={pin.placeName}
            address={pin.address}
            liked={pin.isLiked}
            onClickLikeButton={() => {
              console.log('클릭');
            }}
          />
        ),
      )}
    </div>
  );
};

export default PinJoinedChallengeContainer;
