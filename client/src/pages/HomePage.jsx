// client/src/pages/HomePage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import '../../src/assets/styles/main.css';

const HomePage = () => {
  const navigate = useNavigate();

  // 기본값 설정 (오늘부터 2박 3일)
  const today = format(new Date(), 'yyyy-MM-dd');
  const tomorrow = format(new Date(new Date().setDate(new Date().getDate() + 1)), 'yyyy-MM-dd');

  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(tomorrow);
  const [capacity, setCapacity] = useState(2);
  const [error, setError] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    setError('');

    // 날짜 유효성 검사
    const inDate = new Date(checkIn);
    const outDate = new Date(checkOut);
    
    if (outDate <= inDate) {
      setError('체크아웃 날짜는 체크인 날짜보다 늦어야 합니다.');
      return;
    }

    // 객실 목록 페이지로 검색 파라미터와 함께 이동
    navigate(`/rooms?checkIn=${checkIn}&checkOut=${checkOut}&capacity=${capacity}`);
  };

  return (
    <div className="home-page-container">
      {/* --- 1. Hero Section (예쁜 배경 이미지와 검색 창) --- */}
      <div className="hero-section">
        <h1 className="hero-title">당신의 완벽한 휴가를 계획하세요.</h1>
        <p className="hero-subtitle">날짜와 인원수를 선택하여 예약 가능한 객실을 확인하세요.</p>
        
        {/* --- 2. 검색 폼 --- */}
        <div className="search-box">
          <form onSubmit={handleSearch} className="search-form">
            {error && <p className="error-message">{error}</p>}
            
            <div className="form-group">
              <label htmlFor="checkIn">체크인</label>
              <input
                type="date" id="checkIn" name="checkIn"
                value={checkIn}
                min={today} // 오늘 이전 날짜는 선택 불가
                onChange={(e) => setCheckIn(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="checkOut">체크아웃</label>
              <input
                type="date" id="checkOut" name="checkOut"
                value={checkOut}
                min={checkIn || today} // 체크인 날짜 이후만 선택 가능
                onChange={(e) => setCheckOut(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="capacity">인원</label>
              <select
                id="capacity" name="capacity"
                value={capacity}
                onChange={(e) => setCapacity(Number(e.target.value))}
                required
              >
                <option value={1}>1명</option>
                <option value={2}>2명</option>
                <option value={3}>3명</option>
                <option value={4}>4명</option>
              </select>
            </div>
            
            <button type="submit" className="btn btn-search">
              객실 검색
            </button>
          </form>
        </div>
        {/* --- 검색 폼 끝 --- */}

      </div>
      {/* --- Hero Section 끝 --- */}

      {/* (추후) 아래에 호텔 소개, 서비스 섹션 등을 추가할 수 있습니다. */}

    </div>
  );
};

export default HomePage;
