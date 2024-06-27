import { NextApiRequest, NextApiResponse } from "next";
import { getAssets } from "@/model/asset";

export default async function asset(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "GET") {
      const assets = await getAssets();
      return res.status(200).json({ assets });
    }
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: e });
  }
}
