'use client';

import ProfilePinCard from "@/components/Card/ProfilePinCard/ProfilePinCard";
import styles from "./UserPinList.module.scss";
import { useEffect, useState } from "react";
import { showUserPinList } from "../_api/showUserPinList";
import { deleteLike } from "../../like/_api/deleteLike";
import { createLike } from "../../like/_api/createLike";
// import { PinDto } from "@/application/usecases/profile/dto/PinDto";

interface PinDto {
  userId: string,
  userName: string,
  userEmail: string,
  id: string,
  placeName: string,
  address: string, // 두 단어만 유지
  image: string,
  isLiked: boolean,
  countLike: number
}

const UserPinList = ({ userId, userName }: { userId?: string; userName?: string }) => {
    const [list, setList] = useState<PinDto[]>([]);

    /* .container 스타일 설정(휴지통 아이콘 고정에 필요) */
    useEffect(() => {
        const container = document.querySelector('.container');
        if (container) {
            (container as HTMLElement).style.position = 'relative';
        }
    }, []);
    
    /* 핀 리스트 불러오기 */
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

    // 핀의 좋아요 상태 변경하는 함수
    const handleLikeToggle = async (
      e: React.MouseEvent<HTMLButtonElement>,
      id: string,
      isLiked: boolean,
    ) => {
      e.preventDefault();
      e.stopPropagation();
    
      // Supabase에 좋아요 상태 업데이트
      try {
        if (isLiked) {
          await deleteLike(id);
        } else {
          await createLike({ id: id });
        }
        setList((prevPins) =>
          prevPins.map((pin) =>
            pin.id === id ? { ...pin, isLiked: !pin.isLiked } : pin,
          ),
        );
      } catch (error) {
        console.error('🚨 좋아요 상태 변경 실패:', error);
      }
    };

    return (
        <>
        <div className={styles.mypin_list}>
            <div className={styles.head}>
                <h1 className={styles.title}>{userName}님이 올린 핀</h1>
            </div>
            
            {/* ✅ 기존의 ul > li 구조를 div.pincard_container 내부에 배치 */}
            <div className={styles.pincard_container}>
            {list.length > 0 ? (
                list.map((pin) => (
                <ProfilePinCard
                    key={pin.id} // ✅ key를 여기서 사용
                    id={pin.id}
                    url={pin.image}
                    location={pin.placeName}
                    address={pin.address}
                    liked={pin.isLiked}
                    onClickLikeButton={(e) =>
                      handleLikeToggle(e, pin.id, pin.isLiked)
                    }
                />
                ))
            ) : (
                <p className={styles.nodata}>리스트가 없습니다.</p>
            )}
            </div>
        </div>
        </>
    );
}

export default UserPinList;