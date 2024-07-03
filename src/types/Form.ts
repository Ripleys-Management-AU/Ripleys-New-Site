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
