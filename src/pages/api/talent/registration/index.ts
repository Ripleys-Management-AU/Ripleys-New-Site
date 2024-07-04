import { NextApiRequest, NextApiResponse } from "next";

import { addTalent } from "@/model/talent";

export default async function talentRegistration(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    try {
      const { talentFinalData } = req.body;
      const talent = await addTalent(talentFinalData);
      if (!talent) return res.status(500).json({ error: "error registration" });
      return res.status(201).json({ talent });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: `error registration: ${e}` });
    }
  }
  return res.status(404).json({ error: "request method not found" });
}
