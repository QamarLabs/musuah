import { Accordion, Box, Span } from "@chakra-ui/react";
import React from "react";

type Props = {
    titleTrigger?: string;
    hideTrigger: boolean;
}

export function MWAccordion({ children, titleTrigger, hideTrigger }: React.PropsWithChildren<Props>) {
    return (
                 <Accordion.Root variant={"enclosed"} collapsible defaultValue={["b"]}>
                <Accordion.Item value="0">
                    {hideTrigger ? null : (
                        <Accordion.ItemTrigger>
                            <Span className='mw-text' fontSize="0.90rem" flex="1">{titleTrigger}</Span>
                            <Accordion.ItemIndicator />
                        </Accordion.ItemTrigger>
                    )}
                    <Accordion.ItemContent>
                        <Accordion.ItemBody>
                            <Box borderColor="gray.300">
                                {children}
                            </Box>
                        </Accordion.ItemBody>
                    </Accordion.ItemContent>
                </Accordion.Item>
            </Accordion.Root>
    );
}