import React from "react";

import { ProductPayload } from "@/model/types";

interface Props {
  product: ProductPayload;
  handleCheckOut: (productId: number) => Promise<void>;
}

const PaymentPlanCard: React.FC<Props> = ({ product, handleCheckOut }) => {
  return (
    <div className="bg-card-bg border border-gray-100 rounded-xl px-8 py-4 text-white flex flex-col justify-between min-h-[30vh]">
      <div className="flex flex-col">
        <h1 className="whitespace-nowrap text-3xl font-semibold">
          {product.name}
        </h1>
        <p className="mt-4">{product.description}</p>
        <h1 className="mt-4 text-3xl font-semibold">${product.price}</h1>
      </div>
      <button
        onClick={() => handleCheckOut(Number(product.id))}
        className="btn bg-white text-black px-4 py-1 mt-8 hover:text-white"
      >
        Buy
      </button>
    </div>
  );
};

export default PaymentPlanCard;
