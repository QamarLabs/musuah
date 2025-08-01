import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  firstName: string;
  @Prop({ required: true })
  familyName: string;
  @Prop({ required: true, unique: true })
  email: string;
  @Prop({ required: true })
  password: string;
  @Prop({ required: true })
  profilePicture: string;
  @Prop({ required: true })
  countryOfOrigin: string;
  @Prop({ required: false })
  nationalId: string | undefined;
  @Prop({ required: false })
  nationalIdCountry: string | undefined;
  @Prop({ required: false })
  nationalIdPicture: string | undefined;
  @Prop({ required: true })
  fieldOfFocus: string[];

  @Prop({ required: false, default: undefined })
  facebook: string | undefined;
  @Prop({ required: false, default: undefined })
  linkedin: string | undefined;
  @Prop({ required: false, default: undefined })
  twitterOrX: string | undefined;
  @Prop({ required: false, default: undefined })
  tiktok: string | undefined;
  
  @Prop({ required: true, default: "no" })
  wasInGovernmentAgency: string;
  @Prop({ required: true, default: false })
  infoIsCorrect: boolean;
  @Prop({ required: true })
  whyContribute: string;

  @Prop({ required: true })
  agreeToTerms: boolean;

  @Prop({ required: false, default: false })
  emailVerified: boolean;

  @Prop({ default: undefined })
  religion: string | undefined;
  @Prop({ default: undefined })
  madhab: string | undefined;
  @Prop({ default: undefined })
  funFactAboutYou: string | undefined;
  @Prop({ default: [] })
  education: {
    type: string;
    yearsAttended: string;  
    institutionName: string;
    areaOfStudy: string;
  }[];


  @Prop({ default: undefined })
  mfaSecret: string | undefined;
  @Prop({ default: false })
  isMfaEnabled: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);