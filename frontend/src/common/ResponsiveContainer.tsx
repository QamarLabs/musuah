import { Box, Card } from '@chakra-ui/react';
import { 
    // Card, CardBody,
     Flex } from '@wordpress/components';
import React from 'react';

export default function ResponsiveContainer({ children, extraClasses }: React.PropsWithChildren<any>) {
    return (
        <Flex 
            className={"responsiveContainer" + (extraClasses ? ` ${extraClasses}` : "")} 
            align="center" 
            justify="center" 
            wrap={true} 
            expanded={false}
        >
            {children}
        </Flex>
    );
}

export function CommonWikiPageTextContainer({ children, ...containerProps }: React.PropsWithChildren<any>) {
    return (
        <Flex 
            className='responsiveTextContainer' 
            direction="column" 
            align="center" 
            justify="center" 
            style={{ minHeight: "100vh", textAlign: 'left' }} 
            {...containerProps}
        >
            {children},
        </Flex>
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
        <Card.Root w='full' {...containerProps}>
            <Card.Body w='full' className='mw-wiki-page-grid-box'>
                {children}

            </Card.Body>
        </Card.Root>
    );
}