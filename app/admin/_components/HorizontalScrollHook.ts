import { useRef, useEffect } from 'react';

const HorizontalScrollHook = () => {
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const scrollContentTopRef = useRef<HTMLDivElement>(null);
  const scrollContentBottomRef = useRef<HTMLDivElement>(null);
  const scrollHeaderTopRef = useRef<HTMLDivElement>(null);
  const scrollHeaderBottomRef = useRef<HTMLDivElement>(null);
  const tableWrapperRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const updateWidth = () => {
      const tableWidth = tableWrapperRef.current?.scrollWidth || 0;
      scrollContentTopRef.current?.style.setProperty('--scroll-width', `${tableWidth}px`);
      scrollContentBottomRef.current?.style.setProperty('--scroll-width', `${tableWidth}px`);
    };
  
    updateWidth(); // 초기값 설정
    window.addEventListener('resize', updateWidth); // 리사이즈 이벤트 바인딩
  
    return () => {
      window.removeEventListener('resize', updateWidth); // 이벤트 제거
    };
  }, []);
  
  const syncScroll = (source: "scroll_top" | "scroll_bottom" | "table") => {
    if (scrollHeaderTopRef.current && tableWrapperRef.current) {
      if (source === "scroll_top") {
        tableWrapperRef.current.scrollLeft = scrollHeaderTopRef.current.scrollLeft;
      } else {
        scrollHeaderTopRef.current.scrollLeft = tableWrapperRef.current.scrollLeft;
      }
    }
    if (scrollHeaderBottomRef.current && tableWrapperRef.current) {
      if (source === "scroll_bottom") {
        tableWrapperRef.current.scrollLeft = scrollHeaderBottomRef.current.scrollLeft;
      } else {
        scrollHeaderBottomRef.current.scrollLeft = tableWrapperRef.current.scrollLeft;
      }
    }
  };

  return {
    scrollWrapperRef,
    scrollContentTopRef,
    scrollContentBottomRef,
    scrollHeaderTopRef,
    scrollHeaderBottomRef,
    tableWrapperRef,
    syncScroll,
  };
}

export default HorizontalScrollHook;