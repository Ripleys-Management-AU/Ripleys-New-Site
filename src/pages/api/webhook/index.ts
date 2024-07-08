import { buffer } from "micro";
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

import prisma from "@/model/client";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-06-20",
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"] as any;
    let event;

    try {
      event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
    } catch (err: any) {
      console.error("Error verifying webhook signature:", err);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as any;

      const productId = session.metadata.productId;
      const talentId = session.metadata.talentId;

      await prisma.payment.create({
        data: {
          talent_id: Number(talentId),
          product_id: Number(productId),
          amount: 1,
        },
      });
    }

    if (event.type === "invoice.payment_succeeded") {
      console.log("success");
    }

    return res.status(200).end("Received");
  } else {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method Not Allowed");
  }
}

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
