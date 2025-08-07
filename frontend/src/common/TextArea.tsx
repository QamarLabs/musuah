import { Textarea, Text } from "@chakra-ui/react";
import { useField, FieldHookConfig } from "formik";
import React, { useCallback, useMemo } from "react";
import { RiCloseLargeLine } from "react-icons/ri";
import { CommonWikiPageInputContainer } from "./ResponsiveContainer";

type MWTextAreaProps = {
    label?: string;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
    headerChildren?: React.ReactNode;
    maxLength?: number;
} & FieldHookConfig<string>;

export function MWTextArea({ disabled, placeholder, maxLength, ...props }: MWTextAreaProps) {
    const [field, meta, helpers] = useField(props.name);

    const handleClear = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        helpers.setValue('');
    }, [helpers]);

    const isInputEmpty = useMemo(() => !field.value, [field.value]);

    return (
        <CommonWikiPageInputContainer className='mw-text mw-normal' justify="start" center="start" maxHeight="10rem">
            {props.label && (
                <label aria-label={props.label} htmlFor={field.name}>{props.label}</label>
            )}
            <div className='position-relative'>
                <Textarea
                    name={field.name}
                    placeholder={placeholder}
                    aria-placeholder={placeholder}
                    borderColor={meta.error ? 'red.400' : 'initial'}
                    value={field.value}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                        const newValue = e.target.value;
                        helpers.setValue(newValue);
                    }}
                    resize="none" // Prevent resizing
                    rows={4} // Default rows
                    className={props.className}
                    maxLength={maxLength ?? 250}
                />
                {!isInputEmpty && (
                    <button
                        onClick={handleClear}
                        className={`position-absolute right-0 border-none h-100 bg-transparent`}
                        style={{ top: 0 }}
                    >
                        <RiCloseLargeLine style={{ backgroundColor: 'white', color: 'rgb(69, 69, 69)', padding: '0.25em', width: '3em', height: '1.25em' }} />
                    </button>
                )}
            </div>
            {meta.error && (<Text color="red.400" className='mw-text mw-small'>{meta.error}</Text>)}
        </CommonWikiPageInputContainer>
    );
}