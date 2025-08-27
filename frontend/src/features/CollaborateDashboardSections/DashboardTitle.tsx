import { Text } from '@chakra-ui/react';
export const CollaborateDashboardTitle = ({ children }: React.PropsWithChildren<any>) => {
    return (
        <Text fontSize="125%" fontWeight={"bold"} w='full'>
            {children}
        </Text>
    );
}