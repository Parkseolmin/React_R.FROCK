import React from 'react';
// import { useQuery } from "@tanstack/react-query";
// import { getCart } from "api/firebase";
// import { useAuthContext } from 'context/AuthContext';
import Loading from './Loading';
import CartItem from 'components/CartItem';
import PriceCard from 'components/PriceCard';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { FaEquals } from 'react-icons/fa';
import Button from 'ui/Button';
import { useCart } from 'hooks/useCart';
import { useNavigate } from 'react-router-dom';

const SHIPPING = 1000;
export default function MyCart() {
  // const { user } = useAuthContext();
  const navigate = useNavigate();
  const {
    cartQuery: { isLoading, data: products },
  } = useCart();
  if (isLoading) return <Loading />;

  const hasProducts = products && products.length > 0;
  const totalPrice =
    products &&
    products.reduce(
      (prev, current) => prev + parseInt(current.price) * current.quantity,
      0
    );
  const totalAmount = totalPrice + SHIPPING;
  return (
    <section className='sectionContents p-8 flex flex-col'>
      <p className='font-Playfair text-2xl text-center font-bold pb-4 border-b border-gray-300'>
        MY Cart
      </p>
      {!hasProducts && <p>장바구니에 상품이 없습니다.🥲</p>}
      {hasProducts && (
        <>
          <ul className='border-b border-gray-300 mb-8 p-4 px-8'>
            {products &&
              products.map((product) => (
                <CartItem key={product.id} product={product} />
              ))}
          </ul>
          <div className='flex justify-between items-center mb-6 px-2 md:px-8 lg:px-16'>
            <PriceCard text='상품 총액' price={totalPrice} />
            <BsFillPlusCircleFill className='shrink-0' />
            <PriceCard text='배송액' price={SHIPPING} />
            <FaEquals className='shrink-0' />
            <PriceCard text='총가격' price={totalPrice + SHIPPING} />
          </div>
          <Button
            text='주문하기'
            onClick={() => {
              navigate('/orders', {
                state: { products, totalAmount },
              });
            }}
          />
        </>
      )}
    </section>
  );
}
