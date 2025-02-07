import style from '@/app/(anon)/challenge/_component/MyPinsContainer.module.scss';
import { MyPinDto } from '@/application/usecases/challenge/dto/MyPinDto';
import SelectablePinCard from '@/components/Card/SelectablePinCard/SelectablePinCard';
import { useEffect } from 'react';

const MyPinsContainer = ({
  myPins,
  setMyPins,
  selectedPins,
  setSelectedPins,
}: {
  myPins: MyPinDto[];
  setMyPins: (pins: MyPinDto[]) => void;
  selectedPins: MyPinDto[];
  setSelectedPins: React.Dispatch<React.SetStateAction<MyPinDto[]>>;
}) => {
  useEffect(() => {
    async function fetchMyPinList() {
      const response = await fetch('/api/show-my-pins-list');

      if (!response.ok) {
        setMyPins([]);
        return;
      }

      const data = await response.json();
      setMyPins(data);
    }

    fetchMyPinList();
  }, [setMyPins]);

  const handleSelectablePin = (item: MyPinDto) => {
    setSelectedPins((prevSelectedPins) => {
      const isSelected = prevSelectedPins.some((pin) => pin.id === item.id);

      if (isSelected) {
        return prevSelectedPins.filter((pin) => pin.id !== item.id);
      } else {
        return [...prevSelectedPins, item];
      }
    });
  };

  return (
    <div className={style.pin_container}>
      {myPins?.map((item) => (
        <SelectablePinCard
          key={item.id}
          url={item.image}
          alt={item.placeName}
          location={item.placeName}
          address={item.address}
          checked={selectedPins.some((pin) => pin.id === item.id)}
          onClickCheckButton={() => handleSelectablePin(item)}
        />
      ))}
    </div>
  );
};

export default MyPinsContainer;
