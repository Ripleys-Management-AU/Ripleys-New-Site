import React, { useState } from "react";

import Layout from "@/components/Layout/Layout";
import TalentsView from "@/components/TalentsView/TalentsView";

import { TalentType } from "@/model/types";
import Head from "next/head";

const TalentPage: React.FC = () => {
  const [talentFullImage, setTalentFullImage] = useState<null | TalentType>(
    null
  );

  return (
    <Layout>
      <Head>
        <title>Talent Agencies | Ripleys Management Australia</title>
        <meta
          name="description"
          content="Explore our diverse roster of talent, including actors, extras, and models. Leading talent agency since 1999."
        />
      </Head>
      <TalentsView
        talentFullImage={talentFullImage}
        setTalentFullImage={setTalentFullImage}
      />
    </Layout>
  );
};

export default TalentPage;

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
