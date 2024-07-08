import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { TiTick } from "react-icons/ti";
import { RotatingLines } from "react-loader-spinner";

import Layout from "@/components/Layout/Layout";

const SuccessPage = () => {
  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, 5000);

  return (
    <Layout>
      <div className="min-h-screen pt-20 lg:pt-44 flex flex-col items-center text-white">
        <div className="w-4/5 min-h-screen">
          <div className="w-full min-h-[80vh] lg:min-h-[60vh] flex flex-col justify-center items-center">
            {loading ? (
              <>
                <RotatingLines
                  visible={true}
                  //eslint-disable-next-line
                  // @ts-ignore
                  height="80"
                  //eslint-disable-next-line
                  // @ts-ignore
                  width="80"
                  strokeColor="white"
                  strokeWidth="5"
                  animationDuration="0.75"
                  ariaLabel="rotating-lines-loading"
                />
                <h1 className="text-xl">
                  Processing your payment, please wait
                </h1>
              </>
            ) : (
              <>
                <TiTick size={80} />
                <h1 className="text-xl">
                  Your payment has been processed successfully
                </h1>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SuccessPage;
