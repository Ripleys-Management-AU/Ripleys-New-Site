import * as handlebars from "handlebars";

import config from "@/config/config";
import { MALE } from "@/constants";
import talentRegistrationEmailAdminTemplate from "@/templates/talentRegistrationEmailAdminTemplate";
import { talentRegistrationEmailTalentTemplate } from "@/templates/talentRegistrationEmailTalentTemplate";
import { mapNumberToState } from "@/utils/talent";

import { TalentFormAllDataType } from "@/types/Form";
import { talentRequestEmailClientTemplate } from "@/templates/talentRequestEmailClientTemplate";

export const compileRegisterAdminNotificationTemplate = (
  data: TalentFormAllDataType,
  isActor: boolean,
) => {
  const template = handlebars.compile(talentRegistrationEmailAdminTemplate);
  const htmlBody = template({
    //TODO:Change the url
    imageUrl: `${config.uploadPrefix}/test/${data.headShotImageFileName}`,
    first_name: data.first_name,
    last_name: data.last_name,
    birth_date: data.birth_date,
    gender: Number(data.gender) === MALE ? "Male" : "Female",
    address1:
      data.address1 === "" || !data.address1 ? "No Data" : data.address1,
    email: data.email,
    pronoun: data.pronoun,
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
    actor_message: isActor ? "This talent has registered as an actor" : "",
  });
  return htmlBody;
};

export const compileRegisterTalentNotificationTemplate = (isActor: boolean) => {
  const template = handlebars.compile(talentRegistrationEmailTalentTemplate);
  const htmlBody = template({
    actor_message: isActor
      ? "We will contact you to discuss the fee arrangements and the next steps."
      : "",
  });
  return htmlBody;
};

export const compileRequestEmailClientTemplate = () => {
  const template = handlebars.compile(talentRequestEmailClientTemplate);
  const htmlBody = template({});
  return htmlBody;
};
