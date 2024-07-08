export interface SelectionValueType {
  value: string | number;
  label: string;
}

export interface TalentExpFormAttrType {
  accentOptions: SelectionValueType[];
  languageOptions: SelectionValueType[];
  licenseOptions: SelectionValueType[];
  unionOptions: SelectionValueType[];
}

export interface TalentFormAllDataType {
  first_name: string;
  last_name: string;
  category: string;
  gender: string;
  pronoun?: string;
  email: string;
  phone: string;
  address1: string;
  address2?: string;
  suburb: string;
  state: string;
  postcode: string;
  phone_home: string;
  phone_mobile: string;
  phone_work: string;
  occupation: string;
  registration: string;
  birth_date: string;
  ethnicity_id: string;
  eye_colour: string;
  hair_colour: string;
  height: string;
  waist: string;
  bust: string;
  hips: string;
  shoe: string;
  dress_size: string;
  chest: string;
  suit: string;
  suit_length: string;
  shirt: string;
  collar: string;
  inside_leg: string;
  smoker: string;
  distinctive_marks: string;
  experience: string;
  showreel: string;
  skills_interests: string;
  artist_type: string;
  languages: number[];
  accents: number[];
  licenses: number[];
  unions: number[];
  image_title: string;
  doc_title: string;
  imageFileName: string;
  docFileName: string;
  image?: any;
  doc?: any;
}

// export interface TalentFormAllDataWithFileNameType
//   extends TalentFormAllDataType {
//   imageFileName: string;
//   docFileName: string;
// }
