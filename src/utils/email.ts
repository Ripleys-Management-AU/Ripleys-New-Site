import * as handlebars from "handlebars";

import config from "@/config/config";
import { MALE } from "@/constants";
import talentRegistrationEmailTemplate from "@/templates/talentRegistrationEmailTemplate";
import { mapNumberToState } from "@/utils/talent";

import { TalentFormAllDataType } from "@/types/Form";

export const compileRegisterNotificationTemplate = (
  data: TalentFormAllDataType,
) => {
  const template = handlebars.compile(talentRegistrationEmailTemplate);
  const htmlBody = template({
    //TODO:Change the url
    imageUrl: `${config.uploadPrefix}/test/${data.imageFileName}`,
    first_name: data.first_name,
    last_name: data.last_name,
    birth_date: data.birth_date,
    gender: Number(data.gender) === MALE ? "Male" : "Female",
    address1: data.address1,
    suburb: data.suburb,
    state: mapNumberToState(Number(data.state)),
    postcode: data.postcode,
    phone_mobile: data.phone_mobile,
    occupation: data.occupation,
  });
  return htmlBody;
};
