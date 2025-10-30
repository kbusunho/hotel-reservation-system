// client/src/routes/AdminRoute.jsx

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AdminRoute = () => {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // 또는 <Spinner />
  }

  // 관리자 권한이 있으면 자식 컴포넌트(Outlet)를 보여주고,
  // 아니면 메인 페이지로 리다이렉트
  return isAuthenticated && isAdmin ? <Outlet /> : <Navigate to="/" replace />;
};

export default AdminRoute;
