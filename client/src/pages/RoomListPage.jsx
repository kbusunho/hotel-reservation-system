// client/src/pages/RoomListPage.jsx (설치 후 덮어쓰기)

import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getAvailableRooms } from '../api/apiService';
import Spinner from '../components/common/Spinner';
import { format } from 'date-fns'; // 👈 이 코드가 이제 작동합니다!

const RoomListPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const checkIn = searchParams.get('checkIn');
  const checkOut = searchParams.get('checkOut');
  const capacity = searchParams.get('capacity');

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 검색 파라미터가 없으면 메인 페이지로 리다이렉트
    if (!checkIn || !checkOut || !capacity) {
      navigate('/');
      return;
    }

    const fetchRooms = async () => {
      try {
        setLoading(true);
        setError(null);
        // 서버의 getAvailableRooms API 호출
        const data = await getAvailableRooms(checkIn, checkOut, capacity);
        setRooms(data);
      } catch (err) {
        setError('객실 정보를 불러오는 데 실패했습니다: ' + err.toString());
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [checkIn, checkOut, capacity, navigate]);

  const handleBookClick = (roomId) => {
    // 예약 페이지로 이동 시 검색 파라미터를 그대로 전달
    navigate(`/book/${roomId}?checkIn=${checkIn}&checkOut=${checkOut}&capacity=${capacity}`);
  };

  const formatPrice = (price) => {
    return price.toLocaleString('ko-KR') + '원';
  };
  
  // 날짜 포맷팅 로직 (date-fns 사용)
  const formattedCheckIn = checkIn ? format(new Date(checkIn), 'yyyy.MM.dd') : '날짜 선택 안됨';
  const formattedCheckOut = checkOut ? format(new Date(checkOut), 'yyyy.MM.dd') : '날짜 선택 안됨';
  
  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="main-container room-list-page">
      <h1 className="list-title">
        <span className="text-primary">{formattedCheckIn}</span> ~ <span className="text-primary">{formattedCheckOut}</span> 예약 가능 객실
      </h1>
      <p className="list-subtitle">선택하신 날짜와 인원({capacity}명)에 예약 가능한 객실 목록입니다.</p>

      {error && <p className="error-message">{error}</p>}

      <div className="room-list-grid">
        {rooms.length === 0 ? (
          <p className="no-rooms">
            죄송합니다. 선택하신 기간에는 예약 가능한 객실이 없습니다. 날짜를 변경해주세요.
          </p>
        ) : (
          rooms.map((room) => (
            <div key={room._id} className="room-card">
              <div className="room-image">
                <img 
                  src={`https://placehold.co/400x250/f0f0f0/333333/png?text=${room.name}`} 
                  alt={`${room.name} 객실 이미지`}
                />
              </div>
              <div className="room-info">
                <h2 className="room-name">{room.name} ({room.type})</h2>
                <p className="room-description">{room.description}</p>
                <div className="room-details">
                  <span>최대 인원: {room.capacity}명</span>
                  <span className="separator">|</span>
                  <span>상태: {room.status === 'available' ? '이용 가능' : '점검 중'}</span>
                </div>
              </div>
              <div className="room-footer">
                <p className="room-price">
                  <span className="price-label">1박 가격:</span>
                  <span className="price-value">{formatPrice(room.pricePerNight)}</span>
                </p>
                <button 
                  className="btn btn-primary"
                  onClick={() => handleBookClick(room._id)}
                >
                  예약하기
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RoomListPage;
