import { ButtonProps, Button as ChakraUIButton } from '@chakra-ui/react';
import { Button } from '@wordpress/components';
import React from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
    to: string;
}

export function LinkButton(props: React.PropsWithChildren<Props>) {
    const { to, children } = props;
    const navigate = useNavigate();

    const navigateTo = () => navigate(to);

    return (
        <Button
            type="button"
            variant="primary"
            onClick={navigateTo}
        >
            {children}
        </Button>
    );
}

type MWCommonButtonProps = {
    submitting?: boolean;
    errors?: {[key: string]: any };
} & ButtonProps

export function MWCommonButton({ children, submitting, errors, ...props}: React.PropsWithChildren<MWCommonButtonProps>){
    return (
        <ChakraUIButton
            disabled={Object.values(errors ?? {}).some(v => !!v) || submitting}
            rounded="full"
            px={{ base: 2, md: 5 }}
            py={2}
            fontWeight="bold"
            color="white"
            _disabled={{
                opacity: 0.4
            }}
            bg="green.800"
            loading={submitting}
            className='mw-text'
            {...props}
        >
            {children}
        </ChakraUIButton>
    );
}