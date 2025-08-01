import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true, // Adds createdAt and updatedAt fields automatically
})
export class AiAssistantSession extends Document {
  @Prop({ required: false })
  userId: string | undefined;

  @Prop({ required: true })
  ipAddress: string;

  @Prop({ required: true })
  timestamp: Date; // Changed from 'any' to Date type for better typing
}

export const AiAssistantSessionSchema = SchemaFactory.createForClass(AiAssistantSession);