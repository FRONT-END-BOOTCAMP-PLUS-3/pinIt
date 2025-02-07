'use client';

import styles from '../pinForm.module.scss';

interface TextAreaProps {
  value: string;
  onChange: (text: string) => void; // ✅ 부모로 텍스트 전달
}

const TextArea: React.FC<TextAreaProps> = ({ value, onChange }) => {
  const maxLength = 100;

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value); // ✅ 부모로 입력된 텍스트 전달
  };

  return (
    <div className={styles.textAreaContainer}>
      <textarea
        placeholder='사진과 함께 이야기를 적어주세요!'
        maxLength={maxLength}
        rows={3}
        value={value}
        onChange={handleChange}
      />
      <span className={styles.characterCount}>
        {value.length}/{maxLength}
      </span>
    </div>
  );
};

export default TextArea;
