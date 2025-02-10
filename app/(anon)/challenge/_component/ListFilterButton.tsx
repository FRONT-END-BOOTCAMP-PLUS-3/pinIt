import style from '@/app/(anon)/challenge/_component/ListFilterButton.module.scss';
import { ComboBoxOption } from './ComboBox';

const ListFilterButton = ({
  selectedOption,
  isFilteringMyPins,
  onClickFilter,
}: {
  selectedOption: ComboBoxOption | null;
  isFilteringMyPins: boolean;
  onClickFilter: () => void;
}) => {
  // 오늘 날짜가 selectedOption에 포함되는지 확인
  const isSelectedOptionOngoing =
    selectedOption?.startDate && selectedOption?.endDate
      ? (() => {
          const today = new Date();

          const startDate = new Date(selectedOption.startDate);
          const endDate = new Date(selectedOption.endDate);

          return startDate <= today && today <= endDate;
        })()
      : false;

  const handleFilterClick = () => {
    onClickFilter();
  };

  return (
    <div className={style.button_wrapper}>
      {isSelectedOptionOngoing && (
        <button type='button' onClick={handleFilterClick}>
          {isFilteringMyPins
            ? '모든 리스트 보기'
            : '챌린지에 등록된 내 핀 보기'}
        </button>
      )}
    </div>
  );
};

export default ListFilterButton;
