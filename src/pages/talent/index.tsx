import Layout from "@/components/Layout/Layout";
import TalentView from "@/components/TalentView/TalentView";
import { GetServerSidePropsContext } from "next";
import axios from "axios";
import config from "@/config/config";
import { FEMALE, MALE } from "@/constants";

const Talent = () => {
  return (
    <Layout>
      <TalentView />
    </Layout>
  );
};

export default Talent;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { gender, type } = context.query;

  // Fetch data based on the query parameter
  let data = [];

  if (!gender && !type) {
    const res = await axios.get(`${config.baseUrl}/api/talent`);
    data = res.data;

    console.log(data);

    return {
      props: {
        talents: data,
      },
    };
  }

  if (gender) {
    const res = await axios.get(
      `${config.baseUrl}/api/talent?gender=${gender === "female" ? FEMALE : MALE}`,
    );
    data = res.data;
  }

  if (type) {
    const res = await axios.get(`${config.baseUrl}/api/talent?type=${type}`);
    data = res.data;
  }

  return {
    props: {
      talents: data,
    },
  };
}
