import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { WikiBookAuthor, WikiBookLocation } from 'src/models/book';

@Schema({
  timestamps: true, // Adds createdAt and updatedAt fields automatically
})
export class Book extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: false })
  displayName: string;

  @Prop({ required: false })
  publicationYear: number;

  @Prop({ required: false })
  publicationDate: Date;

  @Prop({ required: false })
  authors: WikiBookAuthor[];

  @Prop({ required: false })
  sourceUrl: string |  undefined;

  @Prop({ required: false })
  concepts: string[];

  @Prop({ required: false })
  primaryTopic: string |  undefined;

  @Prop({ required: false })
  openStudy: boolean |  undefined;

  @Prop({ required: false })
  locations: WikiBookLocation[];

  @Prop({ required: false })
  description: string |  undefined;

  @Prop({ required: true })
  timestamp: Date; 
}

export const BookSchema = SchemaFactory.createForClass(Book);