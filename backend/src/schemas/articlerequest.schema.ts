import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true, // Adds createdAt and updatedAt fields automatically
})
export class ArticleRequest extends Document {
  @Prop({ required: true })
  newTitle: string;

  @Prop({ required: false })
  oldTitle: string;
  
  @Prop({ required: true })
  pageid: number;

  @Prop({ required: true })
  revid: number;
  
  @Prop({ required: true })
  newText: string;

  @Prop({ required: false })
  oldText: string;
  
  @Prop({ required: true })
  newSummary: string;
  
  @Prop({ required: false })
  oldSummary: string;

  @Prop({ required: true })
  new_word_count: number;

  @Prop({ type: Object, required: false })
  newAttributes: {[key:string]: any}

  @Prop({ type: Object, required: false })
  oldAttributes: {[key:string]: any}

  @Prop({ required: true })
  submitByUserId: string;

  @Prop({ required: false })
  approvedByUserId: string;

  @Prop({ required: false })
  deniedByUserId: string;

  @Prop({ type: [Object], required: true })
  contributors: {userId: string, userName: string }[];

  @Prop({ required: true })
  status: string; // approved | denied | pending

  @Prop({ required: true })
  timestamp: Date; // Changed from 'any' to Date type for better typing
}

export const ArticleRequestSchema = SchemaFactory.createForClass(ArticleRequest);