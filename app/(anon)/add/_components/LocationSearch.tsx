'use client';

import React from 'react';

interface LocationSearchProps {
  onClose: () => void;
}

const LocationSearch: React.FC<LocationSearchProps> = ({ onClose }) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
      }}
    >
      <div
        style={{
          background: 'white',
          padding: '20px',
          borderRadius: '8px',
          width: '90%',
          maxWidth: '400px',
        }}
      >
        <h2>장소 검색</h2>
        <input
          type='text'
          placeholder='장소를 검색해보세요.'
          style={{ width: '100%', marginBottom: '16px' }}
        />
        <button type='button' onClick={onClose} style={{ marginTop: '16px' }}>
          닫기
        </button>
      </div>
    </div>
  );
};

export default LocationSearch;
