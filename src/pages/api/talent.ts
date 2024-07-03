import { NextApiRequest, NextApiResponse } from "next";

import { TALENT_ACTIVE } from "@/constants";
import {
  queryAllTalents,
  queryTalentById,
  queryTalentFormExp,
  queryTalentsByGender,
} from "@/model/talent";

export default async function talent(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { gender, type, skip, take, action } = req.query;
    if (req.method === "GET") {
      if (!action) {
        if (!gender && !type) {
          if (!skip || !take) {
            const { talents, count } = await queryAllTalents();
            return res.status(200).json({ talents, count });
          } else {
            const { talents, count } = await queryAllTalents(
              Number(skip),
              Number(take),
            );
            return res.status(200).json({ talents, count });
          }
        }

        if (gender) {
          if (!skip || !take) {
            const { talents, count } = await queryTalentsByGender(
              Number(gender),
            );
            return res.status(200).json({ talents, count });
          } else {
            const { talents, count } = await queryTalentsByGender(
              Number(gender),
              Number(skip),
              Number(take),
            );
            return res.status(200).json({ talents, count });
          }
        }
      }

      if (action) {
        if (action === "queryTalentById") {
          const { talentId } = req.query;
          const talent = await queryTalentById(Number(talentId));
          if (!talent)
            return res.status(404).json({ error: "talent not found" });
          if (talent.status !== TALENT_ACTIVE)
            return res.status(404).json({ error: "talent not active" });
          return res.status(200).json({ talent });
        }
      }

      if (action === "queryTalentFormExp") {
        const { accents, languages, licenses, unions } =
          await queryTalentFormExp();
        if (!accents || !languages || !licenses || !unions)
          return res.status(404).json({ error: "results not found" });
        return res.status(200).json({ accents, languages, licenses, unions });
      }
      return res.status(404).json({ error: "query not supported" });
    }
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: e });
  }
}
