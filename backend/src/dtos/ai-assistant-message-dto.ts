import { AiAssistantMessage } from "src/models/ai-assistant";

export class AiAssistantMessageDto implements AiAssistantMessage {
    previousMessage: string | undefined;
    message: string;
    userCountryOfOrigin: string;
}