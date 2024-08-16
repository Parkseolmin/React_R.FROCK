import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
   return (
      <div className='not-found-container'>
         <h1>404</h1>
         <p>죄송합니다. 찾고 있는 페이지를 찾을 수 없습니다.</p>
         <Link to='/'>홈으로 돌아가기</Link>
      </div>
   );
}
