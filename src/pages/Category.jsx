import React, { useState, useEffect } from "react";
import { useProducts } from "hooks/useProducts";
import { useParams } from "react-router-dom";
import { CiGrid41, CiGrid2V } from "react-icons/ci";
import Loading from "./Loading";
import ProductCard from "components/ProductCard";

export default function Category() {
  const { categoryId } = useParams();
  const [gridClass, setGridClass] = useState("2xl:grid-cols-5");
  const [filteredProducts, setFilteredProducts] = useState([]); // 필터링된 상품 목록을 위한 상태 추가

  const setSmallGrid = () => {
    setGridClass("2xl:grid-cols-5");
  };
  const setLargeGrid = () => {
    setGridClass("2xl:grid-cols-10");
  };

  const {
    productsQuery: { isLoading, error, data: products },
  } = useProducts();

  useEffect(() => {
    if (products) {
      let filtered = products;
      if (categoryId !== "Products") {
        filtered = products.filter(
          (product) => product.category === categoryId
        );
      }
      setFilteredProducts(filtered); // 필터링된 상품 또는 모든 상품 목록을 상태에 저장
    }
  }, [categoryId, products]); // 의존성 배열에 categoryId와 products 추가

  return (
    <section className="sectionContents">
      <div className="w-full h-[70px] flex pl-6 items-center text-3xl font-Playfair bg-slate-200 bg-opacity-40 border border-white border-opacity-50 shadow-lg text-sky-950 uppercase">
        {categoryId}
      </div>
      <div className="relative mt-10">
        <div className="flex absolute top-[-15px] right-[20px] text-xl">
          <button
            onClick={setSmallGrid}
            className={`flex rounded-lg items-center justify-center w-7 h-7 ${
              gridClass === "2xl:grid-cols-5"
                ? "border border-gray-400"
                : "border border-transparent"
            }`}
          >
            <CiGrid2V />
          </button>
          <button
            onClick={setLargeGrid}
            className={`flex rounded-lg items-center justify-center w-7 h-7 ml-2 ${
              gridClass === "2xl:grid-cols-10"
                ? "border border-gray-400"
                : "border border-transparent"
            }`}
          >
            <CiGrid41 />
          </button>
        </div>
        {isLoading && <Loading />}
        {error && <p>{error.message}</p>}
        <ul
          className={`${
            gridClass === "2xl:grid-cols-10"
              ? "grid grid-cols-4 gap-1"
              : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3"
          } ${gridClass} p-4`}
        >
          {filteredProducts &&
            filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                isLargeGrid={gridClass === "2xl:grid-cols-10"}
                product={product}
              />
            ))}
        </ul>
      </div>
    </section>
  );
}
