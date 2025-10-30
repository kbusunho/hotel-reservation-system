// client/src/components/common/Spinner.jsx

import React from 'react';

// 이 컴포넌트는 App.jsx에서 loading 상태일 때 보여줄
// 전체 화면 로딩 스피너입니다.
// main.css에 .spinner-overlay와 .spinner 스타일이 정의되어 있습니다.

const Spinner = () => {
  return (
    <div className="spinner-overlay">
      <div className="spinner"></div>
    </div>
  );
};

export default Spinner;