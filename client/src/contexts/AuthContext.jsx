// client/src/contexts/AuthContext.jsx

import React, { createContext, useContext, useState, useEffect } from 'react';
// (수정) apiService에서 실제 함수 import
import { login as apiLogin } from '../api/apiService';

// 1. Context 생성
const AuthContext = createContext(null);

// 2. AuthProvider 컴포넌트 (상태 관리 로직)
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // 앱 로딩 시 토큰 확인

  // 앱 시작 시, 로컬 스토리지에서 사용자 정보(토큰) 확인
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('userInfo');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('로컬 스토리지 파싱 오류:', error);
      localStorage.removeItem('userInfo');
    }
    setLoading(false); // 로딩 완료
  }, []);

  // (수정) 로그인 함수: apiLogin 사용
  const login = async (email, password) => {
    try {
      // (수정) 실제 API 호출
      const data = await apiLogin({ email, password });

      localStorage.setItem('userInfo', JSON.stringify(data));
      setUser(data);
      
      return data;
    } catch (error) {
      console.error('로그인 실패:', error);
      throw error;
    }
  };

  // 로그아웃 함수
  const logout = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
  };

  const value = {
    user,
    setUser, // (수정) LoginPage에서 직접 setUser를 사용할 수 있도록 노출
    login, // (참고) 이 login 함수는 apiService를 호출하고 state를 set함
    logout,
    isAuthenticated: !!user, // user 객체가 있으면 true
    isAdmin: user?.role === 'admin', // 관리자인지 여부
    loading,
  };

  // 3. Provider로 children 감싸기
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 4. (편의용) 커스텀 훅
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth는 AuthProvider 안에서만 사용해야 합니다.');
  }
  return context;
};
