// client/src/api/apiService.js

import apiClient from './index.js';

// --- 인증 (Auth) ---
export const login = async (email, password) => {
  try {
    const { data } = await apiClient.post('/auth/login', { email, password });
    
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
    });
    
    if (data && data.token) {
      localStorage.setItem('userInfo', JSON.stringify(data));
    }
    return data;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};

// --- 객실 (Room) ---

// (GET) 모든 객실 목록 가져오기 (관리자용)
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

// --- 예약 (Reservation) ---

// (GET) 예약 가능한 객실 목록 가져오기 (고객용)
export const getAvailableRooms = async ({ checkIn, checkOut, capacity }) => {
  try {
    const { data } = await apiClient.get('/rooms/available', {
      params: { checkIn, checkOut, capacity },
    });
    return data;
  } catch (error) {
    // API 에러가 났을 때, "사용 가능한 객실이 없습니다" 등의 메시지를 보여줄 수 있음
    throw error.response?.data?.message || error.message;
  }
};

// (추후 추가) 새 예약 생성
// export const createReservation = async (reservationData) => { ... };
