import { FIELD_OF_FOCUS_OPTIONS } from "./constants/form";
import { Option } from "../typings.d";
import { FieldHookConfig, useField } from "formik";
import { useState } from "react";
import { CommonWikiPageInputContainer } from "./ResponsiveContainer";
import { Box, Button, HStack, Icon, Span, Text } from "@chakra-ui/react";
import { LuX } from "react-icons/lu";
import { COUNTRY_OPTIONS } from "./constants/countriesOptions";

type MWMultiSelectFieldOfFocusProps = {
  label?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  maxSelections?: number;
} & FieldHookConfig<string[]>;

function groupOptions(options: Option[]) {
  return options.reduce((acc, option) => {
    const category = option.category || 'Uncategorized';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(option);
    return acc;
  }, {} as Record<string, Option[]>)
}

export function MultiSelect({
  disabled,
  label,
  maxSelections = 5,
  ...props
}: MWMultiSelectFieldOfFocusProps) {
  const [field, meta, helpers] = useField<string[]>(props);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState<Record<string, Option[]>>(groupOptions(FIELD_OF_FOCUS_OPTIONS));


  const handleChangeSearchTerm = (searchTermVal: string) => {
    setSearchTerm(searchTermVal);
    const updatedFilteredValues = FIELD_OF_FOCUS_OPTIONS.filter(val => {
      return (
        val.category?.toLowerCase().includes(searchTermVal.toLowerCase())
        && val.label?.toLowerCase().includes(searchTermVal.toLowerCase())
      );
    });
    setFilteredOptions(groupOptions(updatedFilteredValues));

  }

  const toggleSelection = (value: string) => {
    const newValue = field.value.includes(value)
      ? field.value.filter(v => v !== value)
      : field.value.length < maxSelections
        ? [...field.value, value]
        : field.value;

    helpers.setValue(newValue);
  };

  const removeSelection = (value: string) => {
    helpers.setValue(field.value.filter(v => v !== value));
  };

  return (
    <CommonWikiPageInputContainer justify="start" center="start" mb={5}>
      {label && (
        <label aria-label={label} htmlFor={field.name} className="mb-1 d-block mw-text">
          {label} {maxSelections && `(Max ${maxSelections})`}
        </label>
      )}

      {/* Selected items display */}
      <div className="d-flex flex-wrap gap-2 mb-2">
        {field.value.map(value => {
          const option = FIELD_OF_FOCUS_OPTIONS.find(o => o.value === value);
          return (
            <div
              key={value}
              className="badge bg-primary d-flex align-items-center"
            >
              {option?.label || value}
              <button
                type="button"
                onClick={() => removeSelection(value)}
                className="btn-close btn-close-white ms-2"
                aria-label={`Remove ${option?.label || value}`}
                style={{ fontSize: '0.5rem' }}
              />
            </div>
          );
        })}
      </div>

      {/* Multi-select dropdown */}
      <div className="position-relative">
        <input
          type="text"
          placeholder="Search fields of focus..."
          className="w-100 p-2 mw-text"
          value={searchTerm}
          onChange={(e) => handleChangeSearchTerm(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onKeyDown={e => {
            if (e.key === 'Escape')
              setTimeout(() => setIsOpen(false), 200)
          }}
        />
        {isOpen && (
            <HStack position={'absolute'} h="3rem" mt={1} right={5} justifyContent="end" w='full' zIndex={101}>
              <Icon as={Button} onClick={() => {
                setSearchTerm('')
                setFilteredOptions(groupOptions(FIELD_OF_FOCUS_OPTIONS))
                setTimeout(() => setIsOpen(false), 200)
              }}>
                <LuX />
              </Icon>
          </HStack>
        )}
        {isOpen && (
          <div
            className="position-absolute w-100 bg-white border mt-1"
            style={{ height: '300px', overflowY: 'auto', zIndex: 100 }}
          >
            <Box position="relative" w='full'>
              <Box position='absolute' w='full'>
                {Object.entries(filteredOptions).length > 0 ? (
                  Object.entries(filteredOptions).map(([category, options]) => (
                    <div key={category} className='mw-text'>
                      <div className="p-2 bg-light fw-bold">{category}</div>
                      {options.map(option => (
                        <div
                          key={option.value}
                          className={`p-2 cursor-pointer ${field.value.includes(option.label) ? 'bg-primary text-white' : 'hover-bg-light'}`}
                          onClick={e => {
                            e.stopPropagation();
                            toggleSelection(option.label)
                          }}
                          onFocus={e => {
                            e.stopPropagation();
                          }}
                          onBlur={e => e.stopPropagation()}

                        >
                          <input
                            type="checkbox"
                            checked={field.value.includes(option.label)}
                            readOnly
                            className="me-2"
                          />
                          {option.label}
                        </div>
                      ))}
                    </div>
                  ))
                ) : (
                  <div className="p-2 text-muted mw-text">No matching options found</div>
                )}
              </Box>
            </Box>
          </div>
        )}
      </div>

      {meta.touched && meta.error && (
        <p className="text-danger small mt-1">{meta.error}</p>
      )}
    </CommonWikiPageInputContainer>
  );
}

export function CountrySelect({
  label,
  name,
}: {
  label: string,
  name: string
}) {
  const [field, meta, helpers] = useField(name)
  const [showCountrySelect, setShowCountrySelect] = useState(false);
  
  return (
    <Box className="position-relative mb-2 mw-text mw-sm" w='full'>
      {label && (
      <label className='mw-text mw-sm' aria-label={label} htmlFor={field.name}>{label}</label>
      )}
      <Button
        type="button"
        bg="white"
        borderColor={meta.error ? 'red.500' : 'gray.800'}
        color="gray.900"
        w='full'
        className="p-2 px-0"
        onClick={(e) => {
          e.preventDefault();
          setShowCountrySelect(!showCountrySelect)
        }}
      >
        <Span float='left' w='full' textAlign='left' fontSize='0.75rem'>
           {field.value ?? 'Select Country Of Origin'} ▼
        </Span>
      </Button>
      {meta.error && <Text position='absolute' color="red.500" className="mw-text mw-small">{meta.error}</Text>}

      {showCountrySelect && (
        <>
          <Box
            id="nationalIdCountry"
            className="position-absolute mw-text mw-sm bg-white border rounded mt-1 z-10"
            w='full'
            zIndex={9999}
            maxHeight={'10rem'}
            overflowY="auto"
          >
            {COUNTRY_OPTIONS.map((country, countryIdx) => (
              <Box
                key={countryIdx}
                className="mw-text p-2 hover-bg-light"
                _hover={{
                  bg: 'gray.200',
                  cursor: 'pointer'
                }}
                fontSize="0.75rem"
                onClick={() => {
                  helpers.setValue(country.label)
                }}
                onDoubleClick={() => {
                  setShowCountrySelect(false);
                }}
              >
                {country.label}
              </Box>
            ))}
          </Box>
        </>
      )}
    </Box>
  );
}