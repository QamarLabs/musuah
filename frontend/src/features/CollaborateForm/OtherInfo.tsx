import { VStack, Text } from "@chakra-ui/react";
import { MWTextInput } from "../../common/Inputs";
import { Divider } from "@chakra-ui/layout";
import { MWCheckbox, MWRadioBox } from "../../common/Checkboxes";
import { PART_OF_GOVERNMENT_AGENCY_OPTIONS } from "../../common/constants/form";
import { useField } from "formik";
import { MWTextArea } from "../../common/TextArea";


export function OtherInfo() {
    const [haveBeenPartOfGovField] = useField('wasInGovernmentAgency');

    return (
        <VStack w="full">
            <Text className='mw-text' fontSize="1.2rem" mb={3}>Other Info</Text>
            <VStack>
                <MWTextInput
                    label="Facebook"
                    name="facebook"
                    placeholder="Your Facebook"
                    disabled={false}
                />
                <MWTextInput
                    label="Linkedin"
                    name="linkedin"
                    placeholder="Your Linkedin"
                    disabled={false}
                />
                <MWTextInput
                    label="Twitter or X"
                    name="twitterOrX"
                    placeholder="Your Twitter or X"
                    disabled={false}
                />
                <MWTextInput
                    label="Tiktok"
                    name="tiktok"
                    placeholder="Your Tiktok"
                    disabled={false}
                />

                <Divider mb={2} />

                <MWRadioBox 
                    value={haveBeenPartOfGovField.value}
                    name='wasInGovernmentAgency'
                    label="Have you been part of a government agency?"
                    disabled={false}
                    options={PART_OF_GOVERNMENT_AGENCY_OPTIONS}
                />

                <MWCheckbox 
                    label="Do you swear your info is correct?"
                    disabled={false}
                    name='infoIsCorrect'
                />

                <MWTextArea 
                    name="whyContribute"
                    label="Why would you like to contribute to muslim wiki?"
                    placeholder="Why do you want to contribute to muslim wiki, we are just curious."
                    disabled={false}
                />

                <MWCheckbox 
                    label="Do you agree to the terms and conditions"
                    termsLink={`${import.meta.env.BASE_URL}/privacy-policy`}
                    disabled={false}
                    name='agreeToTerms'
                />

            </VStack>
        </VStack>
    );
}