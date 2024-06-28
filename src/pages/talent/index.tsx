import axios from "axios";
import { GetServerSidePropsContext } from "next";
import React from "react";

import Layout from "@/components/Layout/Layout";
import TalentView from "@/components/TalentView/TalentView";

import config from "@/config/config";
import { FEMALE, MALE } from "@/constants";
import { TalentType } from "@/model/types";

interface props {
  talents: TalentType[];
}

const Talent: React.FC<props> = ({ talents }) => {
  return (
    <Layout>
      <TalentView talents={talents} />
    </Layout>
  );
};

export default Talent;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { gender, type } = context.query;

  let data;

  if (!gender && !type) {
    const res = await axios.get(`${config.baseUrl}/api/talent`);
    data = res.data.talents;

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
    data = res.data.talents;
  }

  if (type) {
    const res = await axios.get(`${config.baseUrl}/api/talent?type=${type}`);
    data = res.data.talents;
  }

  return {
    props: {
      talents: data,
    },
  };
}
