'use client';

import React, { useState } from 'react';
import TagButton from '@/components/Buttons/TagButton';
import styles from '../add.module.scss';

const TAGS = [
  '🚶거리',
  '🏛️ 건축물',
  '🚞 기차',
  '🌷 꽃',
  '🌲 나무',
  '❄️ 눈',
  '🌉 다리',
  '🍁 단풍',
  '🌙 달',
  '🚥 도로',
  '🛍️ 쇼핑센터',
  '🪨 동굴',
  '🌊 바다',
  '⛰️ 산',
  '🌳 숲',
  '🪴 식물',
  '🌅 일출',
  '🌄 일몰',
  '🌃 야경',
  '🖼️️ 전시회',
  '☕️ 카페',
  '🏞️ 풍경',
  '🌤️ 하늘',
  '🦢 호수',
];

const TagSelector: React.FC = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleTagChange = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag)); // 선택 해제
    } else {
      setSelectedTags([...selectedTags, tag]); // 선택 추가
    }
  };

  return (
    <div className={styles.tagSelectorContainer}>
      <h3 className={styles.title}>장소에 맞는 태그를 선택하세요! (선택)</h3>
      <div className={styles.tagsWrapper}>
        {TAGS.map((tag) => (
          <TagButton
            key={tag}
            tag={tag}
            checked={selectedTags.includes(tag)}
            onChangeTagButton={() => handleTagChange(tag)}
          />
        ))}
      </div>
    </div>
  );
};

export default TagSelector;
