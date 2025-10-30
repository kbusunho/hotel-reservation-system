// server/routes/rooms.routes.js (업데이트 버전)

import express from 'express';
import {
  createRoom,
  getAllRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
  getAvailableRooms, // 👈 [1] 새로 추가
} from '../controllers/room.controller.js';
import { protect, admin } from '../middleware/auth.middleware.js';

const router = express.Router();

// === 공용 루트 (로그인 안 해도 접근 가능) ===
// 주의: getAvailableRooms가 먼저 와야 /available이 :id로 인식되는 문제를 피할 수 있음.
router.route('/available').get(getAvailableRooms); // 👈 [2] 새 검색 API
router.route('/').get(getAllRooms); 
router.route('/:id').get(getRoomById); 

// === 관리자 전용 루트 (로그인 + 관리자 권한 필요) ===
router.route('/').post(protect, admin, createRoom); 
router.route('/:id').put(protect, admin, updateRoom); 
router.route('/:id').delete(protect, admin, deleteRoom); 

export default router;
