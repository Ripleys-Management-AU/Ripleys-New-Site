import { NextApiRequest, NextApiResponse } from "next";

import { queryAllTalent, queryTalentByGender } from "@/model/talent";

export default async function talent(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { gender, type, skip, take } = req.query;
    if (req.method === "GET") {
      if (!gender && !type) {
        if (!skip || !take) {
          const { talents, count } = await queryAllTalent();
          return res.status(200).json({ talents, count });
        } else {
          const { talents, count } = await queryAllTalent(
            Number(skip),
            Number(take),
          );
          return res.status(200).json({ talents, count });
        }
      }
      if (gender) {
        if (!skip || !take) {
          const { talents, count } = await queryTalentByGender(Number(gender));
          return res.status(200).json({ talents, count });
        } else {
          const { talents, count } = await queryTalentByGender(
            Number(gender),
            Number(skip),
            Number(take),
          );
          return res.status(200).json({ talents, count });
        }
      }
      return res.status(200).json({ talents: [], count: 0 });
    }
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: e });
  }
}
