// import { addOrUpdateToCart } from "api/firebase";
// import { useAuthContext } from "context/AuthContext";
import { useCart } from "hooks/useCart";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Button from "ui/Button";
import SuccessAlert from "ui/SuccessAlert";
import { formatPrice } from "util/number";

export default function ProductDetail() {
  const { addOrUpdateItem } = useCart();
  const {
    state: {
      product: { id, image, title, description, category, price, options },
    },
  } = useLocation();
  const [success, setSuccess] = useState();
  const [selected, setSelected] = useState(options && options[0]);
  const handleSelect = (e) => setSelected(e.target.value);
  const handleClick = (e) => {
    const product = { id, image, title, price, option: selected, quantity: 1 };
    addOrUpdateItem.mutate(product, {
      onSuccess: () => {
        setSuccess("장바구니에 추가되었습니다.");
        setTimeout(() => setSuccess(null), 2000);
      },
    });
  };

  return (
    <section className="sectionContents">
      <section className="flex flex-col md:flex-row p-4">
        <div className="w-full px-4 basis-7/12">
          <img className="m-auto" src={image} alt={title} />
        </div>
        <div className="w-full basis-5/12 flex flex-col p-4">
          <p className="mt-4 text-gray-700">{category}</p>
          <h2 className="text-3xl font-bold py-2">{title}</h2>
          <p className="text-2xl font-bold py-2 border-b border-gray-400">
            {formatPrice(price)}원
          </p>
          <p className="py-4 text-lg">{description}</p>
          <div className="flex items-center">
            <label className="font-slate-800 font-bold" htmlFor="select">
              옵션:
            </label>
            <select
              className="p-2 m-4 flex-1 border-2 border-dashed outline-none"
              id="select"
              onChange={handleSelect}
              value={selected}
            >
              {options &&
                options.map((option, index) => (
                  <option key={index}>{option}</option>
                ))}
            </select>
          </div>
          {success && (
            <SuccessAlert message={success} onClose={() => setSuccess(null)} />
          )}
          <Button text="장바구니에 추가" onClick={handleClick} />
        </div>
      </section>
    </section>
  );
}
