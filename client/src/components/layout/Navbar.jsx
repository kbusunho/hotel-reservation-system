// client/src/components/layout/Navbar.jsx

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

// main.css에 .navbar, .nav-logo, .nav-links 스타일이 정의되어 있습니다.

const Navbar = () => {
  const { isAuthenticated, user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // 로그아웃 후 로그인 페이지로 이동
  };

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <Link to="/">My Hotel</Link>
      </div>
      <ul className="nav-links">
        {isAuthenticated ? (
          // === 로그인 상태일 때 ===
          <>
            <li>
              <span>{user?.username}님, 환영합니다!</span>
            </li>
            {isAdmin && (
              // 관리자일 때만 보이는 링크
              <li>
                <Link to="/admin">관리자 대시보드</Link>
              </li>
            )}
            <li>
              <Link to="/my-reservations">내 예약</Link>
            </li>
            <li>
              <button onClick={handleLogout}>로그아웃</button>
            </li>
          </>
        ) : (
          // === 로그아웃 상태일 때 ===
          <>
            <li>
              <Link to="/login">로그인</Link>
            </li>
            <li>
              <Link to="/register">회원가입</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;