'use client';

import ProfilePinCard from "@/components/Card/ProfilePinCard/ProfilePinCard";
import styles from "./UserPinList.module.scss";
import { useEffect, useRef, useState } from "react";
import { showUserPinList } from "../_api/showUserPinList";
// import { PinDto } from "@/application/usecases/profile/dto/PinDto";

interface PinDto {
  userId: string,
  userName: string,
  userEmail: string,
  id: string,
  placeName: string,
  address: string, // 두 단어만 유지
  image: string,
}

const UserPinList = ({ userId, userName }: { userId?: string; userName?: string }) => {
    /* 핀 리스트 불러오기 시작 */
    const [list, setList] = useState<PinDto[]>([]);

    useEffect(()=>{
        const fetchData = async () => {
            // userId가 undefined거나 null일 경우 실행하지 않고 다시 돌아감
            if (!userId || userId.trim() === "") return;

            try {
                if (!userId) {
                    console.error("🚨 User ID is missing.");
                    return;
                }
                const data = await showUserPinList(userId); // userId 전달
                setList(data);
            } catch (error) {
                console.error('🚨 핀 데이터 불러오기 실패:', error);
            }
        };
        fetchData();
    }, [userId]);
    /* 핀 리스트 불러오기 끝 */
    
    /* UserPinCard 자동 너비 시작 */
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
    /* UserPinCard 자동 너비 끝 */



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
                <h1 className={styles.title}>{userName}님이 올린 핀</h1>
            </div>
            
            <ul
                className={styles.list}
                ref={containerRef}
                style={{gap: gap} as React.CSSProperties}
            >
                {list.map((pin, index) => (
                    <li key={index} className={styles.list_item}>
                        <ProfilePinCard
                            id={pin.id}
                            url={pin.image}
                            width={cardWidth}
                            location={pin.address}
                            address={pin.address}
                        />
                    </li>
                ))}
            </ul>
        </div>
        </>
    );
}

export default UserPinList;