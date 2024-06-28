import prisma from "@/model/client";

export const queryAllTalent = async () => {
  try {
    const talents = await prisma.talent.findMany({
      include: { talent_image: true },
    });
    console.log(talents);
    return talents;
  } catch (e) {
    console.error(`error find all talent: ${e}`);
    return [];
  }
};
