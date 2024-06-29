import moment from "moment";

export const calculateAge = (birthDate: string) => {
  const birthMoment = moment(birthDate);
  const age = moment().diff(birthMoment, "years");
  return age;
};
