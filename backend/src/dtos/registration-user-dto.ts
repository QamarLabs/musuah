import { RegistrationUser } from "src/models/auth";

export class RegistrationUserDto implements RegistrationUser {
  firstName: string;
  familyName: string;
  email: string;
  password: string;
  nationalId: string | undefined;
  countryOfOrigin: string;
  nationalIdPicture: string | undefined;
  nationalIdCountry: string;
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