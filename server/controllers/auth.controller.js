// server/controllers/auth.controller.js

import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

// JWT 토큰 생성 헬퍼 함수
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // 30일 유효
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
export const registerUser = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: '이미 존재하는 이메일입니다.' });
    }

    const user = await User.create({
      username,
      email,
      password,
      role, // (선택적) 관리자 회원가입 시
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: '사용자 정보를 확인해주세요.' });
    }
  } catch (error) {
    res.status(500).json({ message: `서버 오류: ${error.message}` });
  }
};

// @desc    Auth user & get token (Login)
// @route   POST /api/auth/login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: '이메일 또는 비밀번호가 일치하지 않습니다.' });
    }
  } catch (error) {
    res.status(500).json({ message: `서버 오류: ${error.message}` });
  }
};
