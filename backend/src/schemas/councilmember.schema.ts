import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class CouncilMember extends Document {
  @Prop({ required: true })
  firstName: string;
  @Prop({ required: true })
  familyName: string;
  @Prop({ required: true, unique: true })
  email: string;
}

export const CouncilMemberSchema = SchemaFactory.createForClass(CouncilMember);