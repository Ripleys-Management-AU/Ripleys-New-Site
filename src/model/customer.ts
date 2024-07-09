import prisma from "@/model/client";

export const getCustomerByTalentId = async (talentId: number) => {
  try {
    const customer = await prisma.talent_map_customer.findUnique({
      where: { talent_id: talentId },
    });
    return customer;
  } catch (e) {
    console.error(e);
    return null;
  }
};
