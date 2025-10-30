// server/models/reservation.model.js

import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema(
  {
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room', // Room 모델을 참조
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // User 모델을 참조
      required: true,
    },
    guestName: {
      type: String,
      required: true,
      trim: true,
    },
    guestPhone: {
      type: String,
    },
    checkIn: {
      type: Date, // 체크인 날짜 및 시간
      required: true,
    },
    checkOut: {
      type: Date, // 체크아웃 날짜 및 시간
      required: true,
    },
    totalGuests: {
      type: Number,
      required: true,
      default: 1,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['confirmed', 'pending', 'cancelled'],
      default: 'confirmed',
    },
  },
  {
    timestamps: true,
  }
);

const Reservation = mongoose.model('Reservation', reservationSchema);
export default Reservation;
