// server/server.js (완성본)

import express from 'express';
import cors from 'cors';
import 'dotenv/config'; // .env 로드
import connectDB from './config/db.js';

// === [1] 라우터 import ===
import authRoutes from './routes/auth.routes.js';
import roomRoutes from './routes/rooms.routes.js';
// (추후 추가) import reservationRoutes from './routes/reservations.routes.js';

// DB 연결
connectDB();

const app = express();
// === [2] 포트 3000으로 설정 ===
const PORT = process.env.PORT || 3000;

// 미들웨어 설정
app.use(cors()); // React 클라이언트 요청 허용
app.use(express.json()); // Body-parser (JSON 요청을 읽기 위함)
app.use(express.urlencoded({ extended: true }));

// === [3] API 라우트 설정 (가장 중요!) ===
app.get('/', (req, res) => {
  res.send('API is running on port 3000...');
});

// /api/auth 로 시작하는 모든 요청은 authRoutes(auth.routes.js)가 처리
app.use('/api/auth', authRoutes);

// /api/rooms 로 시작하는 모든 요청은 roomRoutes(rooms.routes.js)가 처리
app.use('/api/rooms', roomRoutes);

// (추후 추가) app.use('/api/reservations', reservationRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port 연결성공 ${PORT}`);
});

