import CompanyMarquee from "@/components/CompanyMarquee/CompanyMarquee";
import Layout from "@/components/Layout/Layout";
import SectionCards from "@/components/SectionCards/SectionCards";

import WebBanner from "../components/WebBanner/WebBanner";

export default function Home() {
  return (
    <main className="bg-black min-h-screen">
      <Layout>
        <WebBanner />
        <SectionCards />
        <CompanyMarquee />
      </Layout>
    </main>
  );
}
