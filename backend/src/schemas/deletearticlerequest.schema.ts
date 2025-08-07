import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true, // Adds createdAt and updatedAt fields automatically
})
export class DeleteArticleRequest extends Document {

    @Prop({ required: true })
    pageid: number;

    @Prop({ required: true })
    submitByUserId: string;
    
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    reasonToDelete: string;

    @Prop({ required: false })
    reasonToApproveDelete: string;

    @Prop({ required: false })
    reasonToDenyDelete: string;

    
    @Prop({ required: false })
    judgedByUserId: string;

    @Prop({ required: false })
    judgedByUserName: string;

    @Prop({ required: true })
    timestamp: Date; // Changed from 'any' to Date type for better typing
}

export const DeleteArticleRequestSchema = SchemaFactory.createForClass(DeleteArticleRequest);