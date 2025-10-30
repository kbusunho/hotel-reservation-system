// server/models/user.model.js

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, '사용자 이름을 입력해주세요.'],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, '이메일을 입력해주세요.'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, '올바른 이메일 형식이 아닙니다.'],
    },
    password: {
      type: String,
      required: [true, '비밀번호를 입력해주세요.'],
      minlength: 6,
    },
    role: {
      type: String,
      enum: ['customer', 'admin'], // 'customer' 또는 'admin'만 가능
      default: 'customer',
    },
  },
  {
    timestamps: true, // createdAt, updatedAt 자동 생성
  }
);

// (중요!) 비밀번호 저장 전 암호화
userSchema.pre('save', async function (next) {
  // 비밀번호가 변경되었을 때만 암호화 실행
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// (로그인 시 사용) 비밀번호 비교 메서드
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
