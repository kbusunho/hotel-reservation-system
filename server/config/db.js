// server/config/db.js

import mongoose from 'mongoose';
import 'dotenv/config'; // .env 파일 로드

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1); // 연결 실패 시 프로세스 종료
  }
};

export default connectDB;
