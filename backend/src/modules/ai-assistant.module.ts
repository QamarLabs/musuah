import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AiAssistentService } from 'src/ai-assistent/ai-assistent.service';
import { AiAssistentMessage, AiAssistentMessageSchema } from 'src/schemas/aiassistentmessage.schema';

@Module({
imports: [
    MongooseModule.forFeature([{ name: AiAssistentMessage.name, schema: AiAssistentMessageSchema }]),
  ],
  providers: [AiAssistentService],
  exports: [AiAssistentService],
})
export class AiAssistantModule {}