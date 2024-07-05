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
    ethnicity_id: data.ethnicity_id,
    eye_color: data.eye_colour,
    hair_colour: data.hair_colour,
    inside_leg: data.inside_leg,
    height: data.height,
    smoker: data.smoker,
    waist: data.waist === "" || !data.waist ? "No Data" : data.waist,
    bust: data.bust === "" || !data.bust ? "No Data" : data.bust,
    chest: data.chest === "" || !data.chest ? "No Data" : data.chest,
    shirt: data.shirt === "" || !data.shirt ? "No Data" : data.shirt,
    dress_size:
      data.dress_size === "" || !data.dress_size ? "No Data" : data.dress_size,
    hips: data.hips === "" || !data.hips ? "No Data" : data.hips,
    shoe: data.shoe === "" || !data.shoe ? "No Data" : data.shoe,
    suit: data.suit === "" || !data.suit ? "No Data" : data.suit,
    suit_length:
      data.suit_length === "" || !data.suit_length
        ? "No Data"
        : data.suit_length,
  });
  return htmlBody;
};
