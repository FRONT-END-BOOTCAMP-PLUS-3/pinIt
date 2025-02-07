'use client';

import TagButton from '@/components/Buttons/TagButton';
import styles from '../pinForm.module.scss';

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
  '🖼️ 전시회',
  '☕️ 카페',
  '🏞️ 풍경',
  '🌤️ 하늘',
  '🦢 호수',
];

interface TagSelectorProps {
  selectedTags: string[];
  onChange: (tags: string[]) => void;
}

const TagSelector: React.FC<TagSelectorProps> = ({
  selectedTags,
  onChange,
}) => {
  const handleTagChange = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag) // 선택 해제
      : [...selectedTags, tag]; // 선택 추가

    onChange(newTags); // 부모로 변경된 태그 목록 전달
  };

  return (
    <div className={styles.tagSelectorContainer}>
      <h3 className={styles.title}>장소에 맞는 태그를 선택하세요!</h3>
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
