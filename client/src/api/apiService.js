// client/src/api/apiService.js

import apiClient from './index.js';

// --- 인증 (Auth) ---
export const login = async (email, password) => {
  try {
    const { data } = await apiClient.post('/auth/login', { email, password });
    
    // (중요!) 로그인 성공 시 서버가 준 사용자 정보(토큰 포함)를 로컬 스토리지에 저장
    if (data && data.token) {
      localStorage.setItem('userInfo', JSON.stringify(data));
    }
    return data;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};

export const register = async (username, email, password) => {
  try {
    const { data } = await apiClient.post('/auth/register', {
      username,
      email,
      password,
      // (참고) 기본값 'customer'로 회원가입 됨
    });
    
    // (중요!) 회원가입 성공 시에도 바로 로그인 처리
    if (data && data.token) {
      localStorage.setItem('userInfo', JSON.stringify(data));
    }
    return data;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};

// --- 객실 (Room) ---

// (GET) 모든 객실 목록 가져오기
export const getRooms = async () => {
  try {
    const { data } = await apiClient.get('/rooms');
    return data;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};

// (POST) 새 객실 생성 (관리자)
export const createRoom = async (roomData) => {
  try {
    // (참고) apiClient가 자동으로 헤더에 토큰을 넣어 보냅니다.
    const { data } = await apiClient.post('/rooms', roomData);
    return data;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};

// (PUT) 객실 정보 수정 (관리자)
export const updateRoom = async (roomId, roomData) => {
  try {
    const { data } = await apiClient.put(`/rooms/${roomId}`, roomData);
    return data;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};

// (DELETE) 객실 삭제 (관리자)
export const deleteRoom = async (roomId) => {
  try {
    const { data } = await apiClient.delete(`/rooms/${roomId}`);
    return data;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};
