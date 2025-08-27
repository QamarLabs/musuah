import {
    Button,
    CloseButton,
    Dialog,
    Loader,
    Portal,
    Span,
    Text,
    useDisclosure,
    VStack,
} from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../store";
import { useTranslation } from "react-i18next";
import { CapturePaymentInfo } from "../models/payment";
import StripeElementsProvider from "../stripe-provider";
import { DonationForm } from "../features/Donation/DonationForm";
import { PaymentElement } from "@stripe/react-stripe-js";
import { LuCheck } from "react-icons/lu";
import { ErrorAlert } from "./Alerts";

type DonationDialogProps = {
    onClick?: () => void;
}

export default observer(({ onClick }: React.PropsWithChildren<DonationDialogProps>) => {
    const {
        t,
        // i18n 
    } = useTranslation(["common", "errors"]);
    const { authStore, commonStore } = useStore();
    const {
        capturePayment,
        initializeDonation,
        initializing,
        ipAddress,
        paymentCustomerId,
        setPaymentCustomerId,
        setPaymentCustomerSessionSecret
    } = commonStore;
    const { userSession } = authStore;
    const [setupPaymentId, setSetupPaymentId] = useState<string | undefined>(undefined);
    const [captured, setCaptured] = useState<boolean>(false);
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
    const [capturePaymentConfig, setCapturePaymentConfig] = useState<CapturePaymentInfo | undefined>(undefined)
    const { open, setOpen } = useDisclosure();


    async function capturingPayment() {
        try {
            await capturePayment(capturePaymentConfig!);
            setCaptured(true);
        } catch(err) {
            console.log("capture payment error:", err);
            setErrorMessage(t("errorMessages.captureDonation", { ns: "errors" }))
        }
    }

    async function initDonation() {
        const responseJson = await initializeDonation({
            ipAddress: ipAddress ?? '',
            email: userSession?.email ?? '',
            customerId: paymentCustomerId ?? ''
        });

        // debugger;
        setSetupPaymentId(responseJson.clientSecret);
        setPaymentCustomerId(responseJson.customerId);
        setPaymentCustomerSessionSecret(responseJson.customerSessionClientSecret);
    }

    function resetModalState() {
        setSetupPaymentId(undefined);
        setCurrentStep(0);
        setCaptured(false);
    }

    useEffect(() => {
        if(open) {
            if (currentStep === 1 && setupPaymentId && capturePaymentConfig) {
                capturingPayment();
            }
            else if (currentStep === 0 && !setupPaymentId && !captured)
                initDonation();
        }
        
    }, [currentStep, open]);

    return (
        <Dialog.Root lazyMount open={open} onOpenChange={(e) => {
            resetModalState();
            setOpen(e.open);
        }}>
            <Dialog.Trigger asChild>
                <Button as='a' variant="ghost" bg='transparent' p={0} fontSize="85%" onClick={() => {
                    if(onClick)
                        onClick();
                }} >
                    {t("donate", { ns: 'common' })}
                </Button>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton />
                        </Dialog.CloseTrigger>
                        <Dialog.Header>
                            <Dialog.Title>
                                <Span className='mw-text mw-normal'>{t("donateModal.title", { ns: 'common' })}</Span>
                            </Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <VStack px={0}>
                                {errorMessage && <ErrorAlert title={t("errorTitle", { ns: 'errors' })} description={errorMessage} />}
                                {currentStep === 1
                                    ? (
                                        <VStack w='100' className='mw-text'>
                                            {captured ? (
                                                <>
                                                    <Text fontSize="125%">{t("donateModal.successLine1", { ns: 'common' })}</Text>
                                                    <Text>{t("donateModal.successLine2", { ns: 'common' })}</Text>
                                                    <LuCheck color="green.400" />
                                                </>
                                            ) : (<Loader color='black' />)}
                                        </VStack>
                                    )
                                    : (
                                        <>
                                            {setupPaymentId && !initializing ? (
                                                <StripeElementsProvider total={0} clientSecret={setupPaymentId}>
                                                    <DonationForm
                                                        setErrorMessage={setErrorMessage}
                                                        setupPaymentId={setupPaymentId}
                                                        setCurrentStep={setCurrentStep}
                                                        setCapturePaymentConfig={setCapturePaymentConfig}
                                                    >
                                                        <PaymentElement options={{ layout: { type: 'tabs' } }} />
                                                    </DonationForm>
                                                </StripeElementsProvider>
                                            ) : (<Loader color="gray.900" h="2rem" w="2rem" />)}
                                        </>
                                    )}
                            </VStack>
                        </Dialog.Body>
                        <Dialog.Footer />
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
});