import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

import config from "@/config/config";
import { addCustomer, getCustomerByTalentId } from "@/model/customer";
import { getProductById } from "@/model/product";
import { CustomerPayload } from "@/model/types";

const stripe = new Stripe(config.stripeSecretKey as string, {
  apiVersion: "2024-06-20",
});

export default async function createSession(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { productId, talentId, email } = req.body;
    try {
      const product = await getProductById(Number(productId));

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      let customer: CustomerPayload | string | null =
        await getCustomerByTalentId(Number(talentId));

      if (customer === "error") {
        throw new Error("Error get customer");
      }

      if (!customer) {
        const stripeCustomer = await stripe.customers.create({
          metadata: { talentId: talentId.toString() },
        });
        customer = await addCustomer(talentId, stripeCustomer.id);
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "aud",
              product_data: {
                name: product.name,
              },
              unit_amount: product.price * 100,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        customer: (customer as CustomerPayload).stripe_customer_id,
        success_url: `${req.headers.origin}/forTalents/payment/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/forTalents/payment`,
        metadata: {
          productId: product.id.toString(),
          talentId: talentId.toString(),
        },
      });

      res.status(200).json({ id: session.id, url: session.url });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
