import { TALENT_ACTIVE } from "@/constants";
import prisma from "@/model/client";
import { TalentType } from "@/model/types";

export const queryAllTalents = async (skip?: number, take?: number) => {
  let talents: TalentType[] = [];
  let total: number = 0;

  try {
    if (skip === null || take === null) {
      const results = await Promise.all([
        prisma.talent.findMany({
          where: { status: TALENT_ACTIVE },
          include: { talent_image: true, ethnicity: true },
        }),
        prisma.talent.count({
          where: { status: TALENT_ACTIVE },
        }),
      ]);
      talents = results[0] as TalentType[];
      total = results[1] as number;
    } else {
      const results = await Promise.all([
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
      talents = results[0] as TalentType[];
      total = results[1] as number;
    }
    return { talents, count: total };
  } catch (e) {
    console.error(`error find all talents: ${e}`);
    return { talents, count: total };
  }
};

export const queryTalentsByGender = async (
  gender: number,
  skip?: number,
  take?: number,
) => {
  let talents: TalentType[] = [];
  let total: number = 0;

  try {
    if (skip === null || take === null) {
      const results = await Promise.all([
        prisma.talent.findMany({
          where: { gender, status: TALENT_ACTIVE },
          include: { talent_image: true, ethnicity: true },
        }),
        prisma.talent.count({
          where: { status: TALENT_ACTIVE, gender },
        }),
      ]);
      talents = results[0] as TalentType[];
      total = results[1] as number;
    } else {
      const results = await Promise.all([
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
      talents = results[0] as TalentType[];
      total = results[1] as number;
    }
    return { talents, count: total };
  } catch (e) {
    console.error(`error find talents by gender: ${e}`);
    return { talents, count: total };
  }
};

export const queryTalentById = async (id: number) => {
  let talent: TalentType | null = null;
  try {
    talent = (await prisma.talent.findUnique({
      where: { id },
      include: { talent_image: true, ethnicity: true },
    })) as TalentType;
    return talent;
  } catch (e) {
    console.error(`error find talent by id: ${e}`);
    return talent;
  }
};
