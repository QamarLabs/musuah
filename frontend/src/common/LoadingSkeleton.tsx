import {
    LoaderOverlay,
    VStack,
    HStack,
    SkeletonCircle,
    SkeletonText,
    Box
} from '@chakra-ui/react';
import React from 'react';

// export const RelativeLoaderSkeleton = () => {}

export default function ({...props}: React.PropsWithChildren<any>) {
    return (
        <LoaderOverlay {...props}>
            <VStack>
                <HStack flexDir={{ base: 'column', lg: 'row' }}>
                    <Box width="20rem">
                        <SkeletonCircle size="12" />
                        <SkeletonText noOfLines={5} />
                    </Box>
                    <Box width="20rem">
                        <SkeletonCircle size="12" />
                        <SkeletonText noOfLines={5} />
                    </Box>

                    <Box width="20rem">
                        <SkeletonCircle size="12" />
                        <SkeletonText noOfLines={5} />
                    </Box>


                </HStack>
                <HStack display={{ base: 'none', lg: 'flex' }}>
                    <Box width="20rem">
                        <SkeletonCircle size="12" />
                        <SkeletonText noOfLines={5} />
                    </Box>
                    <Box width="20rem">
                        <SkeletonCircle size="12" />
                        <SkeletonText noOfLines={5} />
                    </Box>

                    <Box width="20rem">
                        <SkeletonCircle size="12" />
                        <SkeletonText noOfLines={5} />
                    </Box>


                </HStack>
                <HStack display={{ base: 'none', lg: 'flex' }}>
                    <Box width="20rem">
                        <SkeletonCircle size="12" />
                        <SkeletonText noOfLines={5} />
                    </Box>
                    <Box width="20rem">
                        <SkeletonCircle size="12" />
                        <SkeletonText noOfLines={5} />
                    </Box>

                    <Box width="20rem">
                        <SkeletonCircle size="12" />
                        <SkeletonText noOfLines={5} />
                    </Box>


                </HStack>

            </VStack>
        </LoaderOverlay>
    );
}