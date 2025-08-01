import { observer } from "mobx-react-lite";
import { useStore } from "../store";
import { VStack } from "@chakra-ui/react";


const AIAssistant = observer(() => {
    const { aiAssistantStore } = useStore();
    const { sendMessage } = aiAssistantStore;


    return (
        <VStack>
            <iframe
                id="ai-assistant"
                src="https://alialhaddad-muslimwikichat.hf.space"
                frameBorder="0"
                width="1200"
                height="900"
            ></iframe>

        </VStack>
    );
});

export default AIAssistant;