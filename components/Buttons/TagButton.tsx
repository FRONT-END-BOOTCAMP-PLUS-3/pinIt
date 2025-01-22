import styles from './TagButton.module.scss';

const TagButton = ({
  tag,
  checked,
  onChangeTagButton,
}: {
  tag: string;
  checked: boolean;
  onChangeTagButton: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <>
      <div>
        <input
          type='checkbox'
          id={tag}
          className={styles.checkbox}
          checked={checked}
          onChange={onChangeTagButton}
        />
        <label htmlFor={tag} className={styles.label}>
          {tag}
        </label>
      </div>
    </>
  );
};

export default TagButton;
