import { TALENT_ACTIVE } from "@/constants";
import prisma from "@/model/client";
import {
  ExpAttributesDataType,
  AllExpAttributesType,
  TalentType,
} from "@/model/types";

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

export const queryTalentFormExp = async () => {
  try {
    const results = await Promise.all([
      prisma.accent.findMany(),
      prisma.language.findMany(),
      prisma.license.findMany(),
      prisma.union.findMany(),
    ]);
    const accents: ExpAttributesDataType[] = results[0];
    const languages: ExpAttributesDataType[] = results[1];
    const licenses: ExpAttributesDataType[] = results[2];
    const unions: ExpAttributesDataType[] = results[3];
    return {
      accents: accents ? accents : [],
      languages: languages ? languages : [],
      licenses: licenses ? licenses : [],
      unions: unions ? unions : [],
    } as AllExpAttributesType;
  } catch (e) {
    console.error(`error query talent form experience attributes: ${e}`);
    return {
      accents: [],
      languages: [],
      licenses: [],
      unions: [],
    } as AllExpAttributesType;
  }
};
