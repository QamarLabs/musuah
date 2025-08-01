
export type Country = 
'JO' | 'US' | 'UK' | 'DE'
  // Asian countries
  | 'JP' // Japan
  | 'KR' // South Korea
  
  // Middle Eastern countries
  | 'SA' // Saudi Arabia
  | 'AE' // UAE
  | 'OM' // Oman
  | 'BH' // Bahrain
  | 'QA' // Qatar
  | 'IQ' // Iraq
  | 'KW' // Kuwait
  | 'YE' // Yemen
  | 'IR' // Iran
  
  // North African countries
  | 'EG' // Egypt
  | 'LY' // Libya
  | 'TN' // Tunisia
  | 'MA' // Morocco
  | 'DZ' // Algeria
  
  // Other Asian countries
  | 'MY' // Malaysia
  | 'ID' // Indonesia
  | 'VN' // Vietnam
  | 'BD' // Bangladesh
  | 'PK' // Pakistan
  | 'IN' // India
  | 'SG' // Singapore
  | 'CN' // China
  | 'RU' // Russia
  
  // European countries
  | 'FR' // France
  | 'ES' // Spain
  | 'PT' // Portugal
  | 'IE' // Ireland
  | 'BA' // Bosnia
  | 'TR' // Türkiye
  | 'HU' // Hungary
  
  // African countries
  | 'NG' // Nigeria
  | 'GH' // Ghana
  | 'CM' // Cameroon
  | 'CG' // Congo
  | 'ZA' // South Africa
  | 'AO' // Angola
  | 'BF' // Burkina Faso
  | 'NE' // Niger
  | 'ML' // Mali
  
  // Latin American countries
  | 'BR' // Brazil
  | 'MX' // Mexico
  | 'PA' // Panama
  | 'PE' // Peru
  | 'UY' // Uruguay
  | 'CO' // Colombia
  | 'VE'
  | 'AU' // Australia
  | 'NZ'; // New Zealand

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
  ipAddress: string;
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

export class RegistrationUserDto {
  constructor(init: RegistrationForm) {
    this.firstName = init.firstName;
    this.familyName = init.familyName;
    this.email = init.email;
    this.password = init.password;
    this.countryOfOrigin = init.countryOfOrigin;
    this.nationald = init.nationalId;
    this.nationalIdCountry = init.nationalIdCountry;
    this.nationalIdPicture = init.nationalIdPicture;
    this.fieldOfFocus = init.fieldOfFocus;
    this.facebook = init.facebook;
    this.linkedin = init.linkedin;
    this.twitterOrX = init.twitterOrX;
    this.tiktok = init.tiktok;
    this.wasInGovernmentAgency = init.wasInGovernmentAgency;
    this.infoIsCorrect = init.infoIsCorrect;
    this.whyContribute = init.whyContribute;
    this.agreeToTerms = init.agreeToTerms;
  }
  firstName: string;
  familyName: string;
  email: string;
  password: string;
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
  _id: string;
  firstName: string;
  familyName: string;
  email: string;
  profilePicture: string;
  countryOfOrigin: string;
  nationalId: string | undefined;
  nationalIdPicture: string | undefined;
  nationalIdCountry: string;
  fieldOfFocus: string[];
  facebook: string | undefined;
  linkedin: string | undefined;
  twitterOrX: string | undefined;
  tiktok: string | undefined;  
  whyContribute: string;
  emailVerified: boolean;
}

export interface MuslimWikiSession {
  userInfo: SessionUser;
  jwt: string;
}


export interface AiAssistantMessageForm {
    previousMessage: string | undefined;
    message: string;
    userCountryOfOrigin: string;
}