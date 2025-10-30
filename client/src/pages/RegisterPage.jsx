// client/src/pages/RegisterPage.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { register as apiRegister } from '../api/apiService';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // 1. apiService.js의 register 함수 호출
      const userData = await apiRegister(username, email, password);
      
      // 2. AuthContext 상태 업데이트 (회원가입 즉시 로그인)
      setUser(userData);
      
      // 3. 메인 페이지로 이동
      navigate('/');

    } catch (err) {
      setError(err.toString() || '회원가입에 실패했습니다.');
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h1>회원가입</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        
        <div className="form-group">
          <label htmlFor="username">사용자 이름</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
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
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="confirmPassword">비밀번호 확인</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="auth-btn" disabled={loading}>
          {loading ? '가입 중...' : '회원가입'}
        </button>
      </form>
      <div className="auth-switch-link">
        이미 계정이 있으신가요? <Link to="/login">로그인</Link>
      </div>
    </div>
  );
};

export default RegisterPage;