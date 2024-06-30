import { TALENT_ACTIVE } from "@/constants";
import prisma from "@/model/client";

export const queryAllTalent = async (skip?: number, take?: number) => {
  let talents = [];
  let total = 0;

  try {
    if (skip === null || take === null) {
      [talents, total] = await Promise.all([
        prisma.talent.findMany({
          where: { status: TALENT_ACTIVE },
          include: { talent_image: true, ethnicity: true },
        }),
        prisma.talent.count({
          where: { status: TALENT_ACTIVE },
        }),
      ]);
    } else {
      [talents, total] = await Promise.all([
        prisma.talent.findMany({
          where: { status: TALENT_ACTIVE },
          include: { talent_image: true, ethnicity: true },
          skip,
          take,
        }),
        prisma.talent.count({
          where: { status: TALENT_ACTIVE },
        }),
      ]);
    }
    return { talents, count: total };
  } catch (e) {
    console.error(`error find all talent: ${e}`);
    return { talents, count: total };
  }
};

export const queryTalentByGender = async (
  gender: number,
  skip?: number,
  take?: number,
) => {
  let talents = [];
  let total = 0;

  try {
    if (skip === null || take === null) {
      [talents, total] = await Promise.all([
        prisma.talent.findMany({
          where: { gender, status: TALENT_ACTIVE },
          include: { talent_image: true, ethnicity: true },
        }),
        prisma.talent.count({
          where: { status: TALENT_ACTIVE, gender },
        }),
      ]);
    } else {
      [talents, total] = await Promise.all([
        prisma.talent.findMany({
          where: { gender, status: TALENT_ACTIVE },
          include: { talent_image: true, ethnicity: true },
          skip,
          take,
        }),
        prisma.talent.count({
          where: { status: TALENT_ACTIVE, gender },
        }),
      ]);
    }
    return { talents, count: total };
  } catch (e) {
    console.error(`error find all talent: ${e}`);
    return { talents, count: total };
  }
};
