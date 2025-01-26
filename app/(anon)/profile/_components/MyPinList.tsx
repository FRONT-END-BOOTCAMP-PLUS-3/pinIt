'use client';

import styles from "./MyPinList.module.scss";
import MyPinCard from "@/components/Card/MyPinCard/MyPinCard";
import Icon from "@/components/Icon/Icon";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface Pin {
    url: string;
    alt: string;
    location: string;
    address: string;
    id: string;
}

const MyPinList = ({ list }: { list: Pin[] }) => {

    /* MyPinCard 자동 너비 시작 */
    const containerRef = useRef<HTMLUListElement>(null);
    const [cardWidth, setCardWidth] = useState(112); // 초기값: 112px
    const gap = 14; // 아이템 간 간격

    const calculateCardWidth = () => {
        if (containerRef.current) {
            const containerWidth = containerRef.current.offsetWidth; // ul 컨테이너의 너비
            const itemsPerRow = Math.floor((containerWidth + gap) / (112 + gap)); // 한 줄에 들어갈 카드 개수
            const totalGaps = (itemsPerRow - 1) * gap; // 모든 카드 간 간격의 합
            const dynamicWidth = (containerWidth - totalGaps) / itemsPerRow; // 동적으로 계산된 카드 너비

            // 112px에 가깝다면 고정, 아니라면 vw 단위로 설정
            if (Math.abs(dynamicWidth - 112) <= 1) {
                setCardWidth(112); // 112px 고정
            } else {
                const viewportWidth = ((dynamicWidth / window.innerWidth) * 100).toFixed(10); // 동적 너비를 vw로 변환
                // console.log("Calculated viewportWidth:", viewportWidth);
                setCardWidth(parseFloat(viewportWidth)); // vw 단위로 저장
            }
        }
    };

    useEffect(() => {
        calculateCardWidth(); // 초기 렌더링 시 계산
        window.addEventListener("resize", calculateCardWidth); // 화면 크기 변경 시 재계산
        return () => window.removeEventListener("resize", calculateCardWidth); // 이벤트 정리
    }, []);
    /* MyPinCard 자동 너비 끝 */



    /* [<html>에 스크롤바 숨김 스타일 추가]
    (MyPinCard 자동 너비 확인용, 스크롤바 유무에 따라 ul이 가운데에 위치하지 않을 수 있음) */
    // useEffect(() => {
    //     const style = document.createElement('style');
    //     style.innerHTML = `
    //         html {
    //             overflow-y: scroll;
    //             scrollbar-width: none; // Firefox
    //             -ms-overflow-style: none; // IE
    //         }

    //         html::-webkit-scrollbar {
    //             display: none; // Chrome, Safari
    //         }
    //     `;
    //     document.head.appendChild(style);

    //     // Cleanup: 컴포넌트가 언마운트될 때 스타일 제거
    //     return () => {
    //         document.head.removeChild(style);
    //     };
    // }, []);



    /* 핀 항목 체크 시작 */
    // 체크 관련 const 변수
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [checkedItems, setCheckedItems] = useState<boolean[]>(Array(list.length).fill(false));
    const touchStartRef = useRef<number | null>(null);

    // 체크된 항목 개수 및 첫 번째 체크된 Pin의 ID
    const checkedCount = checkedItems.filter((item) => item).length;
    // 체크된 Pin의 ID 가져오기
    const checkedPinId = list[checkedItems.findIndex((item) => item)]?.id;
    // 체크된 item의 갯수 파악(체크박스 표시 유무에 필요)
    const hasCheckedItems = checkedItems.some((item) => item);

    // 터치 시작/종료(모바일)
    const handleTouchStart = (index: number) => () => {
        touchStartRef.current = Date.now();
    };
    const handleTouchEnd = (index: number) => (e: React.TouchEvent) => {
        const targetElement = e.target as HTMLElement;

        // div.img에서 발생한 터치 이벤트는 무시
        if (targetElement.classList.contains("img") || targetElement.closest(".img")) {
            return;
        }

        if (touchStartRef.current && Date.now() - touchStartRef.current > 500) {
            setIsEditing(true); // long press로 편집 모드 활성화
        } else {
            setCheckedItems((prev) => {
                const newCheckedItems = [...prev];
                newCheckedItems[index] = !newCheckedItems[index];
                return newCheckedItems;
            });
        }
        touchStartRef.current = null;
    };
    /* 핀 항목 체크 끝 */



    /* .container 스타일 설정(휴지통 아이콘 고정에 필요) */
    useEffect(() => {
        const container = document.querySelector('.container');
        if (container) {
            (container as HTMLElement).style.position = 'relative';
        }
    }, []);


    return (
        <>
        <div className={styles.mypin_list}>
            <div className={styles.head}>
                <h1 className={styles.title}>내가 올린 핀</h1>
                {/* <button className={`${styles.button} edit`} onClick={() => setIsEditing(false)}>
                    <span>{isEditing ? "완료" : "편집"}</span>
                </button> */}
                {checkedCount === 1 && checkedPinId ? (
                    <Link href={`/${checkedPinId}/edit`} className={`${styles.button} edit`}>
                        <span>편집</span>
                    </Link>
                ) : (
                    <a className={`${styles.button} edit`} onClick={() => setIsEditing(false)}>
                        <span>{isEditing ? "완료" : "편집"}</span>
                    </a>
                )}
            </div>
            
            <ul
                className={styles.list}
                ref={containerRef}
                style={{'--checkbox': hasCheckedItems ? 'block' : 'none', gap: gap} as React.CSSProperties}
            >
                {list.map((pin, index) => (
                    <li
                        key={index} className={styles.list_item}
                        onTouchStart={handleTouchStart(index)} // 모바일 터치 시작
                        onTouchEnd={handleTouchEnd(index)}
                    >
                        <MyPinCard
                            url={pin.url}
                            width={cardWidth}
                            alt={pin.alt}
                            location={pin.location}
                            address={pin.address}
                            checked={checkedItems[index]}
                            onClickCheckButton={() => {
                                setCheckedItems((prev) => {
                                    const newCheckedItems = [...prev];
                                    newCheckedItems[index] = !newCheckedItems[index];
                                    return newCheckedItems;
                                });
                            }}
                        />
                    </li>
                ))}
            </ul>
        </div>
        <div className={`${styles.mypin_delete} ${hasCheckedItems ? styles.visible : styles.hidden}`}>
            <Link className={styles.delete} href={"/ab"}><Icon id={"trash"} /></Link>
        </div>
        </>
    );
}

export default MyPinList;