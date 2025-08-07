import { VStack, Stack, Text, Image, Box } from "@chakra-ui/react";
import { MWEmailInput, MWNationalIdInput, MWTextInput } from "../../common/Inputs";
import { Country } from "../../typings.d";
import { useField } from "formik";
import { CountrySelect, MultiSelect } from "../../common/Selects";
import { MWFileUpload } from "../../common/FileUpload";
import { useTranslation } from "react-i18next";


export function PersonalInfo() {
    const { t } = useTranslation("form");
    const [profilePictureField] = useField("profilePicture");
    const [nationalIdCountryField, nationalIdCountryMeta, countryHelpers] = useField<Country | undefined>('countryOfResidence');
    // const [nationalIdPictureField] = useField("nationalIdPicture");
    return (
        <VStack w='full'>
            <Text className='mw-text' fontSize="1.2rem" mb={3}>{t("sectionTitles.personalInfo")}</Text>
            <VStack w='full' alignItems='start'>
                <Box>
                      <Image
                        rounded="md"
                        h={{ base: "15rem", md: "20rem"}}
                        w={{ base: "17rem", md: "22rem"}}
                        fit="contain"
                        src={profilePictureField.value}
                    />
                </Box>
                {/** Profile Picture Upload */}
                <MWFileUpload
                    name="profilePicture"
                    label={t("inputLabels.profilePicture")}
                    maxFiles={1}
                    previewImage={false}
                    disabled={false}
                />

                <Stack w='full' flexDir={{ base: 'column', md: 'row' }}>
                    <MWTextInput 
                        label={t("inputLabels.firstName")}
                        name="firstName"
                        placeholder={t("inputPlaceholders.firstName")}
                        disabled={false}
                    />
                    <MWTextInput 
                        label={t("inputLabels.familyName")}
                        name="familyName"
                        placeholder={t("inputPlaceholders.familyName")}
                        disabled={false}
                    />
                </Stack>

                <MWEmailInput 
                    label={t("inputLabels.email")}
                    name="email"
                    placeholder={t("inputPlaceholders.email")}
                    disabled={true}
                />

                <CountrySelect 
                    label={t("inputLabels.countryOfOrigin")}
                    name="countryOfOrigin"
                />
                <MWNationalIdInput
                    label={t("inputLabels.nationalId")}
                    name="nationalId"
                    placeholder={t("inputPlaceholders.nationalId")}
                    country={nationalIdCountryField.value}
                    countryError={nationalIdCountryMeta.error}
                    handleSelectCountry={(ctry: Country) => {
                        countryHelpers.setValue(ctry);
                    }}
                    handleClear={() => {
                        countryHelpers.setValue(undefined);
                    }}
                />

                <MWFileUpload
                    name="nationalIdPicture"
                    label={t("inputLabels.nationalIdPicture")}
                    maxFiles={3}
                    previewImage={true}
                    disabled={false}
                />

                <MultiSelect
                    label={t("inputLabels.fieldOfFocus")}
                    name="fieldOfFocus"
                    maxSelections={10}
                />
            </VStack>
        </VStack>
    );
}