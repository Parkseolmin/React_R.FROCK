import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '../util/number';

export default function ProductCard({
  product,
  product: { id, image, title, category, price },
  isLargeGrid, // isLargeGrid를 props로 받음
}) {
  const navigate = useNavigate();
  return (
    <li
      onClick={() => {
        navigate(`/products/${id}`, { state: { product } });
      }}
      className='rounded-sm shadow-lg overflow-hidden cursor-pointer'
    >
      <img
        className={`w-full m-auto ${isLargeGrid ? 'p-0' : 'p-8'} sm:p-0`}
        src={image}
        alt={title}
        loading='lazy'
      ></img>
      {/* isLargeGrid가 false일 때만 아래의 정보를 보여줌 */}
      {!isLargeGrid && (
        <div className='text-center pb-5'>
          <div className='mt-2 px-2 text-sm flex flex-col gap-2'>
            <p className='mt-2 px-2 text-gray-600 text-lg  font-Playfair'>
              {category}
            </p>
            <h3 className='truncate text-base font-NotoSans'>{title}</h3>
            <p className='text-sm'>{`${formatPrice(price)}원`}</p>
          </div>
        </div>
      )}
    </li>
  );
}
