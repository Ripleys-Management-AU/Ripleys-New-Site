import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

import TalentConfirmationForm from "@/components/Form/TalentConfirmationForm";
import Layout from "@/components/Layout/Layout";
import PaymentPlanCard from "@/components/PaymentPlanCard/PaymentPlanCard";

import { ANNUAL_RENEWAL, REGISTRATION, SHOWREELS } from "@/constants";
import { TalentContext } from "@/context/talent/TalentProvider";
import { ProductPayload } from "@/model/types";
import Head from "next/head";

const PaymentPage = () => {
  const { currentTalent } = useContext(TalentContext);
  const [products, setProducts] = useState<ProductPayload[]>([]);

  useEffect(() => {
    if (!currentTalent) return;
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/api/product?action=getAllProducts");

        const filteredProducts = res.data.products.filter(
          (product: ProductPayload) => {
            if (!currentTalent) return false;
            if (!currentTalent.payment) return product.id !== ANNUAL_RENEWAL;

            let registrationFeePaid = false;
            let showreelsPaid = false;

            for (const payment of currentTalent.payment) {
              if (payment.product_id === REGISTRATION) {
                registrationFeePaid = true;
              }
              if (payment.product_id === SHOWREELS) {
                showreelsPaid = true;
              }
            }

            if (!registrationFeePaid && product.id === ANNUAL_RENEWAL) {
              return false;
            }

            if (registrationFeePaid && product.id === REGISTRATION) {
              return product.id !== REGISTRATION;
            }

            if (showreelsPaid && product.id === SHOWREELS) {
              return product.id !== SHOWREELS;
            }

            return true;
          },
        );

        setProducts(filteredProducts);
      } catch (e) {
        console.error(e);
      }
    };
    fetchProducts();
  }, [currentTalent]);

  const handleCheckout = async (productId: number) => {
    if (!currentTalent) return;
    const res = await axios.post("/api/checkout/createSession", {
      productId,
      talentId: currentTalent?.id,
      email: currentTalent.email,
    });

    const { url } = await res.data;
    window.location.href = url;
  };

  return (
    <Layout>
      <Head>
        <title>Make A Payment | Ripleys Management Australia</title>
        <meta
          name="description"
          content="Securely make payments for your bookings and services. Trusted talent agency since 1999."
        />
      </Head>
      <div className="min-h-screen pt-20 lg:pt-44 flex flex-col items-center text-white">
        <div className="w-4/5">
          <h1 className="text-white text-3xl">Make a Payment</h1>
          <div className="text-center mt-4 text-light-grey text-md leading-8">
            <p>
              {currentTalent
                ? `Hi ${currentTalent.first_name} ${currentTalent.last_name}, please select product and make a payment`
                : "Please complete the below form to confirm your information."}
            </p>
          </div>
          <div className="w-full mt-8">
            {currentTalent ? (
              <div className="grid lg:grid-cols-3 gap-8">
                {products.map((product) => (
                  <PaymentPlanCard
                    key={product.id}
                    product={product}
                    handleCheckOut={handleCheckout}
                  />
                ))}
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
