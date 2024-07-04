import * as handlebars from "handlebars";

import config from "@/config/config";
import talentRegistrationEmailTemplate from "@/templates/talentRegistrationEmailTemplate";

import { TalentFormAllDataWithFileNameType } from "@/types/Form";
import { MALE } from "@/constants";
import { mapNumberToState } from "@/utils/talent";

export const compileRegisterNotificationTemplate = (
  data: TalentFormAllDataWithFileNameType,
) => {
  const template = handlebars.compile(talentRegistrationEmailTemplate);
  const htmlBody = template({
    //TODO:Change the url
    imageUrl: `${config.uploadPrefix}/test/${data.imageFileName}`,
    first_name: data.first_name,
    last_name: data.last_name,
    birth_date: data.birth_date,
    gender: data.gender === MALE ? "Male" : "Female",
    address1: data.address1,
    suburb: data.suburb,
    state: mapNumberToState(Number(data.state)),
    postcode: data.postcode,
    phone_mobile: data.phone_mobile,
    occupation: data.occupation,
  });
  return htmlBody;
};
