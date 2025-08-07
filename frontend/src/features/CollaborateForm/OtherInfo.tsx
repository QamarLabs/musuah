import { VStack, Text } from "@chakra-ui/react";
import { MWTextInput } from "../../common/Inputs";
import { Divider } from "@chakra-ui/layout";
import { MWCheckbox, MWRadioBox } from "../../common/Checkboxes";
import { PART_OF_GOVERNMENT_AGENCY_OPTIONS } from "../../common/constants/form";
import { useField } from "formik";
import { MWTextArea } from "../../common/TextArea";
import { useTranslation } from "react-i18next";


export function OtherInfo() {
    const { t } = useTranslation("form")
    const [haveBeenPartOfGovField] = useField('wasInGovernmentAgency');

    return (
        <VStack w="full">
            <Text className='mw-text' fontSize="1.2rem" mb={3}>{t("sectionTitles.otherInfo")}</Text>
            <VStack>
                <MWTextInput
                    label="Facebook"
                    name="facebook"
                    placeholder="Facebook"
                    disabled={false}
                />
                <MWTextInput
                    label="Linkedin"
                    name="linkedin"
                    placeholder="Linkedin"
                    disabled={false}
                />
                <MWTextInput
                    label="Twitter or X"
                    name="twitterOrX"
                    placeholder="Twitter or X"
                    disabled={false}
                />
                <MWTextInput
                    label="Tiktok"
                    name="tiktok"
                    placeholder="Tiktok"
                    disabled={false}
                />

                <Divider mb={2} />

                <MWRadioBox 
                    value={haveBeenPartOfGovField.value}
                    name='wasInGovernmentAgency'
                    label={t("inputLabels.wasInGovernmentAgency")}
                    disabled={false}
                    options={PART_OF_GOVERNMENT_AGENCY_OPTIONS}
                />

                <MWCheckbox 
                    label={t("inputLabels.infoIsCorrect")}
                    disabled={false}
                    name='infoIsCorrect'
                />

                <MWTextArea 
                
                    name="whyContribute"
                    label={t("inputLabels.whyContribute")}
                    placeholder={t("inputPlaceholders.whyContribute")}
                    disabled={false}
                />

                <MWCheckbox 
                    label={t("inputLabels.agreeToTerms")}
                    termsLink={`${import.meta.env.BASE_URL}/privacy-policy`}
                    disabled={false}
                    name='agreeToTerms'
                />

            </VStack>
        </VStack>
    );
}