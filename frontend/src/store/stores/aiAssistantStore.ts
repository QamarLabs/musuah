import { makeAutoObservable, runInAction } from 'mobx';
import agent from '../../api/agent';
import { AiAssistantMessageForm } from '../../typings';
import { DEFAULT_AI_ASSISTANT_FORM, EXPIRE_TIME_AUTH_STORE } from '../../common/constants/form';
import { makePersistable } from 'mobx-persist-store';

export default class AiAssistantStore {
    constructor() {
        makeAutoObservable(this);
        makePersistable(this, 
            { 
            name: 'AiAssistantStore', 
            properties: ['aiAssistantSessionId'], 
            storage: window.localStorage,
            expireIn: EXPIRE_TIME_AUTH_STORE,
            });
    }

    error: Error | undefined = undefined;
    aiAssistantSessionId: string | undefined = undefined;
    aiAssistantMessageForm: AiAssistantMessageForm = DEFAULT_AI_ASSISTANT_FORM;
    submittingMessage: boolean = false;
    messageRegistry = new Map<string, any>();

    setError = (value: Error | undefined) => {
        this.error = value;
    };
    setAiAssistantSessionId = (sessionId: string) => {
        this.aiAssistantSessionId = sessionId;
    };
    setAiAssistantMessageForm = (values: AiAssistantMessageForm) => {
        this.aiAssistantMessageForm = values;
    };
    setSubmittingMessage = (val: boolean) => {
        this.submittingMessage = val;
    }
    setMessage = (msg: any) => {
        this.messageRegistry.set(msg.id, msg);
    }

    sendMessage = async (messageForm: AiAssistantMessageForm) => {
        this.setSubmittingMessage(true);
        try {
            const { results, sessionId } = await agent.aiAssistant.message(messageForm);
            console.log('aiMessages:', results);
            runInAction(() => {
                results.forEach((m: any) => {
                    this.setMessage(m);
                });
            })
            this.setAiAssistantSessionId(sessionId);
        }
        catch(error) {
            console.log("send message error:", error);
        }
        finally {
            this.setSubmittingMessage(false);
        }
    }
}