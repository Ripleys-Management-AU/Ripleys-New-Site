import moment from "moment";

export const calculateAge = (birthDate: Date) => {
  const birthMoment = moment(birthDate);
  const age = moment().diff(birthMoment, "years");
  return age;
};
