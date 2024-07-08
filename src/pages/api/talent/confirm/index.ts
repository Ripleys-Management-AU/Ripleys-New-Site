import { NextApiRequest, NextApiResponse } from "next";

import { getTalentByName } from "@/model/talent";

export default async function confirm(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { first_name, last_name } = req.query;
    if (!first_name || !last_name)
      return res
        .status(403)
        .json({ error: "first name or last name is missing" });

    const firstName = Array.isArray(first_name) ? first_name[0] : first_name;
    const lastName = Array.isArray(last_name) ? last_name[0] : last_name;

    const talent = await getTalentByName(firstName, lastName);

    if (!talent) return res.status(404).json({ error: "talent not found" });

    return res.status(200).json({ talent });
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ error: `error confirm talent information: ${e}` });
  }
}
