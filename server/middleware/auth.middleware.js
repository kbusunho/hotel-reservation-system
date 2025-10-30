// server/middleware/auth.middleware.js

import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import 'dotenv/config';

// 1. 로그인 확인 미들웨어 (토큰 검증)
export const protect = async (req, res, next) => {
  let token;

  // 'Authorization' 헤더에서 'Bearer' 토큰 확인
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // 'Bearer ' 부분을 잘라내고 토큰만 추출
      token = req.headers.authorization.split(' ')[1];

      // 토큰 해석(verify)
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 해석된 토큰의 id를 사용해 사용자 정보를 DB에서 조회 (비밀번호 제외)
      // 이 req.user 정보를 뒤따르는 라우트 핸들러에서 사용 가능
      req.user = await User.findById(decoded.id).select('-password');

      next(); // 다음 미들웨어 또는 라우트 핸들러로 이동
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: '인증에 실패했습니다. (토큰 오류)' });
    }
  }

  if (!token) {
    res.status(401).json({ message: '인증에 실패했습니다. (토큰 없음)' });
  }
};

// 2. 관리자 확인 미들웨어 (protect 다음에 실행)
export const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next(); // 관리자 맞음
  } else {
    res.status(403).json({ message: '접근 권한이 없습니다. (관리자 아님)' });
  }
};