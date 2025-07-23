import { FieldHookConfig, useField } from "formik";
import React from "react";
import { CommonWikiPageInputContainer } from "./ResponsiveContainer";
import { YesOrNo } from "../typings.d";
import { RadioCard , Stack } from "@chakra-ui/react";

type MWTermsCheckboxProps = {
  label: React.ReactNode;
  termsLink?: string;
  disabled?: boolean;
  className?: string;
} & FieldHookConfig<boolean>;

export function MWCheckbox({
  label,
  termsLink,
  disabled,
  className,
  ...props
}: MWTermsCheckboxProps) {
  const [field, meta, helpers] = useField(props);

  return (
    <CommonWikiPageInputContainer>
      <div className={`form-check ${className || ''}`}>
        <input
          type="checkbox"
          id={field.name}
          name={field.name} 
          onChange={(e) => {
            helpers.setValue(e.target.checked ?? false);
          }}
          checked={field.value}
          aria-checked={field.value}
          disabled={disabled}
          className={`form-check-input ${meta.touched && meta.error ? 'is-invalid' : ''}`}
        />
        
        <label htmlFor={field.name} className="form-check-label ms-2">
          {label} 
          {termsLink && (
            <a 
              href={termsLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="ms-1"
              onClick={(e) => e.stopPropagation()} // Prevent checkbox toggle when clicking link
            >
              (view terms)
            </a>
          )}
        </label>
        
        {meta.touched && meta.error && (
          <div className="invalid-feedback d-block">{meta.error}</div>
        )}
      </div>
    </CommonWikiPageInputContainer>
  );
}


export interface RadioOption {
  value: string;
  label: string;
  desc: string;
}
type MWRadioProps = {
  label: React.ReactNode;
  value: string | number | boolean;
  options: RadioOption[];
  description?: string;
  disabled?: boolean;
  direction?: "row" | "column";
} & FieldHookConfig<YesOrNo>;


export function MWRadioBox({
  label,
  name,
  // value,
  // description,
  options,
  // ...props
}: MWRadioProps) {  
  const [field, meta, helpers] = useField(name);
  console.log('meta:', meta.error)
  return (
    <Stack gap="8">
      <RadioCard.Root  size="md" defaultValue={options[0].value}>
        <RadioCard.Label>{label}</RadioCard.Label>
        <Stack align="stretch" flexDir={{ base: 'column', md: 'row' }}>
          {options.map((option) => (
            <RadioCard.Item 
              key={option.value} 
              value={option.value} 
              onChange={e =>  {
                e.preventDefault();
                helpers.setValue(option.value);
              }}
            >
              <RadioCard.ItemHiddenInput />
              <RadioCard.ItemControl>
                <RadioCard.ItemContent>
                  <RadioCard.ItemText>{option.label}</RadioCard.ItemText>
                  <RadioCard.ItemDescription>
                    {option.desc}
                  </RadioCard.ItemDescription>
                </RadioCard.ItemContent>
                <RadioCard.ItemIndicator aria-selected={field.value === option.value} />
              </RadioCard.ItemControl>
            </RadioCard.Item>
          ))}
      </Stack>
      </RadioCard.Root>
    </Stack>
  );
}