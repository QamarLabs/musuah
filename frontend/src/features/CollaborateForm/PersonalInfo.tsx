import { VStack, Stack, Text, Image, Box } from "@chakra-ui/react";
import { MWEmailInput, MWNationalIdInput, MWTextInput } from "../../common/Inputs";
import { Country } from "../../typings.d";
import { useField } from "formik";
import { CountrySelect, MultiSelect } from "../../common/Selects";
import { MWFileUpload } from "../../common/FileUpload";


export function PersonalInfo() {
    const [profilePictureField] = useField("profilePicture");
    const [nationalIdCountryField, nationalIdCountryMeta, countryHelpers] = useField<Country>('countryOfResidence');
    // const [nationalIdPictureField] = useField("nationalIdPicture");
    return (
        <VStack w='full'>
            <Text className='mw-text' fontSize="1.2rem" mb={3}>Personal Info</Text>
            <VStack w='full' alignItems='start'>
                <Box>
                      <Image
                        rounded="md"
                        h="20rem"
                        w="22rem"
                        fit="contain"
                        src={profilePictureField.value}
                    />
                </Box>
                {/** Profile Picture Upload */}
                <MWFileUpload
                    name="profilePicture"
                    label="Upload your profile picture"
                    maxFiles={1}
                    previewImage={false}
                    disabled={false}
                />

                <Stack w='full' flexDir={{ base: 'column', md: 'row' }}>
                    <MWTextInput 
                        label="First Name"
                        name="firstName"
                        placeholder="Your First Name, and other names"
                        disabled={false}
                    />
                    <MWTextInput 
                        label="Family Name"
                        name="familyName"
                        placeholder="Family Name or Last Name"
                        disabled={false}
                    />
                </Stack>

                <MWEmailInput 
                    label="Email"
                    name="email"
                    placeholder="Your Email"
                    disabled={true}
                />

                <CountrySelect 
                    label="Country of Origin"
                    name="countryOfOrigin"
                />
                <MWNationalIdInput
                    label="National ID"
                    name="nationalId"
                    placeholder="Your id for your country of residence"
                    country={nationalIdCountryField.value}
                    countryError={nationalIdCountryMeta.error}
                    handleSelectCountry={(ctry: Country) => {
                        countryHelpers.setValue(ctry);
                    }}
                />

                <MWFileUpload
                    name="nationalIdPicture"
                    label="Upload your national Id"
                    maxFiles={3}
                    previewImage={true}
                    disabled={false}
                />

                <MultiSelect
                    label="Field of Focus"
                    name="fieldOfFocus"
                    maxSelections={10}
                />
            </VStack>
        </VStack>
    );
}