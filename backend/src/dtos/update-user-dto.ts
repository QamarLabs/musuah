import { UpdateUser } from "src/models/auth";

export class UpdateUserDto implements UpdateUser {
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