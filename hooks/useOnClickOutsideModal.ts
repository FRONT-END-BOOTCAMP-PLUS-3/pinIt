import { useEffect } from 'react';

const useOnClickOutsideModal = (
  ref: React.RefObject<HTMLElement | null>,
  handler: () => void,
) => {
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (!ref.current || ref.current.contains(e.target as Node)) return;

      handler();
    };
    document.addEventListener('click', listener);

    return () => {
      document.removeEventListener('click', listener);
    };
  }, [ref, handler]);
};

export default useOnClickOutsideModal;
