import React from 'react';

export default function Loading() {
   return (
      <>
         <div className='loading-container'>
            <div className='loading-spinner'></div>
            <p className='loading-text'>로딩 중...</p>
         </div>
      </>
   );
}
