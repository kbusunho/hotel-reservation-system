// client/src/routes/AppRoutes.jsx (완성본)

import React from 'react';
import { Routes, Route } from 'react-router-dom';

// === 페이지 컴포넌트들 Import ===
// (이 파일들이 pages 폴더 안에 모두 있어야 합니다)
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import RoomListPage from '../pages/RoomListPage';
import BookingPage from '../pages/BookingPage';
import MyReservations from '../pages/MyReservations';
import AdminDashboard from '../pages/AdminDashboard';
import AdminRooms from '../pages/AdminRooms'; // 👈 이 줄이 중요!
import AdminReservations from '../pages/AdminReservations';
import NotFoundPage from '../pages/NotFoundPage';

// === 라우트 보호 컴포넌트 Import ===
import ProtectedRoute from './ProtectedRoute';
import AdminRoute from './AdminRoute';

const AppRoutes = () => {
  return (
    <Routes>
      {/* === 1. 공용 루트 (누구나) === */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/rooms" element={<RoomListPage />} />

      {/* === 2. 로그인한 사용자만 === */}
      <Route element={<ProtectedRoute />}>
        <Route path="/book/:roomId" element={<BookingPage />} />
        <Route path="/my-reservations" element={<MyReservations />} />
      </Route>

      {/* === 3. 관리자만 === */}
      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/rooms" element={<AdminRooms />} /> {/* 👈 이 줄이 중요! */}
        <Route path="/admin/reservations" element={<AdminReservations />} />
      </Route>

      {/* === 4. 404 Not Found === */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
