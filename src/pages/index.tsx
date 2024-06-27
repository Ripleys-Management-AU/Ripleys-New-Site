import Image from "next/image";
import Layout from "@/components/Layout/Layout";
import WebBanner from "@/components/webBanner";
import SectionCards from "@/components/SectionCards/SectionCards";

export default function Home() {
  return (
    <main className="bg-black min-h-screen font-white">
      <Layout>
        <WebBanner />
        <SectionCards />
      </Layout>
    </main>
  );
}
