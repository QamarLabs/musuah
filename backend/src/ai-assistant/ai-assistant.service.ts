import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AiAssistantMessageDto } from 'src/dtos/ai-assistant-message-dto';
import { AiAssistantMessage } from 'src/schemas/aiassistantmessage.schema';
import { InferenceClient } from "@huggingface/inference";
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { AiAssistantSession } from 'src/schemas/aiassistantsession.schema';

@Injectable()
export class AiAssistantService {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        @InjectModel(AiAssistantMessage.name) private aiAssistantMessageModel: Model<AiAssistantMessage>,
        @InjectModel(AiAssistantSession.name) private aiAssistantSessionModel: Model<AiAssistantSession>
    ) {}

    async postMessage(userId: string | undefined, ipAddress: string, message: AiAssistantMessageDto) {
        const existingMessage = await this.aiAssistantMessageModel.findOne({ message: message.message, previousMessage: message.previousMessage });

        const aiAssistantSession = await this.findOrUpsertAiAssistantSession(userId, ipAddress);
        await this.updateMessageInDb(aiAssistantSession._id, existingMessage, message);

        // const client = new InferenceClient(process.env.HF_TOKEN);

        return { results: [], sessionId: aiAssistantSession._id }
    }

    async getMessagesFromAi(aiAssistantSessionId: string) {
        const messages = await this.cacheManager.get(`${aiAssistantSessionId}-messages`);
        return messages ?? [];
    }

    private async getMessageFromAi() {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/google/flan-t5-small",
            {
            method: "POST",
            headers: { "Authorization": process.env.HUGGINGFACEHUB_TOKEN },
            body: JSON.stringify({ inputs: prompt }),
            }
        );

        const messages = await response.json();
        console.log("Messages:", messages);

        return messages;
    }

    private async findOrUpsertAiAssistantSession(userId: string | undefined, ipAddress: string) {
        let aiAssistantSession;
        if(userId){
            aiAssistantSession = await this.aiAssistantSessionModel.findOne({ equals: { userId: userId }})
        } else if(ipAddress)
            aiAssistantSession = await this.aiAssistantSessionModel.findOne({ equals: { ipAddress: ipAddress }})
        else {
            aiAssistantSession = await this.aiAssistantMessageModel.insertOne({
                userId, 
                ipAddress,
                timestamp: new Date()
            });
        }

        if(aiAssistantSession && (!aiAssistantSession.userId && userId)){
            await this.aiAssistantSessionModel.updateOne(
                { _id: aiAssistantSession._id },
                { $set: { userId: userId }}
            );
            return {...aiAssistantSession, userId }
        }

        return aiAssistantSession;
    }
    private async updateMessageInDb(
        sessionId: string,
        message: AiAssistantMessage | undefined | null,
        messageDto: AiAssistantMessageDto
    ) {
        if(message){
            await this.aiAssistantMessageModel.updateOne(
                { _id: message._id },
                { $set: { count: message.count + 1 }}
            );
        } else {
            await this.aiAssistantMessageModel.insertOne({
                sessionId,
                ...messageDto,
                count: 1,
                timestamp: new Date()
            });
        }
    }
}
