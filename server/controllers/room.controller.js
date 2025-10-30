// server/controllers/room.controller.js (업데이트 버전)

import Room from '../models/room.model.js';
import Reservation from '../models/reservation.model.js';
import { startOfDay, endOfDay } from 'date-fns';

// @desc    Get all rooms (No filter)
// @route   GET /api/rooms
export const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find({});
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: '객실 조회에 실패했습니다.', error: error.message });
  }
};

// @desc    Get available rooms by date and capacity
// @route   GET /api/rooms/available?checkIn=...&checkOut=...&capacity=...
export const getAvailableRooms = async (req, res) => {
  let { checkIn, checkOut, capacity } = req.query;

  // 필수 파라미터 확인
  if (!checkIn || !checkOut || !capacity) {
    return res.status(400).json({ message: '체크인/체크아웃 날짜 및 인원수를 입력해야 합니다.' });
  }

  try {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const requiredCapacity = parseInt(capacity, 10);

    // 날짜 유효성 및 체크아웃이 체크인보다 늦은지 확인
    if (isNaN(checkInDate.getTime()) || isNaN(checkOutDate.getTime()) || checkOutDate <= checkInDate) {
        return res.status(400).json({ message: '유효하지 않은 날짜 범위입니다.' });
    }

    // 1. 예약 상태가 'cancelled'가 아닌 모든 예약 중에서,
    //    요청된 기간과 겹치는 예약을 찾습니다.
    const conflictingReservations = await Reservation.find({
      status: { $ne: 'cancelled' }, // 취소되지 않은 예약
      $or: [
        // Case 1: 요청된 기간이 기존 예약 기간 내에 완전히 포함될 때
        {
          checkIn: { $lte: checkInDate },
          checkOut: { $gte: checkOutDate },
        },
        // Case 2: 요청된 기간이 기존 예약 기간을 덮칠 때 (예약 시작)
        {
          checkIn: { $lt: checkOutDate, $gte: checkInDate },
        },
        // Case 3: 요청된 기간이 기존 예약 기간을 덮칠 때 (예약 끝)
        {
          checkOut: { $gt: checkInDate, $lte: checkOutDate },
        },
      ],
    }).select('room');

    // 겹치는 예약이 있는 객실 ID 목록 추출
    const bookedRoomIds = conflictingReservations.map(res => res.room);

    // 2. 예약 불가능한 객실 ID를 제외하고, 수용 인원을 충족하는 객실을 찾습니다.
    const availableRooms = await Room.find({
      _id: { $nin: bookedRoomIds }, // 예약된 객실 ID 제외
      status: 'available', // 점검 중인 객실 제외
      capacity: { $gte: requiredCapacity }, // 인원 충족
    });

    res.json(availableRooms);
  } catch (error) {
    console.error('Error fetching available rooms:', error);
    res.status(500).json({ message: '객실 검색 중 서버 오류가 발생했습니다.', error: error.message });
  }
};

// @desc    Get room by ID
// @route   GET /api/rooms/:id
export const getRoomById = async (req, res) => {
  // (기존 코드 유지)
  try {
    const room = await Room.findById(req.params.id);
    if (room) {
      res.json(room);
    } else {
      res.status(404).json({ message: '객실을 찾을 수 없습니다.' });
    }
  } catch (error) {
    res.status(500).json({ message: '객실 조회에 실패했습니다.', error: error.message });
  }
};

// @desc    Create a new room (Admin only)
// @route   POST /api/rooms
export const createRoom = async (req, res) => {
  // (기존 코드 유지)
  const { name, type, pricePerNight, capacity, description } = req.body;
  try {
    const room = new Room({
      name, type, pricePerNight, capacity, description,
    });
    const createdRoom = await room.save();
    res.status(201).json(createdRoom);
  } catch (error) {
    res.status(400).json({ message: '객실 생성에 실패했습니다.', error: error.message });
  }
};

// @desc    Update a room (Admin only)
// @route   PUT /api/rooms/:id
export const updateRoom = async (req, res) => {
  // (기존 코드 유지)
  const { name, type, pricePerNight, capacity, description, status } = req.body;
  try {
    const room = await Room.findById(req.params.id);
    if (room) {
      room.name = name || room.name;
      room.type = type || room.type;
      room.pricePerNight = pricePerNight || room.pricePerNight;
      room.capacity = capacity || room.capacity;
      room.description = description || room.description;
      room.status = status || room.status;
      const updatedRoom = await room.save();
      res.json(updatedRoom);
    } else {
      res.status(404).json({ message: '객실을 찾을 수 없습니다.' });
    }
  } catch (error) {
    res.status(400).json({ message: '객실 업데이트에 실패했습니다.', error: error.message });
  }
};

// @desc    Delete a room (Admin only)
// @route   DELETE /api/rooms/:id
export const deleteRoom = async (req, res) => {
  // (기존 코드 유지)
  try {
    const room = await Room.findById(req.params.id);
    if (room) {
      await room.deleteOne();
      res.json({ message: '객실이 삭제되었습니다.' });
    } else {
      res.status(404).json({ message: '객실을 찾을 수 없습니다.' });
    }
  } catch (error) {
    res.status(500).json({ message: '객실 삭제에 실패했습니다.', error: error.message });
  }
};
