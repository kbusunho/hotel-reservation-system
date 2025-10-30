// client/src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './assets/styles/main.css'; 
import { AuthProvider } from './contexts/AuthContext.jsx';
import { BrowserRouter } from 'react-router-dom';

// 1. root 엘리먼트 찾기 및 생성
const rootElement = document.getElementById('root');
if (!rootElement) {
  // root 엘리먼트가 없으면 에러 로그 출력 (보통 index.html 문제)
  console.error("Root element not found in index.html");
} else {
  // 2. React 앱 렌더링
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      {/* 라우팅을 앱 전체에 적용 */}
      <BrowserRouter>
        {/* 인증 상태(로그인/로그아웃)를 앱 전체에 적용 */}
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
}
