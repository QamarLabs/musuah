import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true, // Adds createdAt and updatedAt fields automatically
})
export class SavedBook extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: false })
  displayName: string;

  @Prop({ required: false })
  publicationYear: number;

  @Prop({ required: false })
  publicationDate: Date;

  @Prop({ required: false })
  primaryTopic: string |  undefined;

  @Prop({ required: true })
  savedByUserId: string;

  @Prop({ required: true })
  timestamp: Date; 
}

export const SavedBookSchema = SchemaFactory.createForClass(SavedBook);