import React from 'react';

export default function Banner() {
   return (
      <section className='sectionContents h-[500px] bg-zinc-800 relative'>
         <div className='w-full h-full bg-cover bg-banner bg-center opacity-80'></div>
         <div className='absolute w-full top-40 text-center text-gray-50 drop-shadow-xl font-Playfair'>
            <h2 className='text-6xl md:text-5xl sm:text-4xl'>
               Passion is the secret of all beauty.
            </h2>
            <p className='md:text-3xl sm:text-lg pt-4 pb-4'>
               There is nothing beautiful without passion.
            </p>
            <p className='sm:text-lg md:text-xl'>- Christian Dior -</p>
         </div>
      </section>
   );
}
