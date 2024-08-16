// import { addOrUpdateToCart, removeFromCart } from "api/firebase";
import { useCart } from "hooks/useCart";
import React from "react";
import { AiOutlinePlusSquare, AiOutlineMinus } from "react-icons/ai";
import { RiDeleteBin5Line } from "react-icons/ri";
import { formatPrice } from "util/number";
export default function CartItem({
  product,
  product: { id, image, title, option, quantity, price },
}) {
  const { addOrUpdateItem, removeItem } = useCart();
  const handleMinus = () => {
    if (quantity < 2) return;
    addOrUpdateItem.mutate({ ...product, quantity: quantity - 1 });
  };
  const handlePlus = () =>
    addOrUpdateItem.mutate({ ...product, quantity: quantity + 1 });

  const handleDelete = () => removeItem.mutate(id);

  return (
    <li className="flex justify-between my-2 items-center">
      <img className="w-24 md:w-48 rounded-lg " src={image} alt={title} />
      <div className="flex flex-1 justify-between ml-4">
        <div className="basis-3/5">
          <p className="text-lg">{title}</p>
          <p className="text-xl font-bold text-green-900">{option}</p>
          <p>{formatPrice(price)}원</p>
        </div>
        <div className="text-2xl flex items-center">
          <AiOutlineMinus
            className="transition-all cursor-pointer mx-1"
            onClick={handleMinus}
          />
          <span>{quantity}</span>
          <AiOutlinePlusSquare
            className="transition-all cursor-pointer mx-1"
            onClick={handlePlus}
          />
          <RiDeleteBin5Line
            className="transition-all cursor-pointer mx-1"
            onClick={handleDelete}
          />
        </div>
      </div>
    </li>
  );
}
