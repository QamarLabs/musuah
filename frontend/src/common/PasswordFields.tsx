import { useCallback, useState } from "react";
import { FieldHelperProps, useField } from "formik";
import { MWInputProps, MWTextInput } from "./Inputs"; // Assuming this is your base component
import { Accordion, Span, VStack, Text, Box, InputGroup, Input } from "@chakra-ui/react";
import { CommonWikiPageInputContainer } from "./ResponsiveContainer";
import { LuEye, LuEyeOff } from "react-icons/lu";

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


export function MWLoginPasswordInput({ prefix, disabled, headerChildren, placeholder, ...props }: MWInputProps) {
    const [field, meta, helpers] = useField(props.name);
    const [showPassword, setShowPassword] = useState(false);

    // const handleClear = useCallback(() => (e: React.MouseEvent<HTMLButtonElement>) => {
    //     e.preventDefault();
    //     helpers.setValue('');
    // }, []);

    const togglePasswordVisibility = useCallback((e: any) => {
        e.preventDefault()
        e.stopPropagation();
        setShowPassword(prev => !prev);
    }, []);

    // const isInputEmpty = useMemo(() => !field.value, [field.value]);
    return (
        <>
            <CommonWikiPageInputContainer maxHeight={headerChildren ? '10rem' : '5rem'}>
                {props.label && (
                    <label className='mw-text mw-sm' aria-label={props.label} htmlFor={field.name}>{props.label}</label>
                )}
                {headerChildren && headerChildren}
                {/* <div className='position-relative'> */}
                <InputGroup endElement={
                    <button
                        onClick={togglePasswordVisibility}
                        className='border-none bg-transparent'
                    >
                        {showPassword ? (
                            <LuEyeOff style={{ backgroundColor: 'white', color: 'rgb(69, 69, 69)', padding: '0.25em', width: '3em', height: '1.25em' }} />
                        ) : (
                            <LuEye style={{ backgroundColor: 'white', color: 'rgb(69, 69, 69)', padding: '0.25em', width: '3em', height: '1.25em' }} />
                        )}
                    </button>
                }>
                    {props.handleBlur
                    ? (
                        <Input
                            type={showPassword ? "text" : "password"}
                            name={field.name}
                            placeholder={placeholder}
                            aria-placeholder={placeholder}
                            value={field.value}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                const newValue = e.target.value;
                                if (props.handleChange)
                                    props.handleChange(helpers, newValue);
                                else
                                    helpers.setValue(newValue);
                            }}
                            onBlur={() => {
                                if (props.handleBlur)
                                    props.handleBlur(helpers, field.value);
                            }}
                            disabled={disabled}
                            className='w-100 mw-sm p-2 px-0 bg-transparent text-dark mw-autocomplete'
                        />
                    )
                    : (
                        <Input
                            type={showPassword ? "text" : "password"}
                            name={field.name}
                            placeholder={placeholder}
                            aria-placeholder={placeholder}
                            value={field.value}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                const newValue = e.target.value;
                                if (props.handleChange)
                                    props.handleChange(helpers, newValue);
                                else
                                    helpers.setValue(newValue);
                            }}
                            disabled={disabled}
                            className='w-100 mw-sm p-2 px-0 bg-transparent text-dark mw-autocomplete'
                        />
                    )}
                </InputGroup>
                {meta.error
                    ? (<Text className='mw-text' fontSize="0.75rem" color='red.600'>{meta.error}</Text>)
                    : props.error ? (<Text className='mw-text' fontSize="0.75rem" color='red.600'>{props.error}</Text>)
                        : null}
            </CommonWikiPageInputContainer>
        </>
    );
}