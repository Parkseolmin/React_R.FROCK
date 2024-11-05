import OrderItem from 'components/OrderItem';
import Postcode from 'components/Postcode';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { formatPrice } from 'util/number';

export default function MyOrder() {
  const location = useLocation();
  const { products, totalAmount } = location.state;
  const hasProducts = products && products.length > 0;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <section className='sectionContents p-7 flex flex-col'>
      <p className='font-Playfair text-2xl text-center font-bold pb-4 border-b border-gray-300'>
        Order / Payment
      </p>
      <div className='pt-5'>
        <p className='text-xl'>* 주문 상품</p>
        {hasProducts && (
          <>
            <ul className='border-b border-gray-300 mb-8 p-4 px-8'>
              {products &&
                products.map((product) => (
                  <OrderItem key={product.id} product={product} />
                ))}
            </ul>
          </>
        )}
      </div>
      <div className='pb-5'>
        <p className='text-xl'>* 결제 정보</p>
        {hasProducts && (
          <>
            <ul className='border-b border-gray-300 p-4 px-8 pb-8'>
              <li className='flex gap-3 text-xl'>
                <p>주문상품 + 배송비 = </p>
                <p>{formatPrice(totalAmount)}원</p>
              </li>
            </ul>
          </>
        )}
      </div>
      <div className='max-w-3xl'>
        <p className='text-xl'>* 배송지</p>
        <Postcode products={products} totalAmount={totalAmount} />
      </div>
    </section>
  );
}
