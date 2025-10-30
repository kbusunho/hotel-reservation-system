// client/src/api/index.js

import axios from 'axios';

// 백엔드 API 주소 (Vite .env 파일을 무시하고 직접 입력)
const API_BASE_URL = 'http://localhost:3000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// (중요!) 요청 인터셉터: API 요청을 보내기 직전에 실행
// 로컬 스토리지에서 토큰을 가져와 헤더에 추가합니다.
apiClient.interceptors.request.use(
  (config) => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const { token } = JSON.parse(userInfo);
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
