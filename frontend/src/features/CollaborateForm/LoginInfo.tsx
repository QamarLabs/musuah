import { VStack, Text } from "@chakra-ui/react";
import { MWEmailInput } from "../../common/Inputs";
import { MWPasswordFields } from "../../common/PasswordFields";
import { useTranslation } from "react-i18next";

export function LoginInfo() {
    const { t } = useTranslation("form");
    return (
        <VStack w="full">
            <Text className='mw-text' fontSize="1.2rem" mb={3}>{t("sectionSubtitles.loginInfo")}</Text>
            <VStack w={{ base: 'full', md: '2/3', lg: '1/2' }}>
                <MWEmailInput 
                    label={t("inputLabels.email")}
                    name="email"
                    placeholder={t("inputPlaceholders.email")}
                    disabled={false}
                />
                <MWPasswordFields />
            </VStack>
        </VStack>
    );
}