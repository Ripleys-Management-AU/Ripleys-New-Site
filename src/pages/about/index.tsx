import React from "react";

import Layout from "@/components/Layout/Layout";
import Head from "next/head";
const AboutPage = () => {
  return (
    <Layout>
      <Head>
        <title>About Us | Ripleys Management Australia</title>
        <meta
          name="description"
          content="Learn about Ripleys, a top Melbourne-based talent agency representing actors, extras, and models since 1999."
        />
      </Head>
      <div className="min-h-screen pt-20 lg:pt-44 flex flex-col items-center text-white">
        <div className="w-4/5">
          <h1 className="text-white text-3xl">About Us</h1>
          <div className="w-full mt-8 text-white flex flex-col gap-16 tracking-wider">
            <h2 className="text-xl font-semibold italic mt-8">
              Ripleys Management Australia is a boutique agency representing
              actors, presenters, extras and models.
            </h2>
            <h2 className="text-xl font-semibold italic mt-8">
              Known throughout the years for a fascinating array of character
              faces on their roster, Ripleys has been working alongside
              production companies, advertising agencies and casting agencies
              around Australia since 1999.
            </h2>
            <h2 className="text-xl font-semibold italic mt-8">
              Based in Melbourne, Ripleys has a very personalized working
              relationship with its talent base, and provides guidance and
              hands-on support when its actors are selected to audition for
              roles.
            </h2>
            {/*<p>*/}
            {/*  All Ripleys talent are marketed to clients each year through*/}
            {/*  individual photographic submissions and via this site*/}
            {/*  www.ripleysmanagement.com.au. Ripleys also utilises the latest*/}
            {/*  technology providing clients with talent profile pages that may*/}
            {/*  include resumes, showreels, chats to camera and other information.*/}
            {/*</p>*/}
            {/*<div className="flex items-center gap-8">*/}
            {/*  <img src="/images/bg-quote.png" />*/}
            {/*  <p className="italic">*/}
            {/*    Ripleys is dedicated to providing clients with professionally*/}
            {/*    screened talent and exceptional industry service.*/}
            {/*  </p>*/}
            {/*</div>*/}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
