import Layout from "@/components/Layout/Layout";
import WebBanner from "../components/WebBanner/WebBanner";
import SectionCards from "@/components/SectionCards/SectionCards";
import CompanyMarquee from "@/components/CompanyMarquee/CompanyMarquee";

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
