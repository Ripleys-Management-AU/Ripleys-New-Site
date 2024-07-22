import React from "react";

import { bookingTermsData } from "@/data/bookingTermsData";

import Layout from "@/components/Layout/Layout";
import Head from "next/head";

const TermsPage = () => {
  return (
    <Layout>
         <Head>
        <title>Booking Terms | Ripleys Management Australia</title>
        <meta
          name="description"
          content="Review our booking terms and conditions for talent employment, including MEAA rates and contract details."
        />
      </Head>
      <div className="min-h-screen pt-20 lg:pt-44 flex flex-col items-center text-white">
        <div className="w-4/5">
          <h1 className="text-white text-3xl">Booking Terms</h1>
          <div className="w-full mt-8 text-white flex flex-col gap-16 tracking-wider">
            <h2 className="text-xl font-semibold italic mt-8">
              The employment of any person or persons registered with Ripleys
              Management Australia shall be deemed to constitute acceptance of
              the terms and conditions herewith.
            </h2>
            {bookingTermsData.map((item, index) => (
              <div key={index} className="flex flex-col gap-4">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TermsPage;
