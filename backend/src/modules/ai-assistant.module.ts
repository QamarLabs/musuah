import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AiAssistantService } from 'src/ai-assistant/ai-assistant.service';
import { AiAssistantMessage, AiAssistantMessageSchema } from 'src/schemas/aiassistantmessage.schema';
import { AiAssistantSession, AiAssistantSessionSchema } from 'src/schemas/aiassistantsession.schema';

@Module({
imports: [
    MongooseModule.forFeature([
      { name: AiAssistantMessage.name, schema: AiAssistantMessageSchema },
      { name: AiAssistantSession.name, schema: AiAssistantSessionSchema }
    ]),
    CacheModule.register(),
  
  ],
  providers: [AiAssistantService],
  exports: [AiAssistantService],
})
export class AiAssistantModule {}