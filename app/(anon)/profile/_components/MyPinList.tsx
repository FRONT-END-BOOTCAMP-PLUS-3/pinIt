'use client';

import { useEffect, useRef, useState } from "react";
// import { Profile } from "@/application/usecases/profile/dto/ProfileDto";
import { showMyPinList } from "../_api/showMyPinList";
import styles from "./MyPinList.module.scss";
import ProfilePinCard from "@/components/Card/ProfilePinCard/ProfilePinCard";
import Icon from "@/components/Icon/Icon";
import Link from "next/link";

interface PinDto {
  userId: string,
  userName: string,
  userEmail: string,
  id: string,
  placeName: string,
  address: string, // 두 단어만 유지
  image: string,
}

const MyPinList = ({ userId }: { userId?: string }) => {
    /* 핀 리스트 불러오기 시작 */
    const [list, setList] = useState<PinDto[]>([]);

    useEffect(()=>{
        // userId가 undefined거나 null일 경우 실행하지 않고 다시 돌아감
        if (!userId || userId.trim() === "") return;

        const fetchData = async () => {
            try {
                if (!userId) {
                    console.error("🚨 User ID is missing.");
                    return;
                }

                const data = await showMyPinList(userId); // userId 전달
                setList(data);
            } catch (error) {
                console.error('🚨 핀 데이터 불러오기 실패:', error);
            }
        };
        fetchData();
    }, [userId]);
    /* 핀 리스트 불러오기 끝 */

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
    // const [isEditing, setIsEditing] = useState<boolean>(false);
    const [checkedItems, setCheckedItems] = useState<boolean[]>([]);
    // useEffect를 활용하여 myPinList 길이가 변경될 때 checkedItems 초기화
    useEffect(() => {
        setCheckedItems(Array(list.length).fill(false)); 
    }, [list]);

    // 체크된 항목 개수 및 첫 번째 체크된 Pin의 ID
    const checkedCount = checkedItems.filter((item) => item).length;
    // 체크된 Pin의 ID 가져오기
    const checkedPinId = list[checkedItems.findIndex((item) => item)]?.id;
    // 여러개 체크된 Pin의 ID 가져오기
    const checkedPinIds = checkedItems.map(
        (item, index) => (item ? list[index]?.id : null)) // 체크된 항목의 id만 추출
        .filter((id) => id !== null);
    // 체크된 item의 갯수 파악(체크박스 표시 유무에 필요)
    const hasCheckedItems = checkedItems.some((item) => item);

    // 선택된 요소가 1개 이상인 경우
    const handleMultiChecked = (event: React.FormEvent): void  => {
        event.preventDefault();
        console.log("편집할 요소를 1개만 선택해주세요");
    };

    // onClick 이벤트 (checkedItems가 undefined인 경우가 ProfilePinCard의 체크박스가 uncontrolled되는 문제 해결)
    const handleCheck = (index: number) => {
        setCheckedItems((prev) => {
            const newCheckedItems = prev.length ? [...prev] : Array(list.length).fill(false);
            newCheckedItems[index] = !newCheckedItems[index];
            return newCheckedItems;
        });
    };
    /* 핀 항목 체크 끝 */



    /* 삭제 기능 */
    const handleDelete = (index: string[]) => (event: React.FormEvent): void => {
        event.preventDefault();
        // 폼 데이터 처리 로직 작성
        console.log(`Item ${index} deleted`);
    };
    /* 삭제 기능 */



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
                {checkedCount === 1 && checkedPinId ? (
                    <Link href={`/${checkedPinId}/edit`} className={`${styles.button} edit`}>
                        <span>편집</span>
                    </Link>
                ) : (
                    <Link href={``}
                        className={`${styles.button} edit`}
                        onClick={() => {
                            if (checkedCount > 1 && checkedPinId) {
                                handleMultiChecked({ preventDefault: () => {} } as React.FormEvent);
                            };
                        }}
                    >
                        <span>편집</span>
                    </Link>
                )}
            </div>
            
            <ul
                className={styles.list}
                ref={containerRef}
                style={{'--checkbox': hasCheckedItems ? 'block' : 'none', gap: gap} as React.CSSProperties}
            >
                {Array.isArray(list) && list.length > 0 && (
                list.map((pin, index) => (
                    <li
                        key={index} className={styles.list_item}
                    >
                        <ProfilePinCard
                            id={pin.id}
                            url={pin.image}
                            width={cardWidth}
                            location={pin.placeName}
                            address={pin.address}
                            checked={checkedItems[index] || false} // 렌더링 시 checked 값에 undefined 방지 처리
                            onClickCheckButton={() => handleCheck(index)}
                        />
                    </li>
                ))
            )}
            </ul>
        </div>
        <div className={`${styles.mypin_delete} ${hasCheckedItems ? styles.visible : styles.hidden}`}>
            <button className={styles.delete} onClick={handleDelete(checkedPinIds)}><Icon id={"trash"} /></button>
        </div>
        </>
    );
}

export default MyPinList;