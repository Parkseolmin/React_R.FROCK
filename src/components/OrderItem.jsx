import { formatPrice } from 'util/number';

export default function OrderItem({
  product,
  product: { id, image, title, option, quantity, price },
}) {
  return (
    <li className='flex justify-between my-2 items-center'>
      <img className='w-24 md:w-48 rounded-lg ' src={image} alt={title} />
      <div className='flex flex-1 justify-between ml-4'>
        <div className='basis-3/5 flex flex-col gap-3'>
          <p className='text-lg'>{title}</p>
          <p className='text-lg font-bold text-green-900'>옵션 : {option}</p>
          <p className='text-lg font-bold text-green-900'>수량 {quantity}개</p>
          <p>{formatPrice(price * quantity)}원</p>
        </div>
      </div>
    </li>
  );
}
