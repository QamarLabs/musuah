import { Button, HStack, VStack } from "@chakra-ui/react";
import { Form, Formik, FormikHelpers } from "formik";
import { observer } from "mobx-react-lite";
import { MWTextArea } from "../../common/TextArea";
import { MWDecimalInput } from "../../common/Inputs";
import { DEFAULT_DONATE_FORM } from "../../common/constants/form";
import * as Yup from 'yup';
import { useStore } from "../../store";
import { CapturePaymentInfo } from "../../models/payment";
import React, { Dispatch, SetStateAction } from "react";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import { useTranslation } from "react-i18next";

type DonationFormProps = {
    setupPaymentId: string | undefined;
    setErrorMessage: Dispatch<SetStateAction<string | undefined>>;
    setCapturePaymentConfig: Dispatch<SetStateAction<CapturePaymentInfo | undefined>>;
    setCurrentStep: Dispatch<SetStateAction<number>>;
}

export const DonationForm = observer(function ({
    setupPaymentId,
    setErrorMessage,
    setCapturePaymentConfig,
    setCurrentStep,
    children
}: React.PropsWithChildren<DonationFormProps>) {
    const { t } = useTranslation(["form", "errors", "common"])
    const { authStore, commonStore } = useStore();
    const {
        donating,
        donatePayment,
        ipAddress,
        paymentCustomerId,
        paymentCustomerSessionSecret
    } = commonStore;
    const { userSession } = authStore;
    const stripe = useStripe();
    const elements = useElements();

    
    async function donate(values: { amount: any, paymentNote: string }) {
        try {            
            const confirmSetupResponse = await stripe?.confirmSetup({
                elements: elements!,
                redirect: 'if_required'
            })

            const sessionResponse = await donatePayment({
                setupPaymentId: setupPaymentId?? "",
                paymentMethodId: confirmSetupResponse?.setupIntent?.payment_method ?? undefined,
                ipAddress: ipAddress ?? "No ip address provided.",
                amount: parseFloat(values.amount) * 100,
                paymentMessage: values.paymentNote,
                email: userSession?.email ?? "",
                customerId: paymentCustomerId,
                customerSessionSecret: paymentCustomerSessionSecret
            })

            const paymentIntentRetrieved = await stripe?.retrievePaymentIntent(sessionResponse.clientSecret);

            setCapturePaymentConfig({
                paymentIntentId: paymentIntentRetrieved?.paymentIntent?.id ?? '',
                paymentIntentClientSecret: sessionResponse.clientSecret,
                customerSessionId: paymentCustomerSessionSecret,
                customerId: sessionResponse.customerId,
                customerInfo: {}
            });

            setCurrentStep(1);

        } catch (error) {
            setCurrentStep(0);
        }
    }

    const validationSchema = Yup.object().shape({
        amount: Yup.number().min(0.50).required(t("invalidDonationAmount", { ns: "errors" })),
        paymentNote: Yup.string().notRequired(),
    });

    const handleOnSubmit = async (values: { amount: number, paymentNote: string }, formikHelpers: FormikHelpers<{ amount: number, paymentNote: string, donate: string }>) => {
        try {
            await donate(values);
        } catch (err) {
            console.log("Error donating, please contact support!")
            setErrorMessage(t("errorMessages.submittingDonation", { ns: "errors" }));
        } finally {
            formikHelpers.setSubmitting(false);
        }
    };
    return (
        <VStack width='full'>
            <Formik<{ amount: number, paymentNote: string, donate: string }>
                initialValues={DEFAULT_DONATE_FORM}
                validationSchema={validationSchema}
                onSubmit={handleOnSubmit}
                validateOnBlur={false}
            >
                {({
                    isSubmitting,
                    errors,
                    handleSubmit
                }) => (
                    <Form className='mw-donation-form' onSubmit={handleSubmit}>
                        <VStack w={{ base: 'full' }}>
                            <MWDecimalInput
                                label={t("inputLabels.amountToDonate", { ns: "form" })}
                                name="amount"
                                placeholder={t("inputPlaceholders.amountToDonate", { ns: "form" })}
                                disabled={false}
                            />
                            <MWTextArea
                                label={t("inputLabels.paymentNote", { ns: "form" })}
                                name="paymentNote"
                                placeholder={t("inputPlaceholders.paymentNote", { ns: "form" })}
                                disabled={false}
                                maxLength={100}
                            />
                        </VStack>
                        {children}
                        <HStack>
                            <Button
                                type='submit'
                                disabled={Object.values(errors).some(v => !!v) || isSubmitting || donating}
                                rounded="full"
                                px={{ base: 2, md: 5 }}
                                py={2}
                                fontWeight="bold"
                                color="white"
                                _disabled={{
                                    opacity: 0.4
                                }}
                                bg="green.800"
                                loading={donating}
                                textDecoration="underline"
                                mx='auto'
                                className='mw-text'
                            >
                                {t("buttons.submit", { ns: "common" })}
                            </Button>
                        </HStack>
                    </Form>
                )}
            </Formik>
        </VStack>
    );
});