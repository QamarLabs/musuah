import { Accordion, Badge, HStack, Span, Stack, Text, VStack } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../store";
import { Divider } from "@chakra-ui/layout";
import { FIELD_OF_FOCUS_OPTIONS } from "../../common/constants/form";
import { useMemo } from "react";
import { groupOptions } from "../../common/util/format";
import { Option } from '../../typings.d';

type Props = {
    sections: {
        id: string;
        title: string;
        jsx: React.ReactNode;
    }[]
};

const ReviewRow = ({ fieldKey, fieldValue, isYesOrNo }: { fieldKey: string, fieldValue: string | undefined, isYesOrNo?: boolean }) => (
    <HStack>
        <Text className="mw-text mw-small" m={0} >
            <Span fontWeight="bold" textDecoration="underline" color="gray.900" mr={1}>{fieldKey}:</Span>
            {
                isYesOrNo ? (
                    <Badge variant="solid" colorPalette="blue">{fieldValue}</Badge>
                ) : fieldValue
            }
        </Text>
    </HStack>
);

export const ReviewPersonalInfo = observer(() => {
    const { authStore } = useStore();
    const { registrationValues } = authStore
    return (
        <Stack>
            <ReviewRow key="First Name" fieldKey="First Name" fieldValue={registrationValues.firstName} />
            <ReviewRow key="Family Name" fieldKey="Family Name" fieldValue={registrationValues.familyName} />
            <ReviewRow key="Contact Email" fieldKey="Contact Email" fieldValue={registrationValues.email} />
            <ReviewRow key="Country of Origin" fieldKey="Country of Origin" fieldValue={registrationValues.countryOfOrigin} />
            <ReviewRow key="National ID Country Code" fieldKey="National ID Country Code" fieldValue={registrationValues.nationalIdCountry} />
            <ReviewRow key="National ID" fieldKey="National ID" fieldValue={registrationValues.nationalId} />
        </Stack>
    );
});

export const ReviewFieldOfFocus = observer(() => {
    const { authStore } = useStore();
    const { registrationValues } = authStore;
    const groupedFieldOfFocus: Record<string, Option[]> = useMemo(() => {
        const origOptions = FIELD_OF_FOCUS_OPTIONS.filter(opt => registrationValues.fieldOfFocus.includes(opt.label));
        return groupOptions(origOptions);
    }, [registrationValues.fieldOfFocus]);


    return (
        <VStack className='mw-text mw-small' alignItems='start' p={0}>
            {Object.entries(groupedFieldOfFocus).length > 0 ? (
                Object.entries(groupedFieldOfFocus).map(([category, options]) => (
                    <div key={category} className='mw-text'>
                        <div className="p-2 bg-light fw-bold mw-normal">{category}</div>
                        {options.map((ff, idx) => <Badge key={idx} variant="solid" colorPalette="#646cffaa">{ff.label}</Badge>)}
                    </div>
                ))) : null}
        </VStack>
    );
});

export const ReviewOtherInfo = observer(() => {
    const { authStore } = useStore();
    const { registrationValues } = authStore
    return (
        <Stack>
            <ReviewRow key="Facebook" fieldKey="Facebook" fieldValue={registrationValues.facebook} />
            <ReviewRow key="Linkedin" fieldKey="Linkedin" fieldValue={registrationValues.linkedin} />
            <ReviewRow key="Twitter Or X" fieldKey="Twitter Or X" fieldValue={registrationValues.twitterOrX} />
            <ReviewRow key="Tiktok" fieldKey="Tiktok" fieldValue={registrationValues.tiktok} />
            <Divider mb={2} />

            <ReviewRow key="Has been part of a government agency" fieldKey="Has been part of a government agency" fieldValue={registrationValues.wasInGovernmentAgency ? "Yes" : "No"} isYesOrNo={true} />
            <ReviewRow key="Reasons for contributing to mūsūʿah" fieldKey="Reasons for contributing to mūsūʿah" fieldValue={registrationValues.whyContribute} />

        </Stack>
    );
});


export default function Review({ sections }: Props) {
    return (
        <Stack gap="8">
            <Text className='mw-text' fontSize="1.2rem" mb={3}>Review</Text>
            <Accordion.Root variant={"enclosed"} collapsible defaultValue={["b"]}>
                {sections.map((item, index) => (
                    <Accordion.Item key={index} value={item.id}>
                        <Accordion.ItemTrigger>
                            <Span flex="1" className='mw-text' fontSize="1.1rem">{item.title}</Span>
                            <Accordion.ItemIndicator />
                        </Accordion.ItemTrigger>
                        <Accordion.ItemContent>
                            <Accordion.ItemBody>
                                {item.jsx}
                            </Accordion.ItemBody>
                        </Accordion.ItemContent>
                    </Accordion.Item>
                ))}
            </Accordion.Root>
        </Stack>
    );
}
