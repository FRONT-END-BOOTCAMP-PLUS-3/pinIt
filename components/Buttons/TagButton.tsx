import styles from './TagButton.module.scss';

const TagButton = (tag: string) => {
  return (
    <>
      <div key={tag.id}>
        <input
          type='checkbox'
          id={tag.id}
          className={styles.checkbox}
          // checked={selected.includes(tag.id)}
          // onChange={() => onChange(tag.id)}
        />
        <label htmlFor={tag.id} className={styles.label}>
          {/* {tag.label} */}
        </label>
      </div>
    </>
  );
};

export default TagButton;
