import React from "react";

import Layout from "@/components/Layout/Layout";

const AboutPage = () => {
  return (
    <Layout>
      <div className="min-h-screen pt-20 lg:pt-44 flex flex-col items-center text-white">
        <div className="w-4/5">
          <h1 className="text-white text-3xl">About Us</h1>
          <div className="w-full mt-8 text-white flex flex-col gap-16 tracking-wider">
            <h2 className="text-xl font-semibold italic mt-8">
              Ripleys Management Australia is a small boutique agency
              representing extras and interesting/character faces for
              Film,Television, TV commercials, photographic modelling and print
              advertising.
            </h2>
            <p>
              Ripleys is based in Melbourne and is owned and operated by Karu
              Balasundram and represents only a select number of talent from
              everyday looking or corporate to 'interesting' and 'character'
              faces.
            </p>
            <p>
              Ripleys endeavours to personally meet client's needs by providing
              them with an accurate and efficient talent database. We only offer
              places to talent who are reliable and have good flexibility in
              their Monday-Friday week. Ripleys is committed in this industry to
              providing the best personal service to our clients and our talent.
            </p>
            <p>
              All Ripleys talent are marketed to clients each year through
              individual photographic submissions and via this site
              www.ripleysmanagement.com.au. Ripleys also utilises the latest
              technology providing clients with talent profile pages that may
              include resumes, showreels, chats to camera and other information.
            </p>
            <div className="flex items-center gap-8">
              <img src="/images/bg-quote.png" />
              <p className="italic">
                Ripleys is dedicated to providing clients with professionally
                screened talent and exceptional industry service.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
