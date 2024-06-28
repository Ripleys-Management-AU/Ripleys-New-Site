import prisma from "@/model/client";

export const queryAllTalent = async () => {
  try {
    const talents = await prisma.talent.findMany({
      include: { talent_image: true, ethnicity: true },
    });
    return talents;
  } catch (e) {
    console.error(`error find all talent: ${e}`);
    return [];
  }
};

export const queryTalentByGender = async (gender: number) => {
  try {
    const talents = await prisma.talent.findMany({
      where: { gender },
      include: { talent_image: true, ethnicity: true },
    });
    return talents;
  } catch (e) {
    console.error(`error find all talent: ${e}`);
    return [];
  }
};
