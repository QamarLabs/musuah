
export type Country = 'JO' | 'US' | 'UK' | 'DE';

export type Sect = "Shia" | "Sunni" | "Non-denominational" | "Secular";
export type Madhab = 'Hanafi' | "Shafi'i" | 'Maliki' | 'Hanbali' | "Salafi" | 'Ja\'fari' | 'Ismaili' | 'Zaydi' | "Other";

export type NationalIdPatterns = {
  [key in Country]: {
    regex: RegExp;
    mask?: (value: string) => string;
    example: string;
    label: string;
  };
};

export type Option = {
  value: string;
  label: string;
  category?: string;
};

export enum YesOrNo {
    Yes = 'yes',
    No = 'no'
};

export interface LoginForm {
  email: string;
  password: string;
}

export interface RegistrationForm {
  firstName: string | undefined;
  familyName: string | undefined;
  email: string | undefined;
  password: string | undefined;
  confirmPassword: string | undefined;
  profilePicture: string | undefined;
  countryOfOrigin: string | undefined;
  nationalId: string | undefined;
  nationalIdCountry: Country | undefined;
  nationalIdPicture: string | undefined;
  fieldOfFocus: string[];
  facebook: string | undefined;
  linkedin: string | undefined;
  twitterOrX: string | undefined;
  tiktok: string | undefined;
  wasInGovernmentAgency: YesOrNo | undefined;
  infoIsCorrect: boolean | undefined;
  whyContribute: string | undefined;
  agreeToTerms: boolean | undefined;
}

export interface RegistrationUserDto {
  firstName: string;
  familyName: string;
  email: string;
  password: string;
  profilePicture: string;
  countryOfOrigin: string;
  nationalId: string | undefined;
  nationalIdCountry: string;
  nationalIdPicture: string | undefined;
  fieldOfFocus: string[];
  facebook: string | undefined;
  linkedin: string | undefined;
  twitterOrX: string | undefined;
  tiktok: string | undefined;  
  wasInGovernmentAgency: string;
  infoIsCorrect: boolean;
  whyContribute: string;
  agreeToTerms: boolean;
}

export interface SessionUser {
  firstName: string;
  familyName: string;
  email: string;
  profilePicture: string;
  countryOfOrigin: string;
  fieldOfFocus: string[];
  facebook: string | undefined;
  linkedin: string | undefined;
  twitterOrX: string | undefined;
  tiktok: string | undefined;  
  whyContribute: string;
}

export interface MuslimWikiSession {
  userInfo: {
    _id: string;
    email: string;
    firstName: string;
    profilePicture: string;
    countryOfOrigin: string;
  };
  jwt: string;
}