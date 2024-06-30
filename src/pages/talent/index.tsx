import React, { useState } from "react";

import Layout from "@/components/Layout/Layout";
import TalentsView from "@/components/TalentsView/TalentsView";

import { TalentType } from "@/model/types";

const TalentPage: React.FC = () => {
  const [talentFullImage, setTalentFullImage] = useState<null | TalentType>(
    null,
  );

  return (
    <Layout>
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
