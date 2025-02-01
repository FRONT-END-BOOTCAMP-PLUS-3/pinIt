'use client';

import { useEffect, useRef, useState } from 'react';
import styles from '../ViewMap.module.scss';
import PinList from './PinList';

export const MIN_Y = 60; // Bottom Sheet가 최대로 올라갔을 때의 Y값

const PinBox = () => {
  const box = useRef<HTMLDivElement | null>(null);
  const list = useRef<HTMLUListElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [MAX_Y, setMaxY] = useState(0);
  const touchEvent = useRef({
    touchStart: {
      boxY: 0, // box의 터치 시작 시점에서 화면의 y 좌표
      touchY: 0, // 사용자가 손가락으로 터치한 y 좌표
    },
    touchMove: {
      prevTouchY: 0, // 마지막 touchnove 이벤트에서의 y 좌표
      movingDirection: 'none', // 터치 방향 (up 또는 down) prevTouchY < 현재 터치 위치 -> down
    },
    isListAreaTouched: false, // 사용자가 box 내부의 스크롤 가능한 콘텐츠를 터치했는지 여부
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setMaxY(window.innerHeight - 60);
    }
  }, []);

  const handleTouchStart = (e: TouchEvent) => {
    if (!box.current) return;
    const touchY = e.touches[0].clientY; // 처음으로 터치한 손가락의 정보.손가락이 터치된 y좌표
    touchEvent.current.touchStart.boxY = box.current.getBoundingClientRect().y;
    // box.current는 useRef로 생성된 box의 DOM요소, getBoundingClientRect().y는 현재 box의 y좌표(화면에서의 위치) -> box의 현제 위치를 저장, touchmove에서 이 값을 기준으로 얼마나 움직였는지 계산
    touchEvent.current.touchStart.touchY = touchY; // 사용자가 터치한 손가락의 y좌표 저장, touchmove에서 터치 이동량을 계산하는 데 사용
  };

  useEffect(() => {
    const canUserMoveBox = (e: TouchEvent) => {
      const { touchMove, isListAreaTouched } = touchEvent.current; // 터치 이동 정보(이전 위치, 이동 방향), 사용자가 스크롤 가능한 콘텐츠 영역을 터치했는지 여부

      if (!isListAreaTouched) {
        // 콘텐츠 영역이 터치되지 않았다면 이동 가능
        return true;
      }

      if (box.current && box.current.getBoundingClientRect().y !== MIN_Y) {
        // box의 현재 y위치, box가 완전 열린 상태에서의 y값 -> box가 최상단이 아니면 이동 가능하다고 판단
        return true;
      }

      if (!list.current) return false;

      // 아래 방향으로 드래그 했고 콘텐츠가 최상단이면 box를 닫음
      if (
        touchMove.movingDirection === 'down' &&
        list.current.scrollTop <= 10
      ) {
        setIsOpen((prev) => !prev);
      }

      return false; // 위 모든 조건을 통과하지 못하면 box를 이동할 수 없음
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (box.current) {
        // box.current가 존재하는지 확인, useRef를 사용했기 때문에 sheet.current가 null이면 에러 발생할 수 있음
        const { touchStart } = touchEvent.current; // 터치 시작 지점 저장
        touchStart.boxY = box.current.getBoundingClientRect().y; //box의 현재 위치(y좌표)를 가져옴, touchmove와 비교해 얼마나 이동했는지 계산
        touchStart.touchY = e.touches[0].clientY; // 사용자가 터치한 손가락의 y좌표
      }
    };

    // 사용자가 터치 중일 때 실행되는 함수
    const handleTouchMove = (e: TouchEvent) => {
      const { touchStart, touchMove } = touchEvent.current; // 터치 시작 위치, 터치 이동 정보 가져옴
      const currentTouch = e.touches[0]; // 현재 손가락이 위치한 y좌표

      if (touchEvent.current.isListAreaTouched) {
        return; // 리스트 내부 터치 시 box 이동 차단
      }

      if (touchMove.prevTouchY === undefined) {
        touchMove.prevTouchY = touchStart.touchY; // 이전 touchmove 이벤트에서 y좌표가 설정되지 않았다면 touchStart.touchY로 초기화
      }

      if (touchMove.prevTouchY < currentTouch.clientY) {
        touchMove.movingDirection = 'down'; // 현재 터치 위치가 이전 터치 위치보다 크면 아래로 이동
      }

      if (touchMove.prevTouchY > currentTouch.clientY) {
        touchMove.movingDirection = 'up'; // 현재 터치 위치가 이전 터치 위치보다 작으면 위로 이동
      }

      e.preventDefault(); // 리스트가 아닌 경우에만 box 이동
      if (canUserMoveBox(e)) {
        // box가 이동할 수 있는지(스크롤 가능한 영역을 터치했는지 여부) 확인

        const touchOffset = currentTouch.clientY - touchStart.touchY; // 손가락이 터치 시작점에서 얼마나 이동했는지 계산, touchOffset > 0 손가락이 아래로 이동
        let nextBoxY = touchStart.boxY + touchOffset; // 기존 box의 위치(boxY)에서 touchOffset 만큼 이동(사용자가 손가락을 움직인 만큼 box 이동)

        // box가 이동 가능한 범위를 초과하지 않도록 제한
        if (nextBoxY <= MIN_Y) {
          nextBoxY = MIN_Y; // MIN_Y보다 작으면 MIN_Y로 고정(최대로 올라간 상태)
        }

        if (nextBoxY >= MAX_Y) {
          nextBoxY = MAX_Y; // MAX_Y보다 크면 MAX_Y로 고정(최대로 내려간 상태)
        }

        // if (box.current) {
        //   setIsOpen((prev) => !prev); // box가 손가락을 따라 움직임
        // }
      }
    };

    // 사용자가 손가락을 떼었을 때 실행되는 함수
    const handleTouchEnd = () => {
      const { touchMove } = touchEvent.current; // touchEvent.current에서 터치 정보를 가져오고 movingDirection을 사용해 손가락이 위/아래로 움직였는지 판단

      if (box.current) {
        // box.current가 존재하는지 확인
        const currentBoxY = box.current.getBoundingClientRect().y; // 현재 box의 y좌표

        if (currentBoxY !== MIN_Y) {
          // box가 최상단 위치가 아닌 경우 이동
          if (
            touchMove.movingDirection === 'down' ||
            touchMove.movingDirection === 'up'
          ) {
            setIsOpen((prev) => !prev); // 사용자가 스와이프 한 방향을 판단해 경우 box 닫고 열기
          }
        }
      }

      // 터치 상태 초기화
      touchEvent.current = {
        touchStart: {
          boxY: 0,
          touchY: 0,
        },
        touchMove: {
          prevTouchY: 0,
          movingDirection: 'none',
        },
        isListAreaTouched: false,
      };
    };

    // 사용자가 터치를 끝냈을 때 box의 최종 위치를 결정해야 하기 때문에 handleTouchEnd에서 실행
    const boxElement = box.current; // box의 실제 dom요소에 이벤트 리스터 추가
    boxElement?.addEventListener('touchstart', handleTouchStart); // 사용자가 화면을 터치했을 때 실행
    boxElement?.addEventListener('touchmove', handleTouchMove); // 사용자가 터치한 상태에서 손가락으 움직일 때 실행
    boxElement?.addEventListener('touchend', handleTouchEnd); // 사용자가 손가락을 화면에서 떼었을 때 실행

    // 컴포넌트가 언마운트될 때 실행, 메모리 누수 방지
    return () => {
      boxElement?.removeEventListener('touchstart', handleTouchStart);
      boxElement?.removeEventListener('touchmove', handleTouchMove);
      boxElement?.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  useEffect(() => {
    if (!list.current) return;
    // 터치 이벤트가 발생했을 때 실행되는 함수
    const handleTouchStart = (e: TouchEvent) => {
      if (!list.current) return;
      if (list.current.contains(e.target as Node)) {
        // list.current가 존재하는지 확인 후, 이벤트가 발생된 요소가 list.current의 자식 요소인지 검사
        touchEvent.current.isListAreaTouched = true;
      } else {
        touchEvent.current.isListAreaTouched = false;
      }
      // touchEvent.current.isListAreaTouched = true; // 사용자가 스크롤 가능한 영역을 터치했는지 기록
    };

    list.current.addEventListener('touchstart', handleTouchStart);

    return () => {
      list.current?.removeEventListener('touchstart', handleTouchStart);
    };
  }, [list]);

  const handleHeaderClick = () => {
    setIsOpen((prev) => !prev);
  };

  const items = [
    {
      title: '남산타워',
      location: '서울 용산구',
      description:
        '눈 덮인 남산타워에 다녀왔어요! 여기 팔각정 앞이 바로 포토존입니다!',
      imageUrl: '/headerLogo.png',
    },
    {
      title: '남산타워',
      location: '서울 용산구',
      description:
        '눈 덮인 남산타워에 다녀왔어요! 여기 팔각정 앞이 바로 포토존입니다!',
      imageUrl: '/headerLogo.png',
    },
    {
      title: '남산타워',
      location: '서울 용산구',
      description:
        '눈 덮인 남산타워에 다녀왔어요! 여기 팔각정 앞이 바로 포토존입니다!',
      imageUrl: '/headerLogo.png',
    },
    {
      title: '남산타워',
      location: '서울 용산구',
      description:
        '눈 덮인 남산타워에 다녀왔어요! 여기 팔각정 앞이 바로 포토존입니다!',
      imageUrl: '/headerLogo.png',
    },
    {
      title: '남산타워',
      location: '서울 용산구',
      description:
        '눈 덮인 남산타워에 다녀왔어요! 여기 팔각정 앞이 바로 포토존입니다!',
      imageUrl: '/headerLogo.png',
    },
    {
      title: '남산타워',
      location: '서울 용산구',
      description:
        '눈 덮인 남산타워에 다녀왔어요! 여기 팔각정 앞이 바로 포토존입니다!',
      imageUrl: '/headerLogo.png',
    },
    {
      title: '남산타워',
      location: '서울 용산구',
      description:
        '눈 덮인 남산타워에 다녀왔어요! 여기 팔각정 앞이 바로 포토존입니다!',
      imageUrl: '/headerLogo.png',
    },
    {
      title: '남산타워',
      location: '서울 용산구',
      description:
        '눈 덮인 남산타워에 다녀왔어요! 여기 팔각정 앞이 바로 포토존입니다!',
      imageUrl: '/headerLogo.png',
    },
    {
      title: '남산타워',
      location: '서울 용산구',
      description:
        '눈 덮인 남산타워에 다녀왔어요! 여기 팔각정 앞이 바로 포토존입니다!',
      imageUrl: '/headerLogo.png',
    },
    {
      title: '남산타워',
      location: '서울 용산구',
      description:
        '눈 덮인 남산타워에 다녀왔어요! 여기 팔각정 앞이 바로 포토존입니다!',
      imageUrl: '/headerLogo.png',
    },
  ];

  return (
    <div className={styles.pinListContainer} ref={box}>
      {/* isOpen이 true일때만 div렌더링 */}
      {isOpen && <div className={styles.overlay} />}
      <div className={`${styles.pinBox} ${isOpen ? styles.open : ''}`}>
        <div className={styles.pinBoxHeader} onClick={handleHeaderClick}>
          <div className={styles.dragHandle} />
        </div>
        <ul className={styles.pinList} ref={list}>
          {items.map((item, index) => (
            <PinList key={index} item={item} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PinBox;
