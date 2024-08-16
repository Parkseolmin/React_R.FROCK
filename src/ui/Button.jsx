import React from 'react';

export default function Button({ text, onClick }) {
   return (
      <button
         className='bg-slate-800 py-2 px-4 text-white rounded-sm hover:brightness-110'
         onClick={onClick}
      >
         {text}
      </button>
   );
}
