import moment from "moment";

export const calculateAge = (birthDate: Date) => {
  const birthMoment = moment(birthDate);
  const age = moment().diff(birthMoment, "years");
  return age;
};

export const mapAgeToAgeRange = (age: number) => {
  return `${age - 3}-${age + 3}`;
};
