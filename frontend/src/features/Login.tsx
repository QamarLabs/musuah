import { CommonWikiPageGridBox, CommonWikiPageTextContainer } from "../common/ResponsiveContainer";
import { Form, Formik, FormikHelpers } from "formik";
import { DEFAULT_LOGIN_FORM } from "../common/constants/form";
import * as Yup from 'yup';
import { VStack, Text, Button, HStack, Span, Box } from "@chakra-ui/react";
import { MWEmailInput } from "../common/Inputs";
import { MWLoginPasswordInput } from "../common/PasswordFields";
import { useStore } from "../store";
import { UserLogin } from "../models/auth";
import { router } from "../router";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { ErrorAlert } from "../common/Alerts";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

function Login() {
  const { t } = useTranslation(["form", "errors"]);
  const navigate = useNavigate();
  const { authStore, commonStore } = useStore();
  const { ipAddress, language } = commonStore;
  const { login } = authStore;
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [submittedEmail, setSubmittedEmail] = useState<string>("");

  const validationSchema = Yup.object().shape({
    email: Yup.string().email(t("invalidEmail", { ns: "errors" })).required(t("emailRequired", { ns: "errors" })),
    password: Yup.string()
      .required()
      .min(8, t("passwordAtLeast8Characters", { ns: "errors" }))
      .matches(/[A-Z]/, t("passwordContainAtLeastOneUppercaseLetter", { ns: "errors" }))
      .matches(/[a-z]/, t("passwordContainAtLeastOneLowercaseLetter", { ns: "errors" }))
      .matches(/[0-9]/, t("passwordContainAtLeastOneNumber", { ns: "errors" }))
      .matches(/[^A-Za-z0-9]/, t('passwordContainAtLeastOneSpecialCharacter', { ns: "errors" })),
  });

  const handleOnSubmit = async (values: UserLogin, formikHelpers: FormikHelpers<any>) => {
    formikHelpers.setSubmitting(true);
    try {
      setSubmittedEmail(values.email);
      await login({
        ...values,
        ipAddress: ipAddress!
      });
      navigate(`/${language}`);
    } catch (err) {
      console.log("Error logging you in, please contact support!");
      setErrorMessage(t("errorMessages.login", { ns: "errors" }));
      formikHelpers.setFieldValue("email", submittedEmail);
      // debugger;
    } finally {
      formikHelpers.setSubmitting(false);
    }
  };

  return (
    <CommonWikiPageTextContainer style={{ minHeight: "100vh", textAlign: 'left', minWidth: '60vw', maxWidth: '70vw' }} minH="60vh" justify='start' align='center'>
      <Box>
        <h3 className='w-100 mw-text mw-subheader m-1' >
          {t("sectionSubtitles.login", { ns: "form" })}
        </h3>
      </Box>
      <CommonWikiPageGridBox width={{ base: '100%', xl: '42rem' }} mx='auto'>

        <Formik<UserLogin>
          initialValues={DEFAULT_LOGIN_FORM}
          validationSchema={validationSchema}
          onSubmit={handleOnSubmit}
          validateOnBlur={false}
        >
          {({
            isSubmitting,
            errors,
            handleSubmit
          }) => (
            <Form className='mw-login-form' onSubmit={handleSubmit}>
              <VStack w="full" align='center'>
                {errorMessage && (
                  <ErrorAlert title={t("errorTitle", { ns: "errors" })} description={errorMessage} />
                )}
                <VStack w={{ base: 'full', md: '2/3', lg: '1/2' }}>
                  <MWEmailInput
                    label={t("inputLabels.email", { ns: "form" })}
                    name="email"
                    placeholder={t("inputPlaceholders.email", { ns: "form" })}
                    disabled={false}
                  />
                  <MWLoginPasswordInput
                    label={t("inputLabels.password", { ns: "form" })}
                    name="password"
                    placeholder={t("inputPlaceholders.password", { ns: "form" })}
                    disabled={false}
                  />
                </VStack>
                <HStack>
                  <Button
                    type='submit'
                    disabled={Object.values(errors).some(v => !!v) || isSubmitting}
                    rounded="full"
                    px={{ base: 2, md: 5 }}
                    py={2}
                    fontWeight="bold"
                    color="white"
                    _disabled={{
                      opacity: 0.4
                    }}
                    bg="green.800"
                    loading={isSubmitting}
                    textDecoration="underline"
                    className='mw-text'
                  >
                    {t("buttons.submit", { ns: "form" })}
                  </Button>
                </HStack>
                <HStack className='mw-text mw-normal'>
                  <Text>
                    {t("wouldLikeToBeContributor")}
                    <Span
                      as="a"
                      onClick={(e: any) => {
                        e.stopPropagation();
                        router.navigate('/collaborate');
                      }}
                    >
                      {t("joinUs", { ns: "form" })}
                    </Span>
                  </Text>
                </HStack>
              </VStack>
            </Form>)}
        </Formik>
      </CommonWikiPageGridBox>
    </CommonWikiPageTextContainer>
  );
}

export default observer(Login);