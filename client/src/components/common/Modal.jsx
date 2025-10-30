// client/src/components/common/Modal.jsx

import React from 'react';

// isOpen: 모달이 열렸는지 (true/false)
// onClose: 모달을 닫는 함수
// title: 모달 제목
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) {
    return null; // 모달이 닫혀있으면 아무것도 렌더링하지 않음
  }

  // 모달 바깥(오버레이) 클릭 시 닫기
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>{title}</h2>
          <button onClick={onClose} className="modal-close-btn">
            &times; {/* 'X' 아이콘 */}
          </button>
        </div>
        <div className="modal-body">
          {children} {/* 이 자리에 폼 등이 들어옴 */}
        </div>
      </div>
    </div>
  );
};

export default Modal;