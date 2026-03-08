import { 
  Box, 
  Heading, 
  Text, 
  Link, 
  Image, 
  Flex, 
  VStack,
  HStack
} from "@chakra-ui/react";

export const PrivacyPolicyIntroduction = () => {
  return (
    <Box className='mw-text'>
      <VStack align="start" spaceY={4} mx="10%" textAlign="left">

        {/* Introduction Section */}
        <Flex align="center" id="Introduction" className="mw-heading mw-heading2">
          <Image
            src="/flaticon-icons/presentation.svg"
            alt="Qamar Labs Logo"
            w="60px"
            h="60px"
            decoding="async"
            display={['none', 'none', 'block']}
            mr={2}
          />
          <Heading className='mw-text' as="h2" size="lg">Introduction</Heading>
        </Flex>

        {/* Welcome Section */}
        <Flex 
          direction={['column', 'column', 'row']} 
          gap={4}
          mt={4}
        >
          <Box flex={1}>
            {/* Empty spacer for desktop layout */}
          </Box>

          <Box 
            width={['100%', '100%', '100%']} 
            pl={[0, 0, 8]}
            float={['none', 'none', 'right']}
          >
            <Box id="welcome" mb={6}>
              <Heading className='mw-text' as="h3" size="md" id="Welcome!" mb={4}>
                Welcome!
              </Heading>
              
              <VStack align="stretch" spaceY={4}>
                <Text>
                  Qamar Labs is built on a simple but powerful belief: technology should uplift the Ummah and make life easier for people everywhere. To do that, we continuously improve our apps by understanding how they are used, identifying what helps our users most, and striving to build tools that benefit the community.
                </Text>
                
                <Text>
                  We believe transparency is an essential part of trust. This Privacy Policy explains how Qamar Labs collects, uses, and protects the information we receive when you use our apps and services. By using any Qamar Labs app, you consent to the collection and use of your information as described in this Policy, so reading it carefully is important.
                </Text>
                
                <Text>
                  We also believe you should not have to provide unnecessary personal information to benefit from our apps. You do not need to share your real name, address, or other sensitive details to create a standard account or use most Qamar Labs features.
                </Text>
                
                <Text id="donotsell">
                  We do not sell or rent your personal information, and we do not give it to others for marketing. Instead, we use the information you choose to share to improve our apps, understand what features are most helpful, and make your experience smoother and more enjoyable. In short: we use your data to make Qamar Labs apps better for you.
                </Text>
                
                <Text>
                  At the heart of Qamar Labs are people like you — users who inspire us to build more, improve constantly, and serve the Ummah with honesty and purpose.
                </Text>
              </VStack>
            </Box>

            {/* Definitions Section */}
            <Box id="definitions">
              <Flex justify="space-between" align="center" mb={4}>
                <Heading as="h4" size="sm" id="Definitions">
                  Definitions
                </Heading>
                <HStack display={['none', 'none', 'flex']}>
                  <Link href="#top" color="blue.500">
                    Back to top
                  </Link>
                  <Image
                    src="/arrow-up.png"
                    alt="Back to top"
                    w="11px"
                    h="11px"
                    decoding="async"
                  />
                </HStack>
              </Flex>
            </Box>
          </Box>
        </Flex>
      </VStack>
    </Box>
  );
};