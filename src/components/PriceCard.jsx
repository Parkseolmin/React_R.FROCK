import React from "react";
import { formatPrice } from "util/number";

export default function PriceCard({ text, price }) {
  return (
    <div className="bg-gray-50 p-8 mx-2 rounded-2xl text-center text-lg md:text-xl">
      <p className="">{text}</p>
      <p className="font-bold text-green-900 text-xl md:text-2xl ">
        {formatPrice(price)}원
      </p>
    </div>
  );
}
