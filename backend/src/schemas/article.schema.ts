import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true, // Adds createdAt and updatedAt fields automatically
})
export class Article extends Document {
  @Prop({ required: true, index: "text" })
  title: string;

  @Prop({ required: true, unique: true, index: true })
  pageid: number;

  @Prop({ required: true })
  revid: number;

  @Prop({ required: true })
  url: string;

  @Prop({ required: true })
  text: string;

  @Prop()
  summary: string;

  @Prop({ required: true })
  word_count: number;

  @Prop({ type: Object, required: false })
  attributes: {[key: string]: any};

  @Prop({ type: [Object], required: false })
  collaborators: {userId: string, userName: string }[];

  @Prop({ required: true })
  timestamp: Date; // Changed from 'any' to Date type for better typing
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
// ArticleSchema.index({ title: 'text' });

// export { ArticleSchema, Article };