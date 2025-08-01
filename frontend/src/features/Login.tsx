import { FlexItem } from "@wordpress/components";
import ResponsiveContainer, { CommonWikiPageGridBox, CommonWikiPageTextContainer } from "../common/ResponsiveContainer";
import { Form, Formik, FormikHelpers } from "formik";
import { LoginForm } from "../typings";
import { DEFAULT_LOGIN_FORM } from "../common/constants/form";
import * as Yup from 'yup';
import { VStack, Text, Button, HStack, Span } from "@chakra-ui/react";
import { MWEmailInput, MWTextInput } from "../common/Inputs";
import { MWLoginPasswordInput } from "../common/PasswordFields";
import { useStore } from "../store";
import { UserLogin } from "../models/auth";
import { router } from "../router";

function Login() {
    const { authStore, commonStore } = useStore();
    const { ipAddress } = commonStore;
    const { login } = authStore;

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string()
            .required()
            .min(8, 'Password must be at least 8 characters')
            .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
            .matches(/[0-9]/, 'Password must contain at least one number')
            .matches(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
    });

      const handleOnSubmit = async (values: UserLogin, formikHelpers: FormikHelpers<any>) => {
        try {
        
          await login({
            ...values,
            ipAddress: ipAddress!
        });
        } catch(err) {
          console.log("Error registering you, please contact support!")
        } finally {
          formikHelpers.setSubmitting(false);
        }
      };

    return (
            <CommonWikiPageTextContainer style={{ minHeight: "100vh", textAlign: 'left', minWidth: '60vw', maxWidth: '60vw' }}>
              <FlexItem>
                <h3 className='w-100 mw-text mw-subheader m-1' >
                  Collaborate
                </h3>
              </FlexItem>
              <FlexItem>

                     <ResponsiveContainer extraClasses="wikipage w-100">
                        <FlexItem className='w-100'>
                          <CommonWikiPageGridBox>
        
                            <Formik<UserLogin>
                              initialValues={DEFAULT_LOGIN_FORM}
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
                                    <VStack w="full">
                                        <Text className='mw-text' fontSize="1.2rem" mb={3}>Login Info</Text>
                                        <VStack w={{ base: 'full', md: '2/3', lg: '1/2' }}>
                                            <MWEmailInput 
                                                label="Email"
                                                name="email"
                                                placeholder="Your Email"
                                                disabled={false}
                                            />
                                            <MWLoginPasswordInput
                                                label="Password"
                                                name="password"
                                                placeholder="Your Password"
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
                                            Submit
                                            </Button>
                                        </HStack>
                                        <HStack className='mw-text mw-normal'>
                                            <Text>
                                              Would like to be a contributer? 
                                              <Span
                                                  as="a" 
                                                  onClick={() => router.navigate('/collaborate')}
                                              >
                                                  Join us
                                              </Span>
                                            </Text>
                                        </HStack>
                                    </VStack>
                                </Form>)}
                            </Formik>
                        </CommonWikiPageGridBox>
                        </FlexItem>
                    </ResponsiveContainer>
              </FlexItem>
            </CommonWikiPageTextContainer>
    );
}