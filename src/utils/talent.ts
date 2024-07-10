import moment from "moment";

import { ACT, NSW, NT, QLD, SA, TAS, VIC, WA } from "@/constants";
import { ExpAttributesDataType, TalentType } from "@/model/types";

import { SelectionValueType } from "@/types/Form";

export const STATES_MAP: Record<number, string> = {
  [VIC]: "VIC",
  [NSW]: "NSW",
  [TAS]: "TAS",
  [ACT]: "ACT",
  [NT]: "NT",
  [QLD]: "QLD",
  [WA]: "WA",
  [SA]: "SA",
};

export const calculateAge = (birthDate: Date) => {
  const birthMoment = moment(birthDate);
  const age = moment().diff(birthMoment, "years");
  return age;
};

export const mapAgeToAgeRange = (age: number) => {
  return `${age - 3}-${age + 3}`;
};

export const generateSelectionValues = (
  min: number,
  upper: number,
  increasedBy?: number,
): SelectionValueType[] => {
  if (min > upper) throw new Error("invalid arguments");
  const values: SelectionValueType[] = [];
  if (!increasedBy) {
    for (let i = min; i <= upper; i++) {
      values.push({ value: i, label: i.toString() });
    }
  } else {
    for (let i = min; i <= upper; i += increasedBy) {
      values.push({ value: i, label: i.toString() });
    }
  }
  return values;
};

export const mapExpDataToOptions = (data: ExpAttributesDataType[]) => {
  const mappedData = data.map((item) => {
    return {
      value: item.id,
      label: item.name,
    };
  });
  return mappedData;
};

export const mapNumberToState = (value: number): string | undefined => {
  return STATES_MAP[value];
};

export const mapTalentsToOptions = (
  talents: TalentType[],
): SelectionValueType[] => {
  return talents.map((talent) => {
    const fullName = `${talent.first_name} ${talent.last_name || ""}`.trim();
    const value = `${talent.id}-${fullName}-${talent.email}`;
    return {
      label: fullName,
      value: value,
    };
  });
};
