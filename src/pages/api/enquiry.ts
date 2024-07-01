import { NextApiRequest, NextApiResponse } from "next";

import { addEnquiry } from "@/model/enquiry";

export default async function enquiry(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method === "POST") {
      const { action } = req.query;
      if (action === "submitForm") {
        const { data } = req.body;
        const enquiry = await addEnquiry(data);
        return res.status(200).json({ enquiry });
      }
      return res.status(404).json({ error: "invalid action" });
    }
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: e });
  }
}
