import { buffer } from "micro";
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

import prisma from "@/model/client";
import { ANNUAL_RENEWAL, REGISTRATION } from "@/constants";
import moment from "moment";
import { CustomerPayload } from "@/model/types";

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

      await prisma.$transaction(async (prisma) => {
        await prisma.payment.create({
          data: {
            talent_id: Number(talentId),
            product_id: Number(productId),
            amount: 1,
          },
        });

        if (productId === REGISTRATION) {
          await prisma.talent_map_customer.update({
            where: { talent_id: talentId },
            data: { valid_until: moment().add(1, "year").toDate() },
          });
        }

        if (productId === ANNUAL_RENEWAL) {
          const customer = await prisma.talent_map_customer.findUnique({
            where: { talent_id: talentId },
          });

          await prisma.talent_map_customer.update({
            where: { talent_id: talentId },
            data: {
              valid_until: moment((customer as CustomerPayload).valid_until)
                .add(1, "year")
                .toDate(),
            },
          });
        }
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
