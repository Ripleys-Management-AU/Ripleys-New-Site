export interface WebBannerImage {
  id: number;
  image: string;
  desc: string;
}

export interface SectionCardData {
  id: number;
  image: string;
  desc: string;
  link: string;
}

export interface CompanyLogos {
  id: number;
  image: string;
  desc: string;
}

export interface TalentProfileDataType {
  display: string;
  dbAttribute: string;
  dbSubAttribute?: string;
}
