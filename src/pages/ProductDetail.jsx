import { useAuthContext } from 'context/AuthContext';
import { useCart } from 'hooks/useCart';
import { useProducts } from 'hooks/useProducts';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from 'ui/Button';
import SuccessAlert from 'ui/SuccessAlert';
import { formatPrice } from 'util/number';

export default function ProductDetail() {
  const { user, login } = useAuthContext();
  const { addOrUpdateItem } = useCart();
  const { deleteProduct } = useProducts(); // 삭제 훅 추가
  const {
    state: {
      product: { id, image, title, description, category, price, options },
    },
  } = useLocation();
  const navigate = useNavigate();
  const [success, setSuccess] = useState();
  const [selected, setSelected] = useState(options && options[0]);
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleSelect = (option) => setSelected(option);

  const handleClick = () => {
    if (!user) {
      login();
      return;
    }
    const product = {
      id,
      image,
      title,
      price,
      option: selected,
      quantity,
    };
    addOrUpdateItem.mutate(product, {
      onSuccess: () => {
        setSuccess('장바구니에 추가되었습니다.');
        setTimeout(() => setSuccess(null), 2000);
      },
    });
  };
  const handleDelete = async () => {
    deleteProduct.mutate(id, {
      onSuccess: () => {
        setSuccess('해당 제품 삭제 완료');
        setTimeout(() => {
          navigate('/'); // 홈으로 리다이렉트
        }, 1000);
      },
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
          {/* 상품 갯수  */}
          <div className='flex items-center gap-4 py-4'>
            <p>수량:</p>
            <button
              onClick={decreaseQuantity}
              className='px-4 py-2 border rounded bg-gray-200'
              disabled={quantity === 1}
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              onClick={increaseQuantity}
              className='px-4 py-2 border rounded bg-gray-200'
            >
              +
            </button>
          </div>
          {/* 상품 갯수  */}
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
