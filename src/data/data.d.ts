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

export interface LogoType {
  id: number;
  image: string;
  desc: string;
}

export interface TalentProfileColsDataType {
  display: string;
  dbAttribute: string;
  dbSubAttribute?: string;
}

export interface BookingTermPayload {
  title: string;
  desc: string;
}
