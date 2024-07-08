import { TALENT_ACTIVE } from "@/constants";
import prisma from "@/model/client";
import {
  AllExpAttributesType,
  ExpAttributesDataType,
  TalentConfirmationPayload,
  TalentType,
} from "@/model/types";

import { TalentFormAllDataType } from "@/types/Form";

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

export const addTalent = async (data: TalentFormAllDataType) => {
  try {
    const newTalentData = {
      status: 1,
      first_name: data.first_name,
      last_name: data.last_name,
      gender: Number(data.gender),
      birth_date: new Date(data.birth_date),
      ethnicity_id: Number(data.ethnicity_id),
      category: Number(data.category),
      address1: data.address1,
      address2: data.address2 === "" ? null : data.address2,
      suburb: data.suburb,
      state: Number(data.state),
      postcode: data.postcode,
      phone_home: data.phone_home === "" ? null : data.phone_home,
      phone_work: data.phone_work === "" ? null : data.phone_work,
      phone_mobile: data.phone_mobile,
      email: data.email,
      occupation: data.occupation,
      eye_colour: data.eye_colour,
      hair_colour: data.hair_colour,
      height: Number(data.height),
      waist: data.waist === "" ? null : Number(data.waist),
      dress_size: data.dress_size === "" ? null : data.dress_size,
      bust: data.bust === "" ? null : Number(data.bust),
      hips: data.hips === "" ? null : Number(data.hips),
      chest: data.chest === "" ? null : Number(data.chest),
      shoe: data.shoe === "" ? null : data.shoe,
      suit: data.suit === "" ? null : data.suit,
      suit_length: data.suit_length === "" ? null : data.suit_length,
      shirt: data.shirt === "" ? null : data.shirt,
      inside_leg: Number(data.inside_leg),
      smoker: Boolean(data.smoker),
      distinctive_marks:
        data.distinctive_marks === "" ? null : data.distinctive_marks,
      experience: data.experience === "" ? null : data.experience,
      showreel: data.showreel === "" ? null : data.showreel,
      skills_interests:
        data.skills_interests === "" ? null : data.skills_interests,
      artist_type: data.artist_type,
      created_at: new Date(),
      updated_at: new Date(),
      tfn: "",
    };

    const result = await prisma.$transaction(async (prisma) => {
      const addedTalent = await prisma.talent.create({
        data: newTalentData,
      });

      if (!addedTalent) return null;

      const talentId = (addedTalent as any).id;

      if (!talentId) return null;

      if (data.imageFileName !== "" && data.docFileName !== "") {
        const imageAssetCreate = {
          filename: data.imageFileName,
          created_at: new Date(),
          updated_at: new Date(),
        };
        const documentAssetCreate = {
          filename: data.docFileName,
          created_at: new Date(),
          updated_at: new Date(),
        };

        const imageAsset = await prisma.asset.create({
          data: imageAssetCreate,
        });
        const docAsset = await prisma.asset.create({
          data: documentAssetCreate,
        });

        const imageAssetId = (imageAsset as any).id;
        const docAssetId = (docAsset as any).id;

        const imageCreate = {
          talent_id: talentId,
          sequence: 0,
          id: imageAssetId,
          filename: data.imageFileName,
          title: data.image_title,
          created_at: new Date(),
          updated_at: new Date(),
        };

        const documentCreate = {
          talent_id: talentId,
          sequence: 0,
          id: docAssetId,
          filename: data.docFileName,
          title: data.doc_title,
          created_at: new Date(),
          updated_at: new Date(),
        };

        await prisma.talent_image.create({
          data: imageCreate,
        });

        await prisma.talent_document.createMany({
          data: documentCreate,
        });
      }

      if (data.accents && data.accents.length > 0) {
        const accentCreates = data.accents.map((accentId: number) => ({
          talent_id: talentId,
          accent_id: accentId,
          created_at: new Date(),
          updated_at: new Date(),
        }));

        await prisma.talent_map_accent.createMany({
          data: accentCreates,
        });
      }

      if (data.languages && data.languages.length > 0) {
        const languageCreates = data.languages.map((languageId: number) => ({
          talent_id: talentId,
          language_id: languageId,
          created_at: new Date(),
          updated_at: new Date(),
        }));

        await prisma.talent_map_language.createMany({
          data: languageCreates,
        });
      }

      if (data.licenses && data.licenses.length > 0) {
        const licenseCreates = data.licenses.map((licenseId: number) => ({
          talent_id: talentId,
          license_id: licenseId,
          created_at: new Date(),
          updated_at: new Date(),
        }));

        await prisma.talent_map_license.createMany({
          data: licenseCreates,
        });
      }

      if (data.unions && data.unions.length > 0) {
        const unionCreates = data.unions.map((unionId: number) => ({
          talent_id: talentId,
          union_id: unionId,
          created_at: new Date(),
          updated_at: new Date(),
        }));

        await prisma.talent_map_union.createMany({
          data: unionCreates,
        });
      }

      return addedTalent;
    });

    return result;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const getTalentByName = async (
  first_name: string,
  last_name: string,
) => {
  try {
    const targetTalent = await prisma.talent.findFirst({
      where: { first_name, last_name },
      select: {
        first_name: true,
        last_name: true,
        id: true,
        email: true,
      },
    });
    const talent = targetTalent as TalentConfirmationPayload;
    return talent;
  } catch (e) {
    console.log(e);
    return null;
  }
};
