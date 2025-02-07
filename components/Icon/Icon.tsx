'use client';

import S from '@/components/Icon/Icon.module.scss';

const Icon = ({
  id,
  color = 'white',
  width = 30,
  height = 30,
}: {
  id: string;
  color?: string;
  width?: number;
  height?: number;
}) => {
  return (
    <svg
      className={S.component}
      width={`${width}px`}
      height={`${height}px`}
      style={{ color }}
    >
      <use href={`/stack.svg#${id}`} />
    </svg>
  );
};

export default Icon;
