import axios from "axios";
import { GetServerSidePropsContext } from "next";
import React from "react";

import Layout from "@/components/Layout/Layout";
import NewsCard from "@/components/NewsCard/NewsCard";

import config from "@/config/config";
import { NewsPayload } from "@/model/types";

interface Props {
  data: NewsPayload[];
}

const NewsPage: React.FC<Props> = ({ data }) => {
  return (
    <Layout>
      <div className="min-h-screen pt-20 lg:pt-44 flex flex-col items-center text-white">
        <div className="w-4/5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {data.map((item) => (
              <NewsCard key={item.id} news={item} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NewsPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const res = await axios.get(`${config.baseUrl}/api/news?action=getAllNews`);
    const { news } = res.data;
    if (!news) return { props: { data: [] } };
    return { props: { data: news } };
  } catch (e) {
    return { props: { data: [] } };
  }
}
