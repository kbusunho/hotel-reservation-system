// client/src/App.jsx

import React from 'react';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/layout/Navbar'; // 네비게이션 바 컴포넌트
import { useAuth } from './contexts/AuthContext';
import Spinner from './components/common/Spinner'; // 로딩 스피너 컴포넌트

function App() {
  const { loading } = useAuth(); // AuthContext에서 로딩 상태를 가져옴

  // 앱 로딩 시(토큰 확인 등 초기 인증 과정) 스피너 표시
  if (loading) {
    // 로딩 중일 때는 Spinner 컴포넌트만 렌더링
    return <Spinner />;
  }

  // 로딩이 완료되면 Navbar와 메인 콘텐츠를 렌더링
  return (
    <>
      <Navbar /> 
      
      <main className="main-container">
        {/* AppRoutes가 현재 경로에 맞는 페이지(HomePage, LoginPage 등)를 렌더링 */}
        <AppRoutes />
      </main>
      
      {/* (추후 생성) <Footer /> */}
    </>
  );
}

export default App;
