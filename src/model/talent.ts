import { TALENT_ACTIVE } from "@/constants";
import prisma from "@/model/client";

export const queryAllTalent = async (skip?: number, take?: number) => {
  try {
    let talents;
    if (skip === null || take === null) {
      talents = await prisma.talent.findMany({
        where: { status: TALENT_ACTIVE },
        include: { talent_image: true, ethnicity: true },
      });
    } else {
      talents = await prisma.talent.findMany({
        where: { status: TALENT_ACTIVE },
        include: { talent_image: true, ethnicity: true },
        skip,
        take,
      });
    }
    return talents;
  } catch (e) {
    console.error(`error find all talent: ${e}`);
    return [];
  }
};

export const queryTalentByGender = async (
  gender: number,
  skip?: number,
  take?: number,
) => {
  let talents;
  try {
    if (skip === null || take === null) {
      talents = await prisma.talent.findMany({
        where: { gender, status: TALENT_ACTIVE },
        include: { talent_image: true, ethnicity: true },
      });
    } else {
      talents = await prisma.talent.findMany({
        where: { gender, status: TALENT_ACTIVE },
        include: { talent_image: true, ethnicity: true },
        skip,
        take,
      });
    }

    return talents;
  } catch (e) {
    console.error(`error find all talent: ${e}`);
    return [];
  }
};
