import {
  filmCompanyLogosSectionOne,
  filmCompanyLogosSectionTwo,
} from "@/data/companyLogos";

import CompanyMarquee from "@/components/CompanyMarquee/CompanyMarquee";
import Layout from "@/components/Layout/Layout";
import SectionCards from "@/components/SectionCards/SectionCards";

import WebBanner from "../components/WebBanner/WebBanner";

export default function Home() {
  return (
    <main className="bg-black min-h-screen">
      <Layout>
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
