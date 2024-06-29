import axios from "axios";
import { GetServerSidePropsContext } from "next";
import React, { useEffect, useState } from "react";

import Layout from "@/components/Layout/Layout";
import TalentView from "@/components/TalentView/TalentView";

import config from "@/config/config";
import { FEMALE, MALE } from "@/constants";
import { TalentType } from "@/model/types";
import { useRouter } from "next/router";

const Talent: React.FC = () => {
  const [talents, setTalents] = useState<TalentType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchTalents = async () => {
      try {
        let data = [];
        if (!router.query.gender && !router.query.type) {
          const res = await axios.get(
            `${config.baseUrl}/api/talent?skip=0&&take=9`,
          );
          data = res.data.talents;
        }
        if (router.query.gender) {
          const res = await axios.get(
            `${config.baseUrl}/api/talent?skip=0&&take=9&&gender=${router.query.gender === "female" ? FEMALE : MALE}`,
          );
          data = res.data.talents;
        }

        if (router.query.type) {
          const res = await axios.get(
            `${config.baseUrl}/api/talent?skip=0&&take=9&&type=${router.query.type}`,
          );
          data = res.data.talents;
        }
        setTalents(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load talents");
        setLoading(false);
      }
    };

    fetchTalents();
  }, [router.query.gender, router.query.type]);

  return (
    <Layout>
      <TalentView talents={talents} />
    </Layout>
  );
};

export default Talent;

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   const { gender, type } = context.query;
//
//   let data;
//
//   if (!gender && !type) {
//     const res = await axios.get(`${config.baseUrl}/api/talent?skip=0&&take=9`);
//     data = res.data.talents;
//
//     return {
//       props: {
//         talentsData: data,
//       },
//     };
//   }
//
//   if (gender) {
//     const res = await axios.get(
//       `${config.baseUrl}/api/talent?skip=0&&take=9&&gender=${gender === "female" ? FEMALE : MALE}`,
//     );
//     data = res.data.talents;
//   }
//
//   if (type) {
//     const res = await axios.get(`${config.baseUrl}/api/talent?type=${type}`);
//     data = res.data.talents;
//   }
//
//   return {
//     props: {
//       talentsData: data,
//     },
//   };
// }
