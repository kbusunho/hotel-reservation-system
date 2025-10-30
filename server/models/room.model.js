// server/models/room.model.js

import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, '객실 이름을 입력해주세요.'],
      trim: true,
    },
    type: {
      type: String,
      required: [true, '객실 타입을 입력해주세요.'], // 예: Standard, Deluxe, Suite
      trim: true,
    },
    pricePerNight: {
      type: Number,
      required: [true, '1박 가격을 입력해주세요.'],
    },
    capacity: {
      type: Number,
      required: [true, '최대 수용 인원을 입력해주세요.'],
      default: 2,
    },
    description: {
      type: String,
      default: '객실 설명이 없습니다.',
    },
    // (선택적) 객실 이미지 URL
    // imageUrls: [
    //   { type: String }
    // ],
    status: {
      type: String,
      enum: ['available', 'maintenance'], // 'available'(이용 가능), 'maintenance'(점검 중)
      default: 'available',
    },
  },
  {
    timestamps: true,
  }
);

const Room = mongoose.model('Room', roomSchema);
export default Room;