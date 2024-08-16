// SuccessAlert.js
import React, { useEffect, useState } from 'react';

const SuccessAlert = ({ message, onClose }) => {
   const [visible, setVisible] = useState(true);

   useEffect(() => {
      const timer = setTimeout(() => {
         setVisible(false);
         onClose(); // 부모 컴포넌트에서 전달받은 onClose 함수 호출
      }, 2000); // 2초 후에 알림이 사라집니다.

      return () => clearTimeout(timer);
   }, [onClose]);

   if (!visible) return null;

   return (
      <div className='successAlert'>
         <p>{message}</p>
      </div>
   );
};

export default SuccessAlert;
