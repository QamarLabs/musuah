import { Box, Button, Span, Text } from '@chakra-ui/react';
import { FieldHookConfig, FieldHelperProps, useField } from "formik";
import React, { useCallback, useMemo, useState } from "react";
import { RiCloseLargeLine } from "react-icons/ri";
import { CommonWikiPageInputContainer } from "./ResponsiveContainer";
import { nationalIdPatterns, validateNationalId } from "./util/form";
import { Country } from "../typings.d";

export type MWInputProps = {
    label?: string;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
    prefix?: string;
    handleChange?: (helpers: FieldHelperProps<any>, val: string) => void;
    handleBlur?: (helpers: FieldHelperProps<any>, val: string) => void;
    headerChildren?: React.ReactNode;
    error?: string;
} & FieldHookConfig<string>;

export function MWTextInput({ prefix, disabled, headerChildren, placeholder, ...props }: MWInputProps) {
    const [field, meta, helpers] = useField(props.name);

    const handleClear = useCallback(() => (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        helpers.setValue('');
    }, []);

    const isInputEmpty = useMemo(() => !field.value, [field.value]);
    return (
        <>
            <CommonWikiPageInputContainer maxHeight={headerChildren ? '10rem' : '5rem'}>
                {props.label && (
                    <label className='mw-text mw-sm' aria-label={props.label} htmlFor={field.name}>{props.label}</label>
                )}
                {headerChildren && headerChildren}
                <div className='position-relative'>
                    {props.handleBlur  
                        ? (
                            <input
                                type={props.type ? props.type : "text"}
                                name={field.name}
                                placeholder={placeholder}
                                aria-placeholder={placeholder}
                                value={field.value}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    const newValue = e.target.value;
                                    if(props.handleChange)
                                        props.handleChange(helpers, newValue);
                                    else
                                        helpers.setValue(newValue);
                                }}
                                onBlur={() => {
                                    if(props.handleBlur)
                                        props.handleBlur(helpers, field.value);
                                }}
                                disabled={disabled}
                                className='w-100 mw-sm p-2 px-0 bg-transparent text-dark mw-autocomplete'
                            />
                        )
                        : (
                            <input
                                type={props.type ? props.type : "text"}
                                name={field.name}
                                placeholder={placeholder}
                                aria-placeholder={placeholder}
                                value={field.value}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    const newValue = e.target.value;
                                    if(props.handleChange)
                                        props.handleChange(helpers, newValue);
                                    else
                                        helpers.setValue(newValue);
                                }}
                                disabled={disabled}
                                className='w-100 mw-sm p-2 px-0 bg-transparent text-dark mw-autocomplete'
                            />
                        )}
                    {!isInputEmpty 
                        && (
                        <button 
                            onClick={handleClear()}
                            className={`position-absolute right-0 border-none h-100 bg-transparent`}
                        >
                            <RiCloseLargeLine style={{ backgroundColor: 'white', color: 'rgb(69, 69, 69)', padding: '0.25em', width: '3em', height: '1.25em' }} />
                        </button>
                    )}
                </div>
                {meta.error 
                    ?  (<Text className='mw-text' fontSize="0.75rem" color='red.600'>{meta.error}</Text>)
                    : props.error ? (<Text className='mw-text' fontSize="0.75rem" color='red.600'>{props.error}</Text>)
                    : null}
            </CommonWikiPageInputContainer>
        </>
    );
}


export function MWEmailInput({ ...props }: MWInputProps) {
    console.log({...props})
    return (
        <MWTextInput 
            {...props}
            label={props.label}
            type="email"
            placeholder="example@domain.com"
            pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
            handleBlur={(helpers: FieldHelperProps<any>) => {
                // Validate on blur
                helpers.setTouched(true);
            }}
            title="Please enter a valid email address (e.g., user@example.com)"
        />
    );
}

type MWNationalIdInputProps = {
    country: Country;
    countryError: string | undefined;
    handleSelectCountry: (country: Country) => void;
} & MWInputProps;


export function MWNationalIdInput({ 
    disabled, 
    placeholder, 
    country,
    countryError,
    handleSelectCountry, 
    ...props 
}: MWNationalIdInputProps) {
    const [showCountrySelect, setShowCountrySelect] = useState(false);


    const handleCountryChange = (newCountry: Country) => {
        handleSelectCountry(newCountry);
        setShowCountrySelect(false);
    };

    const handleInputChange = (helpers: FieldHelperProps<any>, val: string) => {
        // Apply mask if available
        if (nationalIdPatterns[country]?.mask) {
            val = nationalIdPatterns[country].mask!(val);
        } else {
            // For unmasked patterns, just clean the input
            val = val.replace(/[^0-9A-Za-z]/g, '');
        }

        helpers.setValue(val);
    };

    return (
        <MWTextInput
            {...props}
            placeholder={nationalIdPatterns[country]?.label || placeholder}
            pattern={nationalIdPatterns[country]?.regex?.source ?? undefined}
            handleBlur={(helpers: FieldHelperProps<any>, val: string) => {
                    helpers.setTouched(true);
                    helpers.setError(validateNationalId(country, val) || '');
            }}
            handleChange={handleInputChange}
            headerChildren={
                <Box className="position-relative mb-2 mw-text mw-sm" w='full'>
                    <Button 
                        type="button"
                        bg="white"
                        borderColor="gray.800"
                        color="gray.900"
                        w='full'
                        className="p-2 px-0"
                        onClick={() => setShowCountrySelect(!showCountrySelect)}
                    >
                        <Span float='left' w='full' textAlign='left' fontSize='0.75rem'>
                            {nationalIdPatterns[country]?.label ?? "Select Country Of Residence"} ▼
                        </Span>
                    </Button>
                    {showCountrySelect && (
                        <>
                            <Box
                                id="nationalIdCountry" 
                                className="position-absolute mw-text mw-sm bg-white border rounded mt-1 z-10"
                                borderColor={countryError ? 'red.500' : 'initial'}
                                w='full'
                                zIndex={9999}
                            >
                                {Object.entries(nationalIdPatterns).map(([code, config]) => (
                                    <Box 
                                        key={code}
                                        className="mw-text p-2 hover-bg-light"
                                        _hover={{
                                            bg: 'gray.200',
                                            cursor: 'pointer'
                                        }}
                                        fontSize="0.75rem"
                                        onClick={() => handleCountryChange(code as Country)}
                                    >
                                        {config.label}
                                    </Box>
                                ))}
                            </Box>
                            {countryError && <Text color="red.500 mw-text mw-small">{countryError}</Text>}
                        </>
                    )}
                </Box>
            }
            title={`Please enter a valid ${nationalIdPatterns[country]?.label ?? "Country"} (e.g. ${nationalIdPatterns[country]?.label ?? "Jordan"})`}
        />
    );
}