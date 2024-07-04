import { NextApiRequest, NextApiResponse } from "next";

import { addTalent } from "@/model/talent";

export default async function talentRegistration(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    try {
      const { talent } = req.body;
      const addedTalent = await addTalent(talent);
      if (!addedTalent)
        return res.status(500).json({ error: "error registration" });
      return res.status(201).json({ talent: addedTalent });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: `error registration: ${e}` });
    }
  }
  return res.status(404).json({ error: "request method not found" });
}
