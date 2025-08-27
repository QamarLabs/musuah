import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true, // Adds createdAt and updatedAt fields automatically
})
export class DeleteBookRequest extends Document {

    @Prop({ required: true })
    bookId: string;

    @Prop({ required: true })
    submitByUserId: string;
 
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    reasonToDelete: string;

    @Prop({ required: false })
    status: string; //pending | approved | denied

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

export const DeleteBookRequestSchema = SchemaFactory.createForClass(DeleteBookRequest);