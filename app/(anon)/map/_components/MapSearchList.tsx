'use client';

import { Location, SelectedLocation } from '../page';
import styles from '../ViewMap.module.scss';
// import { Location, SelectedLocation } from './MapSection';

interface LocationSearchProps {
  onClose: () => void;
  onSelectLocation: (location: SelectedLocation) => void;
  searchList: Location[]; // 검색 결과 리스트 (배열)
}

const MapSearchList: React.FC<LocationSearchProps> = ({
  onClose,
  onSelectLocation,
  searchList,
}) => {
  const handleSelectLocation = (location: SelectedLocation) => {
    onSelectLocation({
      name: location.name,
      address: location.address,
      latitude: location.latitude,
      longitude: location.longitude,
    });
    onClose(); // 팝업 닫기
  };

  return (
    <>
      <ul
        className={`${styles.searchDrop} ${searchList.length > 0 ? '' : styles.hidden}`}
      >
        {searchList.map((location) => {
          return (
            <li
              key={location.id}
              className={styles.locationItem}
              onClick={() => handleSelectLocation(location)}
            >
              <strong className={styles.locationName}>{location.name}</strong>
              <p className={styles.locationAddress}>{location.address}</p>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default MapSearchList;
