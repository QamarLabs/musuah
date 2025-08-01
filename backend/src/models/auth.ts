import { Request } from 'express';
import { User } from 'src/schemas/user.schema';

export interface LoginUser {
    email: string;
    password: string;
}

export interface RegistrationUser {
  firstName: string;
  familyName: string;
  email: string;
  password: string;
  // profilePicture: string;
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

export interface UploadProfilePicture {
  profilePicture: string;
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

export interface UpdateUser {
  // profilePicture: string; - Upload profile picture handles this
  nationalId: string | undefined;
  nationalIdPicture: string | undefined;
  nationalIdCountry: string;
  countryOfOrigin: string;
  fieldOfFocus: string[];
  facebook: string | undefined;
  linkedin: string | undefined;
  twitterOrX: string | undefined;
  tiktok: string | undefined;
  infoIsCorrect: boolean;
  whyContribute: string;
  religion: string | undefined;
  madhab: string | undefined;
  funFactAboutYou: string | undefined;
  education: {
    type: string;
    yearsAttended: string;  
    institutionName: string;
    areaOfStudy: string;
  }[];
}

export interface RequestWithUser extends Request {
  user: User;
}