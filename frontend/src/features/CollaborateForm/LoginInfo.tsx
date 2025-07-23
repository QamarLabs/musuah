import { VStack, Text } from "@chakra-ui/react";
import { MWEmailInput } from "../../common/Inputs";
import { MWPasswordFields } from "../../common/PasswordFields";



export function LoginInfo() {

    return (
        <VStack w="full">
            <Text className='mw-text' fontSize="1.2rem" mb={3}>Login Info</Text>
            <VStack w={{ base: 'full', md: '2/3', lg: '1/2' }}>
                <MWEmailInput 
                    label="Email"
                    name="email"
                    placeholder="Your Email"
                    disabled={false}
                />
                <MWPasswordFields />
            </VStack>
        </VStack>
    );
}