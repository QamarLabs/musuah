import { FieldHookConfig, useField } from "formik";
import React from "react";
import { CommonWikiPageInputContainer } from "./ResponsiveContainer";
import { YesOrNo } from "../typings.d";
import {
  Box,
  Checkbox,
  HStack,
  Link,
  RadioCard,
  Stack,
  Text
} from "@chakra-ui/react";

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
      <Box px={0}>
        <Checkbox.Root

          id={field.name}
          name={field.name}
          checked={field.value}
          onCheckedChange={(e) => helpers.setValue(!!e.checked)}
          disabled={disabled}
          borderColor={meta.error ? "red.600" : "gray.200"}
          className={meta.touched && meta.error ? 'is-invalid' : ''}
        >
          <Checkbox.HiddenInput />
          <HStack className='mw-text mw-sm'>

            <Checkbox.Control />
            <Stack gap="1">
              <Checkbox.Label>
                {label}
              </Checkbox.Label>
              <Box textStyle="sm" color="fg.muted">
                {termsLink && (
                  <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    ml={1}
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(termsLink, "_blank");
                    }}
                  >
                    (view terms)
                  </Link>
                )}
              </Box>
            </Stack>
          </HStack>

          {meta.error && (
            <Text fontSize="0.75rem" color="red.600" mt={1}>
              {meta.error}
            </Text>
          )}
        </Checkbox.Root>
      </Box>
    </CommonWikiPageInputContainer >
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
    <Stack gap="8" className='mw-text mw-sm'>
      <RadioCard.Root size="md" defaultValue={options[0].value}>
        <RadioCard.Label>{label}</RadioCard.Label>
        <Stack align="stretch" flexDir={{ base: 'column', md: 'row' }}>
          {options.map((option) => (
            <RadioCard.Item
              key={option.value}
              value={option.value}
              onChange={e => {
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