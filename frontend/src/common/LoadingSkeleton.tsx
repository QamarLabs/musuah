import {
    LoaderOverlay,
    VStack,
    HStack,
    SkeletonCircle,
    SkeletonText,
    Box
} from '@chakra-ui/react';

export default function () {
    return (
        <LoaderOverlay>
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