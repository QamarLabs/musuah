import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AiAssistantMessageDto } from 'src/dtos/ai-assistant-message-dto';
import { AiAssistentMessage } from 'src/schemas/aiassistentmessage.schema';
import { InferenceClient } from "@huggingface/inference";

@Injectable()
export class AiAssistentService {
    constructor(@InjectModel(AiAssistentMessage.name) private aiAssistantMessageModel: Model<AiAssistentMessage>) {}

    async postMessage(message: AiAssistantMessageDto) {
        const existingMessage = await this.aiAssistantMessageModel.findOne({ message: message.message, previousMessage: message.previousMessage });

        await this.updateMessageInDb(existingMessage, message);

        // const client = new InferenceClient(process.env.HF_TOKEN);
    }

    async getMessageFromAi() {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/google/flan-t5-small",
            {
            method: "POST",
            headers: { "Authorization": process.env.HUGGINGFACEHUB_TOKEN },
            body: JSON.stringify({ inputs: prompt }),
            }
        );
        return await response.json();
    }
    private async updateMessageInDb(
        message: AiAssistentMessage | undefined | null,
        messageDto: AiAssistantMessageDto
    ) {
        if(message){
            await this.aiAssistantMessageModel.updateOne(
                { _id: message._id },
                { $set: { count: message.count + 1 }}
            );
        } else {
            await this.aiAssistantMessageModel.insertOne({
                ...messageDto,
                count: 1,
                timestamp: new Date()
            });
        }
    }
}
