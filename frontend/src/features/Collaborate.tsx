import { useCallback, useEffect, useMemo, useState } from "react";
import { FlexItem } from "@wordpress/components";
// import { useTranslation } from "react-i18next";
import { useStore } from "../store";
import ResponsiveContainer, { CommonWikiPageTextContainer, CommonWikiPageGridBox } from "../common/ResponsiveContainer";
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { observer } from "mobx-react-lite";
import { Country, RegistrationForm, YesOrNo } from "../typings.d";
import { DEFAULT_REGISTER_FORM, DEFAULT_REGISTRATION_SUBMITTED_CONFIG } from "../common/constants/form";
import { PersonalInfo } from "./CollaborateForm/PersonalInfo";
import { OtherInfo } from "./CollaborateForm/OtherInfo";
import { Box, Button, HStack, Text, VStack } from "@chakra-ui/react";
import Review, { ReviewFieldOfFocus, ReviewOtherInfo, ReviewPersonalInfo } from "./CollaborateForm/Review";
import { LoginInfo } from "./CollaborateForm/LoginInfo";
import { LuArrowLeft, LuArrowRight, LuMail } from "react-icons/lu";
import { isDateExpired } from "../common/util/format";

function Collaborate() {
  // const { t } = useTranslation(["common", "errors"]);
  const { commonStore, authStore } = useStore();
  const {
    userSession,
    userSessionToken,
    resetRegistration,
    registrationStep,
    registrationSubmitted,
    setRegistrationSubmitted,
    setRegistrationStep,
    setRegistrationValues,
    registrationValues,
    register
  } = authStore;
  const { language } = commonStore;
  const [mounted, setMounted] = useState<boolean>(false);


  useEffect(
    () => {
      if (registrationSubmitted.submitted && isDateExpired(registrationSubmitted.expires!)) {
        setRegistrationSubmitted(DEFAULT_REGISTRATION_SUBMITTED_CONFIG);
      }
      setMounted(true);

      return () => {
        if (registrationStep === 0)
          resetRegistration();
        setMounted(false);
      }
    },
    []
  );
  // Form validation schema
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().when([], {
      is: () => registrationStep >= 1,
      then: (schema) => schema.required('First name is required'),
      otherwise: (schema) => schema.notRequired()
    }),
    // .required('First name is required'),
    familyName: Yup.string().when([], {
      is: () => registrationStep >= 1,
      then: (schema) => schema.required('Family name is required'),
      otherwise: (schema) => schema.notRequired()
    }),

    // .required('Family name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .required()
      .min(8, 'Password must be at least 8 characters')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[0-9]/, 'Password must contain at least one number')
      .matches(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
    confirmPassword: Yup.string()
      .required("Must confirm password by repeating it.")
      .oneOf([Yup.ref('password')], 'Passwords must match'),
    profilePicture: Yup.string().when([], {
      is: () => registrationStep >= 1,
      then: (schema) => schema.required('Profile picture is required'),
      otherwise: (schema) => schema.notRequired()
    }),
    // .required('Profile picture is required'),
    nationalId: Yup.string().notRequired(),
    nationalIdCountry: Yup.string().notRequired(),
    nationalIdPicture: Yup.string().notRequired(),
    countryOfOrigin: Yup.mixed<Country>().when([], {
      is: () => registrationStep >= 1,
      then: (schema) => schema.required('Country of origin is required'),
      otherwise: (schema) => schema.notRequired()
    }),
    // .required('Country of residence is required'),
    facebook: Yup.string().notRequired(),
    linkedin: Yup.string().notRequired(),
    twitterOrX: Yup.string().notRequired(),
    tiktok: Yup.string().notRequired(),
    fieldOfFocus: Yup.array().when([], {
      is: () => registrationStep >= 1,
      then: (schema) => schema.min(1, 'At least one field of focus is required').required(),
      otherwise: (schema) => schema.notRequired()
    }),
    // .min(1, 'At least one field of focus is required').required(),
    wasInGovernmentAgency: Yup.mixed<YesOrNo>().notRequired(),
    infoIsCorrect: Yup.boolean().when([], {
      is: () => registrationStep >= 2,
      then: (schema) => schema.oneOf([true], 'You must swear that your info is correct to collaborate with us.').required('You must swear that your info is correct to collaborate with us.'),
      otherwise: (schema) => schema.notRequired()
    }),
    whyContribute: Yup.string().when([], {
      is: () => registrationStep >= 2,
      then: (schema) => schema.required('You must explain why you want to contribute to us.'),
      otherwise: (schema) => schema.notRequired()
    }),
    // .required('You must explain why you want to contribute to us.'),
    agreeToTerms: Yup.boolean().when([], {
      is: () => registrationStep >= 2,
      then: (schema) => schema.oneOf([true], 'You must agree to terms of collaboration').required('You must agree to terms of collaboration'),
      otherwise: (schema) => schema.notRequired()
    })
    // .oneOf([true], 'You must agree to terms of collaboration').required()
  });

  const updateRegistrationForm = useCallback(
    (step: number, currentValues: RegistrationForm) => (e: any) => {
      debugger;
      e.stopPropagation();
      setRegistrationStep(step);
      setRegistrationValues(currentValues);
    },
    [registrationStep]
  );

  const handleOnSubmit = async (values: RegistrationForm, formikHelpers: FormikHelpers<any>) => {
    try {
      await register(values, language);
    } catch(err) {
      console.log("Error registering you, please contact support!")
    } finally {
      formikHelpers.setSubmitting(false);
    }
  };

  const showLoginInfo = useMemo(() => mounted && registrationStep === 0, [registrationStep, mounted]);
  const showBackButton = useMemo(() => mounted && registrationStep > 0, [registrationStep, mounted]);
  const showPersonalInfo = useMemo(() => mounted && registrationStep === 1, [registrationStep, mounted]);
  const showOtherInfo = useMemo(() => mounted && registrationStep === 2, [registrationStep, mounted]);
  const showReviewForm = useMemo(() => mounted && registrationStep === 3, [registrationStep, mounted]);

  return (
    <CommonWikiPageTextContainer 
      justify='start'
      style={{ minHeight: "100vh", textAlign: 'left', minWidth: '60vw', maxWidth: '60vw' }}
    >
      <VStack>
        <h3 className='w-100 mw-text mw-subheader my-1' >
          Collaborate
        </h3>
        <h5 className='w-100 mw-text mw-subheader-subtitle m-1' >
          Register to Collaborate with Us! 😊
        </h5>
      </VStack>
      <Box className='w-100'>
        {
          registrationSubmitted.submitted && registrationSubmitted.expires && !isDateExpired(registrationSubmitted.expires)
            ? (
              <VStack color="gray.900" align='center'>
                <Text className='w-100 mw-text mw-normal m-1' >
                  Please check your email at {userSession?.email ?? ''} for a verification email.
                </Text>
                <LuMail size={150} />
              </VStack>
            )
            : (
              <ResponsiveContainer extraClasses="wikipage w-100">
                <Box className='w-100'>
                  <CommonWikiPageGridBox>

                    <Formik<RegistrationForm>
                      initialValues={{
                        ...DEFAULT_REGISTER_FORM,
                        email: 'devmtnali@gmail.com',
                        password: "P@ssw0rd11",
                        confirmPassword: "P@ssw0rd11",
                        firstName: "Ali",
                        familyName: "Alhaddad",
                        // email: registrationValues.email ?? "",
                        // password: registrationValues.password ?? "",
                        // confirmPassword: registrationValues.confirmPassword ?? "",
                        // firstName: registrationValues.firstName ?? "",
                        // familyName: registrationValues.familyName ?? "",
                        profilePicture: registrationValues.profilePicture ?? '',
                        fieldOfFocus: registrationValues.fieldOfFocus ?? [],
                        countryOfOrigin: registrationValues.countryOfOrigin ?? undefined,
                      }}
                      validationSchema={validationSchema}
                      onSubmit={handleOnSubmit}
                      validateOnBlur={false}
                    >
                      {({
                        isSubmitting,
                        errors,
                        values,
                        handleSubmit
                      }) => (
                        <Form className='mw-form' onSubmit={handleSubmit}>
                          {JSON.stringify(Object.values(errors))}
                          {showLoginInfo && (
                            <LoginInfo />
                          )}
                          {showPersonalInfo && (
                            <PersonalInfo />
                          )}
                          {showOtherInfo && (
                            <OtherInfo />
                          )}
                          {showReviewForm && (
                            <Review
                              sections={[
                                {
                                  id: 'personal-info',
                                  title: 'Personal Info',
                                  jsx: <ReviewPersonalInfo />
                                },
                                {
                                  id: 'field-of-focus',
                                  title: 'Field of Focus',
                                  jsx: <ReviewFieldOfFocus />
                                },
                                {
                                  id: 'other-info',
                                  title: 'Other Info',
                                  jsx: <ReviewOtherInfo />
                                }
                              ]}
                            />
                          )}

                          <HStack
                            onClick={(e) => e.stopPropagation()}
                            justifyContent={!showBackButton ? "end" : "space-between"} alignItems="center" mt={2} w="full">
                            {showBackButton && (
                              <Button
                                onClick={() => setRegistrationStep(registrationStep <= 0 ? 0 : registrationStep - 1)}
                                rounded='full'
                                style={{ right: 0 }}
                                px={{ base: 2, md: 5 }}
                                type="button"
                                bg="green.800"
                                className='mw-text'
                              >
                                <LuArrowLeft />
                                Back
                              </Button>
                            )}

                            {showOtherInfo && (
                              <Button
                                type="button"
                                onClick={updateRegistrationForm(registrationStep + 1, values)}
                                disabled={Object.values(errors).some(v => !!v)}
                                rounded="full"
                                px={{ base: 2, md: 5 }}
                                py={2}
                                color="white"
                                bg="green.800"
                                _disabled={{
                                  opacity: 0.4
                                }}
                                className='mw-text'
                              >
                                Review
                              </Button>
                            )} 
                            {!showOtherInfo && !showReviewForm && (
                              <Button
                                type="button"
                                onClick={updateRegistrationForm(registrationStep + 1, values)}
                                disabled={Object.values(errors).some(v => !!v)}
                                rounded="full"
                                px={{ base: 2, md: 5 }}
                                py={2}
                                color="white"
                                bg="green.800"
                                _disabled={{
                                  opacity: 0.4
                                }}
                                className='mw-text'
                              >
                                Next
                                <LuArrowRight />
                              </Button>
                            )}
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
                              display={(showReviewForm ? 'initial' : 'none')}
                            >
                              Submit
                            </Button>
                          </HStack>
                        </Form>
                      )}
                    </Formik>
                  </CommonWikiPageGridBox>
                </Box>
              </ResponsiveContainer>
            )
        }
      </Box>
    </CommonWikiPageTextContainer>
  );
}

export default observer(Collaborate);