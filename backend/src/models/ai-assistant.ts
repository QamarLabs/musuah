
export interface AiAssistantMessage {
    previousMessage: string | undefined;
    message: string;
    userCountryOfOrigin: string;
}