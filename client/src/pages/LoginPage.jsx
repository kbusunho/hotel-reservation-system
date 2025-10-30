// client/src/pages/LoginPage.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // AuthContext 사용
import { login as apiLogin } from '../api/apiService'; // apiService 사용

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // 에러 메시지 상태
  const [loading, setLoading] = useState(false); // 로딩 상태

  const { setUser } = useAuth(); // AuthContext에서 setUser 함수 가져오기
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // 폼 기본 동작(새로고침) 방지
    setLoading(true);
    setError(null);

    try {
      // 1. apiService.js의 login 함수 호출
      const userData = await apiLogin(email, password); 
      
      // 2. AuthContext의 상태 업데이트
      setUser(userData); 
      
      // 3. 페이지 이동 (관리자면 대시보드로, 아니면 메인으로)
      if (userData.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }

    } catch (err) {
      // 서버에서 받은 에러 메시지 표시
      setError(err.toString() || '로그인에 실패했습니다.');
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h1>로그인</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        <div className="form-group">
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>
        <button type="submit" className="auth-btn" disabled={loading}>
          {loading ? '로그인 중...' : '로그인'}
        </button>
      </form>
      <div className="auth-switch-link">
        계정이 없으신가요? <Link to="/register">회원가입</Link>
      </div>
    </div>
  );
};

export default LoginPage;
