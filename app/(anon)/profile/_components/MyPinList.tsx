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
    /* 양옆 패딩 관련 시작 */
    const containerRef = useRef<HTMLUListElement>(null);
    const [padding, setPadding] = useState(0);
    
    const itemWidth = 112; // 각 li의 고정 너비
    const gap = 14; // 아이템 간 간격

    const calculatePadding = () => {
        if (containerRef.current) {
            const containerWidth = containerRef.current.offsetWidth;
            const itemsPerRow = Math.floor((containerWidth + gap) / (itemWidth + gap)); // 한 줄에 배치할 아이템 개수
            const totalItemsWidth = itemsPerRow * itemWidth + (itemsPerRow - 1) * gap; // 아이템+간격 총 너비
            const remainingSpace = containerWidth - totalItemsWidth; // 남는 여유 공간

            if (remainingSpace >= gap) {
               // 남는 공간이 gap 이상일 때만 padding 설정
               setPadding(remainingSpace / 2);
            } else {
              setPadding(0); // 여유 공간이 없을 경우 padding 0
            }
        }
    };

    useEffect(() => {
        // 초기 렌더링 및 창 크기 변경 시 계산
        calculatePadding();
        window.addEventListener("resize", calculatePadding);
        return () => window.removeEventListener("resize", calculatePadding);
    }, []);
    /* 양옆 패딩 관련 끝 */

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
                style={{padding: `0 ${padding}px`,'--checkbox': hasCheckedItems ? 'block' : 'none', gap: gap} as React.CSSProperties}
            >
                {list.map((pin, index) => (
                    <li
                        key={index}
                        className={styles.list_item}
                        onTouchStart={handleTouchStart(index)} // 모바일 터치 시작
                        onTouchEnd={handleTouchEnd(index)}
                    >
                        <MyPinCard
                            url={pin.url}
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
            <Link className={styles.delete} href={""}><Icon id={"trash"} /></Link>
        </div>
        </>
    );
}

export default MyPinList;