// server/routes/auth.routes.js

import express from 'express';
// (중요) 컨트롤러 함수들을 import 합니다.
import { registerUser, loginUser } from '../controllers/auth.controller.js';

const router = express.Router();

// '/api/auth/register' 경로로 POST 요청이 오면 registerUser 함수 실행
router.post('/register', registerUser);

// '/api/auth/login' 경로로 POST 요청이 오면 loginUser 함수 실행
router.post('/login', loginUser);

export default router;
