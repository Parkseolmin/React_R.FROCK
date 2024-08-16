import React from 'react';
import { FaBarsStaggered } from 'react-icons/fa6';

export default function CloseButton({ handleClick }) {
   return (
      <div onClick={handleClick} className='mobile__menu'>
         <FaBarsStaggered />
      </div>
   );
}
