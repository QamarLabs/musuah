import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true, // Adds createdAt and updatedAt fields automatically
})
export class AiAssistentMessage extends Document {
  @Prop({ required: true, default: "", unique: true })
  previousMessage: string | undefined;

  @Prop({ required: true, unique: true })
  message: string;

  @Prop({ required: true, default: 1 })
  count: number;

  @Prop({ required: true, default: "No country is given" })
  userCountryOfOrigin: string;

  @Prop({ required: true })
  timestamp: Date; // Changed from 'any' to Date type for better typing
}

export const AiAssistentMessageSchema = SchemaFactory.createForClass(AiAssistentMessage);