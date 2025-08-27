import {
    Button,
    CloseButton,
    Dialog,
    HStack,
    Portal,
    Span,
    useDisclosure,
    VStack,
} from "@chakra-ui/react"
import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Form, Formik } from "formik";
import * as Yup from 'yup';
import { MWTextArea } from "./TextArea";
import { useTranslation } from "react-i18next";

type ConfirmationDialogProps = {
    confirmationTitle: string;
    triggerChildren: React.ReactNode;
    onConfirm: (values: { reasonToConfirm: string }) => Promise<void>;
    onConfirmLoading: boolean;
    confirmButtonOverrideColor?: string;
    confirmButtonOverrideText?: string;
}

export default observer(({
    confirmationTitle,
    triggerChildren,
    onConfirm,
    onConfirmLoading,
    confirmButtonOverrideColor,
    confirmButtonOverrideText
}: React.PropsWithChildren<ConfirmationDialogProps>) => {
    const { t } = useTranslation(["form"])
    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => {
        setMounted(true);

        return () => {
            setMounted(false);
        };

    }, []);


    const validationSchema = Yup.object().shape({
        reasonToConfirm: Yup.string().required(`Reason to confirm required`)
    });
    const { open, setOpen } = useDisclosure();
    console.log("mounted:", mounted);
    return (
        <Dialog.Root lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
            <Dialog.Trigger asChild>
                {triggerChildren}
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
                                <Span className='mw-text mw-normal'>{confirmationTitle} </Span>
                            </Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <VStack>
                                <Formik<{ reasonToConfirm: string }>
                                    initialValues={{
                                        reasonToConfirm: ''
                                    }}
                                    validationSchema={validationSchema}
                                    onSubmit={async (values: { reasonToConfirm: string }, helpers: any) => {
                                        await onConfirm(values);
                                        setOpen(false);
                                        helpers.setSubmitting(false)
                                    }}
                                    validateOnBlur={false}
                                >
                                    {({
                                        isSubmitting,
                                        errors,
                                        handleSubmit
                                    }) => (
                                        <Form className='mw-donation-form' onSubmit={handleSubmit}>
                                            <VStack w={{ base: 'full' }}>
                                                <MWTextArea
                                                    label={t("confirmation.reasonLabel", { ns: "form" })}
                                                    name="reasonToConfirm"
                                                    placeholder={t("confirmation.reasonLabel", { ns: "form" })}
                                                    disabled={false}
                                                    maxLength={100}
                                                />
                                            </VStack>
                                            <HStack>
                                                <Button
                                                    type='submit'
                                                    disabled={Object.values(errors).some(v => !!v) || isSubmitting || onConfirmLoading}
                                                    rounded="full"
                                                    px={{ base: 2, md: 5 }}
                                                    py={2}
                                                    fontWeight="bold"
                                                    color="white"
                                                    _disabled={{
                                                        opacity: 0.4
                                                    }}
                                                    bg={confirmButtonOverrideColor ? confirmButtonOverrideColor : "yellow.500"}
                                                    loading={onConfirmLoading}
                                                    textDecoration="underline"
                                                    mx='auto'
                                                    className='mw-text'
                                                >
                                                    {confirmButtonOverrideText ? confirmButtonOverrideText : t("buttons.yesIConfirm", { ns: "form" })}
                                                </Button>
                                            </HStack>
                                        </Form>
                                    )}
                                </Formik>
                            </VStack>
                        </Dialog.Body>
                        <Dialog.Footer />
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
});

