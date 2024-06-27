import prisma from "@/model/client";

export const getAssets = async () => {
  const assets = await prisma.asset.findMany();
  return assets;
};
