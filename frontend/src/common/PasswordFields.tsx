import { useState } from "react";
import { FieldHelperProps, useField } from "formik";
import { MWTextInput } from "./Inputs"; // Assuming this is your base component
import { Accordion, Span, VStack, Text, Box } from "@chakra-ui/react";

type MWPasswordInputProps = {
    label?: string;
    confirmPasswordLabel?: string;
    minLength?: number;
    requireUppercase?: boolean;
    requireLowercase?: boolean;
    requireNumber?: boolean;
    requireSpecialChar?: boolean;
};

export function MWPasswordFields({
    minLength = 10,
    requireUppercase = true,
    requireLowercase = true,
    requireNumber = true,
    requireSpecialChar = true,
}: MWPasswordInputProps) {
    const [pwdField] = useField('password');
    const [confirmPwdField, confirmPwdMeta] = useField('confirmPassword');
    const [showPassword, setShowPassword] = useState(false);

    const validatePassword = (password: string) => {
        if (!password) return "Password is required";

        const errors = [];
        if (password.length < minLength) errors.push(`at least ${minLength} characters`);
        if (requireUppercase && !/[A-Z]/.test(password)) errors.push("one uppercase letter");
        if (requireLowercase && !/[a-z]/.test(password)) errors.push("one lowercase letter");
        if (requireNumber && !/[0-9]/.test(password)) errors.push("one number");
        if (requireSpecialChar && !/[^A-Za-z0-9]/.test(password)) errors.push("one special character");

        return errors.length > 0
            ? `Password must contain ${errors.join(", ")}`
            : "";
    };

    return (
        <VStack w='full'>
            <MWTextInput
                label="Password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Your Password"
                handleBlur={(helpers: FieldHelperProps<any>, val: string) => {
                    helpers.setTouched(true);
                    helpers.setError(validatePassword(val) || '');
                }}
                disabled={false}
            />
            <MWTextInput
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                disabled={false}
            />

            <Accordion.Root variant={"enclosed"} collapsible defaultValue={["b"]}>
                <Accordion.Item value="0">
                    <Accordion.ItemTrigger>
                        <Span className='mw-text' fontSize="0.90rem" flex="1">Password Requirements:</Span>
                        <Accordion.ItemIndicator />
                    </Accordion.ItemTrigger>
                    <Accordion.ItemContent>
                        <Accordion.ItemBody>
                            <Box borderColor="gray.300">
                                <VStack align="start" w='full' className='mw-text' fontSize="0.75rem" color='gray.800'>
                                    <Text className={pwdField.value?.length >= minLength ? "valid" : "invalid"} mb={0}>
                                        {minLength} characters minimum
                                    </Text>
                                    {requireUppercase && (
                                        <Text className={/[A-Z]/.test(pwdField.value) ? "valid" : "invalid"} mb={0}>
                                            At least one uppercase letter
                                        </Text>
                                    )}
                                    {requireLowercase && (
                                        <Text className={/[a-z]/.test(pwdField.value) ? "valid" : "invalid"} mb={0}>
                                            At least one lowercase letter
                                        </Text>
                                    )}
                                    {requireNumber && (
                                        <Text className={/[0-9]/.test(pwdField.value) ? "valid" : "invalid"} mb={0}>
                                            At least one number
                                        </Text>
                                    )}
                                    {requireSpecialChar && (
                                        <Text className={/[^A-Za-z0-9]/.test(pwdField.value) ? "valid" : "invalid"} mb={0}>
                                            At least one special character
                                        </Text>
                                    )}
                                </VStack>
                            </Box>
                        </Accordion.ItemBody>
                    </Accordion.ItemContent>
                </Accordion.Item>
            </Accordion.Root>


            <div className="password-match-indicator">
                {confirmPwdField.value && (
                    <span className={confirmPwdMeta.error ? "match" : "no-match"}>
                        {!confirmPwdMeta.error ? "✓ Passwords match" : "✗ Passwords do not match"}
                    </span>
                )}
            </div>

            <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
            >
                {showPassword ? "Hide Passwords" : "Show Passwords"}
            </button>
        </VStack>
    );
}