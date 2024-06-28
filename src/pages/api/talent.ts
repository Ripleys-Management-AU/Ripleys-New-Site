import { NextApiRequest, NextApiResponse } from "next";

import { queryAllTalent, queryTalentByGender } from "@/model/talent";

export default async function talent(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method === "GET") {
      if (!req.query.gender && !req.query.type) {
        const talents = await queryAllTalent();
        return res.status(200).json({ talents });
      }
      if (req.query.gender) {
        const { gender } = req.query;
        const talents = await queryTalentByGender(Number(gender));
        return res.status(200).json({ talents });
      }
      return res.status(200).json({ talents: [] });
    }
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: e });
  }
}
