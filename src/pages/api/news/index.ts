import { NextApiRequest, NextApiResponse } from "next";

import { getNews } from "@/model/news";
import { NewsPayload } from "@/model/types";

export default async function News(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "GET") {
      const { action } = req.query;
      if (action === "getAllNews") {
        const allNews = await getNews();
        const news = allNews as NewsPayload[];
        if (!news) return res.status(404).json({ error: "news not found" });
        return res.status(200).json({ news });
      }
      return res.status(404).json({ error: "invalid action" });
    }
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: e });
  }
}
