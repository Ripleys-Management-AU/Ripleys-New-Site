import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

import TalentConfirmationForm from "@/components/Form/TalentConfirmationForm";
import Layout from "@/components/Layout/Layout";

import { TalentContext } from "@/context/talent/TalentProvider";
import { ProductPayload } from "@/model/types";

const PaymentPage = () => {
  const { currentTalent } = useContext(TalentContext);
  const [products, setProducts] = useState<ProductPayload[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/api/product?action=getAllProducts");
        console.log(res.data);
        setProducts(res.data.products);
      } catch (e) {
        console.error(e);
      }
    };
    fetchProducts();
  }, []);

  const handleCheckout = async (productId: number) => {
    if (!currentTalent) return;
    const res = await axios.post("/api/checkout/createSession", {
      productId,
      talentId: currentTalent?.id,
    });

    const { url } = await res.data;
    window.location.href = url;
  };

  return (
    <Layout>
      <div className="min-h-screen pt-20 lg:pt-44 flex flex-col items-center text-white">
        <div className="w-4/5">
          <h1 className="text-white text-3xl">Make a Payment</h1>
          <div className="text-center mt-4 text-light-grey text-md leading-8">
            <p>
              {currentTalent
                ? `Hi ${currentTalent.first_name} ${currentTalent.first_name}, Please select product and make a payment`
                : "Please complete the below form to confirm your information."}
            </p>
          </div>
          <div className="w-full">
            {currentTalent ? (
              <div>
                <ul>
                  {products.map((product) => (
                    <li key={product.id}>
                      {product.name} - ${product.price.toFixed(2)}
                      <button
                        onClick={() => handleCheckout(Number(product.id))}
                        className="text-white"
                      >
                        Buy
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <TalentConfirmationForm />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PaymentPage;
