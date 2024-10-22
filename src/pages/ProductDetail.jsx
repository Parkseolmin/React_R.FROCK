// import { addOrUpdateToCart } from "api/firebase";
// import { useAuthContext } from "context/AuthContext";
import { deleteProduct } from 'api/firebase';
import { useAuthContext } from 'context/AuthContext';
import { useCart } from 'hooks/useCart';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from 'ui/Button';
import SuccessAlert from 'ui/SuccessAlert';
import { formatPrice } from 'util/number';

export default function ProductDetail() {
  const { user, login } = useAuthContext();
  const { addOrUpdateItem } = useCart();
  const {
    state: {
      product: { id, image, title, description, category, price, options },
    },
  } = useLocation();
  const navigate = useNavigate();
  const [success, setSuccess] = useState();
  const [selected, setSelected] = useState(options && options[0]);
  const handleSelect = (option) => setSelected(option);
  const handleClick = (e) => {
    if (!user) {
      login();
    }
    const product = {
      id,
      image,
      title,
      price,
      option: selected,
      quantity: 1,
    };
    addOrUpdateItem.mutate(product, {
      onSuccess: () => {
        setSuccess('장바구니에 추가되었습니다.');
        setTimeout(() => setSuccess(null), 2000);
      },
    });
  };
  const handleDelete = async () => {
    try {
      await deleteProduct(id);
      setSuccess('해당 제품 삭제완료');
      setTimeout(() => {
        navigate('/'); // 홈으로 리다이렉트
      }, 2000); // 2초 후에 리다이렉트
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <section className='sectionContents'>
      <section className='flex flex-col md:flex-row p-4'>
        <div className='w-full px-4 basis-7/12'>
          <img className='m-auto' src={image} alt={title} />
        </div>
        <div className='w-full basis-5/12 flex flex-col p-4 gap-6'>
          <p className='mt-4 text-gray-700'>{category}</p>
          <h2 className='text-3xl font-bold py-2'>{title}</h2>
          <p className='text-2xl font-bold py-2 border-b border-gray-400'>
            {formatPrice(price)}원
          </p>
          <p className='py-4 text-lg'>{description}</p>
          <div className='flex items-center gap-4'>
            <p>옵션:</p>
            <div className='flex flex-wrap'>
              {options &&
                options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelect(option)}
                    className={`m-1 p-2 border rounded w-12 h-12 ${
                      selected === option ? 'bg-gray-300' : 'bg-white'
                    } hover:bg-gray-200 transition duration-200`}
                  >
                    {option}
                  </button>
                ))}
            </div>
          </div>
          {success && (
            <SuccessAlert message={success} onClose={() => setSuccess(null)} />
          )}
          <Button text='장바구니에 추가' onClick={handleClick} />
          {user && user.isAdmin && (
            <Button text='제품 등록 삭제' onClick={handleDelete} />
          )}
        </div>
      </section>
    </section>
  );
}
