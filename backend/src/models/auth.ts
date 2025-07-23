export interface LoginUser {
    email: string;
    password: string;
}

export interface RegistrationUser {
  firstName: string;
  familyName: string;
  email: string;
  password: string;
  profilePicture: string;
  nationalId: string | undefined;
  nationalIdPicture: string | undefined;
  nationalIdCountry: string;
  countryOfOrigin: string;
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