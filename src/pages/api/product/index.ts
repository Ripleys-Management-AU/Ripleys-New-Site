import { NextApiRequest, NextApiResponse } from "next";

import { getAllProducts } from "@/model/product";

export default async function product(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { action } = req.query;
    if (req.method === "GET") {
      if (action === "getAllProducts") {
        const products = await getAllProducts();
        if (!products)
          return res.status(404).json({ error: "products not found" });
        return res.status(200).json({ products });
      }
    }
    return res.status(404).json({ error: "query not supported" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: e });
  }
}
