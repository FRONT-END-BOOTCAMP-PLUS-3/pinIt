const Icon = ({
  id,
  color = 'white',
  width = 24,
  height = 24,
}: {
  id: string;
  color?: string;
  width?: number;
  height?: number;
}) => {
  return (
    <svg width={`${width}px`} height={`${height}px`} style={{ color }}>
      <use href={`/stack.svg#${id}`} />
    </svg>
  );
};

export default Icon;
