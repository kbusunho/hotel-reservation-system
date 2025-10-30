// client/src/pages/AdminRooms.jsx (버튼이 모두 포함된 최종본)

import React, { useState, useEffect } from 'react';
import { getRooms, createRoom, updateRoom, deleteRoom } from '../api/apiService';
import Modal from '../components/common/Modal'; 
import RoomForm from '../components/admin/RoomForm';
import Spinner from '../components/common/Spinner'; 

const AdminRooms = () => {
  const [rooms, setRooms] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  // --- 모달 관련 상태 ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null); 
  const [formLoading, setFormLoading] = useState(false);

  // 1. (API) 객실 목록 불러오기 함수
  const fetchRooms = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getRooms(); 
      setRooms(data);
    } catch (err) {
      setError(err.toString());
    } finally {
      setLoading(false);
    }
  };

  // 2. (React) 컴포넌트가 처음 렌더링될 때 객실 목록 불러오기
  useEffect(() => {
    fetchRooms();
  }, []); 

  // --- 모달 창 열기/닫기 핸들러 ---
  const handleOpenCreateModal = () => {
    setSelectedRoom(null); 
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (room) => {
    setSelectedRoom(room); 
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRoom(null);
    setError(null); 
  };

  // 3. (API) 폼 제출 핸들러 (생성 / 수정)
  const handleFormSubmit = async (roomData) => {
    setFormLoading(true);
    setError(null);
    try {
      if (selectedRoom) {
        await updateRoom(selectedRoom._id, roomData);
      } else {
        await createRoom(roomData);
      }
      handleCloseModal(); 
      fetchRooms(); 
    } catch (err) {
      setError(err.toString()); 
    } finally {
      setFormLoading(false);
    }
  };

  // 4. (API) 삭제 핸들러
  const handleDeleteRoom = async (roomId) => {
    // 윈도우 confirm 대신 간단한 confirm 사용 (브라우저 기본)
    if (window.confirm('정말로 이 객실을 삭제하시겠습니까?')) {
      try {
        setError(null);
        await deleteRoom(roomId);
        fetchRooms(); 
      } catch (err) {
        setError(err.toString());
      }
    }
  };

  // --- 렌더링 ---
  if (loading) {
    return <Spinner />; 
  }

  if (error && !isModalOpen) { 
    return (
      <div className="admin-page">
        <p style={{ color: 'red' }}>목록 로딩 실패: {error}</p>
        <button onClick={fetchRooms}>다시 시도</button>
      </div>
    );
  }

  return (
    <div className="admin-page">
      {/* 👇 [1] 새 객실 추가 버튼 👇 */}
      <div className="admin-header">
        <h1>객실 관리</h1>
        <button className="btn btn-primary" onClick={handleOpenCreateModal}>
          + 새 객실 추가
        </button>
      </div>
      
      {rooms.length === 0 ? (
        <p>등록된 객실이 없습니다. 새 객실을 추가해주세요.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>이름</th>
              <th>타입</th>
              <th>가격(1박)</th>
              <th>인원</th>
              <th>상태</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room._id}>
                <td>{room.name}</td>
                <td>{room.type}</td>
                <td>{room.pricePerNight.toLocaleString()} 원</td>
                <td>{room.capacity} 명</td>
                <td>{room.status}</td>
                <td>
                  {/* 👇 [2] 수정/삭제 버튼 👇 */}
                  <div className="actions">
                    <button 
                      className="btn btn-secondary"
                      onClick={() => handleOpenEditModal(room)}
                    >
                      수정
                    </button>
                    <button 
                      className="btn btn-danger"
                      onClick={() => handleDeleteRoom(room._id)}
                    >
                      삭제
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* --- 객실 생성/수정 모달 --- */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={selectedRoom ? '객실 수정' : '새 객실 생성'}
      >
        {error && isModalOpen && <p style={{ color: 'red' }}>{error}</p>}
        
        <RoomForm
          onSubmit={handleFormSubmit}
          initialData={selectedRoom}
          isLoading={formLoading}
          onClose={handleCloseModal} // 👈 '취소' 버튼용
        />
      </Modal>
    </div>
  );
};

export default AdminRooms;

