import React from "react";
import { GiShoppingCart } from "react-icons/gi";
// import { useQuery } from "@tanstack/react-query";
// import { getCart } from "api/firebase";
// import { useAuthContext } from "context/AuthContext";
import { useCart } from "hooks/useCart";

export default function CartStatus() {
  // const { uid } = useAuthContext();
  const {
    cartQuery: { data: products },
  } = useCart();

  return (
    <div className="relative ">
      <GiShoppingCart className="text-4xl" />
      {products && (
        <p className="absolute w-6 h-6 leading-5 text-center bg-slate-400 text-white  rounded-full top-[-7px] right-[-10px]">
          {products.length}
        </p>
      )}
    </div>
  );
}
