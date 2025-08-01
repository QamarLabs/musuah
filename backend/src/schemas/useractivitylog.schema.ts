import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true, // Adds createdAt and updatedAt fields automatically
})
export class UserActivityLog extends Document {

    @Prop({ required: true, unique: true })
    userId: string;
 
    @Prop({ required: true })
    activity: string;

    @Prop({ required: true })
    timestamp: Date; // Changed from 'any' to Date type for better typing
}

export const UserActivityLogSchema = SchemaFactory.createForClass(UserActivityLog);