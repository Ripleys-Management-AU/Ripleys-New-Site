import moment from "moment";

import { SelectionValueType } from "@/types/Form";
import { ExpAttributesDataType } from "@/model/types";

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

export const mapExpDataToOptions = (data: ExpAttributesDataType) => {};
