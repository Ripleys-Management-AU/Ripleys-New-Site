import {
  filmCompanyLogosSectionOne,
  filmCompanyLogosSectionTwo,
} from "@/data/companyLogos";

import CompanyMarquee from "@/components/CompanyMarquee/CompanyMarquee";
import Layout from "@/components/Layout/Layout";
import SectionCards from "@/components/SectionCards/SectionCards";

import WebBanner from "../components/WebBanner/WebBanner";
import Head from "next/head";

export default function Home() {
  return (
    <main className="bg-black min-h-screen">
      <Layout>
        <Head>
          <title>
            Home - Ripleys Management Australia | Leading Talent Agency
          </title>
          <meta
            name="description"
            content="Ripleys Management Australia, representing top actors, extras, and models since 1999. Your premier choice for casting and talent needs."
          />
        </Head>
        <WebBanner />
        <CompanyMarquee
          title="Casting Companies We Work With"
          direction="right"
          logos={filmCompanyLogosSectionOne}
        />
        <SectionCards />
        <CompanyMarquee
          title="Who We'Re Working With"
          logos={filmCompanyLogosSectionTwo}
        />
      </Layout>
    </main>
  );
}
