import prisma from "@/model/client";
import { ProductPayload } from "@/model/types";

export const getAllProducts = async () => {
  try {
    const products = await prisma.product.findMany();
    return products;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const getProductById = async (id: number) => {
  try {
    const targetProduct = await prisma.product.findUnique({ where: { id } });
    const product = targetProduct as ProductPayload;
    return product;
  } catch (e) {
    console.error(e);
    return null;
  }
};
