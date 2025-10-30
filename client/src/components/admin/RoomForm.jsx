// client/src/components/admin/RoomForm.jsx (완성본)

import React, { useState, useEffect } from 'react';

// onSubmit: 폼 제출 시 실행될 함수 (AdminRooms.jsx에서 전달)
// initialData: '수정'일 경우 채워질 초기 데이터
// isLoading: 로딩 중일 때 버튼 비활성화
const RoomForm = ({ onSubmit, initialData = null, isLoading = false, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'Standard',
    pricePerNight: '',
    capacity: 2,
    description: '',
    status: 'available',
  });

  // initialData가 (수정 모드로) 전달되면 폼 상태를 업데이트
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        type: initialData.type || 'Standard',
        pricePerNight: initialData.pricePerNight || '',
        capacity: initialData.capacity || 2,
        description: initialData.description || '',
        status: initialData.status || 'available',
      });
    } else {
      // '생성' 모드일 경우 폼 리셋
      setFormData({
        name: '', type: 'Standard', pricePerNight: '',
        capacity: 2, description: '', status: 'available',
      });
    }
  }, [initialData]); // initialData가 바뀔 때마다 실행

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      // 숫자가 되어야 하는 필드를 위해 number로 변환
      [name]: (name === 'pricePerNight' || name === 'capacity') ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // 부모 컴포넌트(AdminRooms)로 데이터 전달
  };

  return (
    <form onSubmit={handleSubmit} className="modal-form">
      <div className="form-group">
        <label htmlFor="name">객실 이름</label>
        <input
          type="text" id="name" name="name"
          value={formData.name} onChange={handleChange} required
        />
      </div>
      <div className="form-group">
        <label htmlFor="type">객실 타입</label>
        <select
          id="type" name="type"
          value={formData.type} onChange={handleChange} required
        >
          <option value="Standard">Standard</option>
          <option value="Deluxe">Deluxe</option>
          <option value="Suite">Suite</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="pricePerNight">가격 (1박)</label>
        <input
          type="number" id="pricePerNight" name="pricePerNight"
          value={formData.pricePerNight} onChange={handleChange} required
          min="0"
        />
      </div>
      <div className="form-group">
        <label htmlFor="capacity">최대 인원</label>
        <input
          type="number" id="capacity" name="capacity"
          value={formData.capacity} onChange={handleChange} required
          min="1"
        />
      </div>
      <div className="form-group">
        <label htmlFor="status">객실 상태</label>
        <select
          id="status" name="status"
          value={formData.status} onChange={handleChange} required
        >
          <option value="available">이용 가능 (available)</option>
          <option value="maintenance">점검 중 (maintenance)</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="description">객실 설명</label>
        <textarea
          id="description" name="description"
          value={formData.description} onChange={handleChange}
          rows="3"
        ></textarea>
      </div>
      
      {/* 👇 이 부분에 '생성하기' 버튼이 있습니다! 👇 */}
      <div className="modal-footer">
        <button 
          type="button" 
          className="btn btn-secondary" 
          onClick={onClose} /* AdminRooms.jsx의 handleCloseModal 함수를 호출 */
        >
          취소
        </button>
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? '저장 중...' : (initialData ? '수정하기' : '생성하기')}
        </button>
      </div>
    </form>
  );
};

export default RoomForm;
