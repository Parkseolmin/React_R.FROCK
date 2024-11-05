import React from 'react';
import { RiAdminLine } from 'react-icons/ri';

export default function User({ user: { photoURL, displayName, isAdmin } }) {
  return (
    <li className='shrink-0 relative tablet:hidden'>
      <img
        className='w-8 h-8 rounded-full mr-2'
        src={photoURL}
        alt={displayName}
        referrerPolicy='no-referrer'
      />
      {isAdmin && (
        <RiAdminLine className='absolute top-5 left-6 text-sm text-slate-700' />
      )}
    </li>
  );
}
