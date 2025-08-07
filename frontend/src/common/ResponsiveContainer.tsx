import { Box, Card, Flex as ChakraUIFlex } from '@chakra-ui/react';
import React from 'react';

export default function ResponsiveContainer({ children, extraClasses }: React.PropsWithChildren<any>) {
    return (
        <ChakraUIFlex 
            className={"responsiveContainer" + (extraClasses ? ` ${extraClasses}` : "")} 
            align="center" 
            justify={{ sm: 'center', md: 'start' }} 
            wrap="wrap"
            px={{ base: "0.5rem" }}
        >
            {children}
        </ChakraUIFlex>
    );
}

export function CommonWikiPageTextContainer({ children, ...containerProps }: React.PropsWithChildren<any>) {
    return (
        <ChakraUIFlex 
            className='responsiveTextContainer mw-text' 
            direction="column" 
            align={{ base: "center", md: 'start' }} 
            justify="center" 
            minH="15vh"
            textAlign='left'
            wordBreak="break-word"
            {...containerProps}
        >
            {children}
        </ChakraUIFlex>
    );
}

export function CommonWikiPageInputContainer({ children, ...props }: React.PropsWithChildren<any>) {
    return (
        <Box 
            maxHeight="5rem"
            justifyContent='start'
            alignItems="start"
            w='full'
            mb={2}
            {...props}
        >
            {children}
        </Box>
    );
}


export function CommonWikiPageGridBox({ children, ...containerProps }: React.PropsWithChildren<any>) {
    return (
        <Card.Root alignSelf='start' w='full' {...containerProps}>
            <Card.Body w='full' className='mw-wiki-page-grid-box'>
                {children}

            </Card.Body>
        </Card.Root>
    );
}