import prisma from "@/model/client";
import { CustomerPayload } from "@/model/types";

export const getCustomerByTalentId = async (talentId: number) => {
  try {
    const targetCustomer = await prisma.talent_map_customer.findUnique({
      where: { talent_id: talentId },
    });

    const customer = targetCustomer as CustomerPayload;
    return customer;
  } catch (e) {
    console.error(e);
    return "error";
  }
};

export const addCustomer = async (
  talentId: number,
  stripeCustomerId: string,
) => {
  try {
    const newCustomer = await prisma.talent_map_customer.create({
      data: {
        talent_id: talentId,
        stripe_customer_id: stripeCustomerId,
      },
    });
    const customer = newCustomer as CustomerPayload;
    return customer;
  } catch (e) {
    console.error(e);
    return null;
  }
};
