import React, { useState } from 'react';
// import { useQuery } from "@tanstack/react-query";
// import { getAllProducts } from "../api/firebase";
import Loading from '../pages/Loading';
import ProductCard from './ProductCard';
import { CiGrid41, CiGrid2V } from 'react-icons/ci';
import { useProducts } from 'hooks/useProducts';

export default function Products() {
  // 그리드 레이아웃 상태를 boolean으로 관리 대신, string으로 관리하도록 변경
  const [gridClass, setGridClass] = useState('2xl:grid-cols-5');

  //   const {
  //     isLoading,
  //     error,
  //     data: products,
  //   } = useQuery({
  //     queryKey: ["products"],
  //     queryFn: () => getAllProducts(),
  //   });

  const {
    productsQuery: { isLoading, error, data: products },
  } = useProducts();

  // 각 레이아웃 변경 버튼에 대한 설정 함수
  const setSmallGrid = () => {
    setGridClass('2xl:grid-cols-5');
  };

  const setLargeGrid = () => {
    setGridClass('2xl:grid-cols-10');
  };

  return (
    <section className='sectionContents'>
      <div className='flex absolute top-[-15px] right-[20px] text-xl'>
        <button
          onClick={setSmallGrid}
          className={`flex rounded-lg items-center justify-center w-7 h-7 ${
            gridClass === '2xl:grid-cols-5'
              ? 'border border-gray-400'
              : 'border border-transparent'
          }`}
        >
          <CiGrid2V />
        </button>
        <button
          onClick={setLargeGrid}
          className={`flex rounded-lg items-center justify-center w-7 h-7 ml-2 ${
            gridClass === '2xl:grid-cols-10'
              ? 'border border-gray-400'
              : 'border border-transparent'
          }`}
        >
          <CiGrid41 />
        </button>
      </div>
      {isLoading && <Loading />}
      {error && <p>{error.message}</p>}
      <ul
        className={`${
          gridClass === '2xl:grid-cols-10'
            ? 'grid grid-cols-4 gap-1'
            : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3'
        } ${gridClass} p-4`}
      >
        {products &&
          products.map((product) => (
            <ProductCard
              key={product.id}
              isLargeGrid={gridClass === '2xl:grid-cols-10'}
              product={product}
            />
          ))}
      </ul>
    </section>
  );
}
