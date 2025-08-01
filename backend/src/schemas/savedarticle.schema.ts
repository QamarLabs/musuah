import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true, // Adds createdAt and updatedAt fields automatically
})
export class SavedArticle extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  savedByUserId: string;

  @Prop({ required: true })
  timestamp: Date; 
}

export const SavedArticleSchema = SchemaFactory.createForClass(SavedArticle);