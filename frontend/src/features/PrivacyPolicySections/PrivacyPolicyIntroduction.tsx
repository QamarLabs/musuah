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
    
    <Box>
      <VStack align="start" spaceY={4} mx="10%" textAlign="left">

      {/* Introduction Section */}
      <Flex align="center" id="Introduction" className="mw-heading mw-heading2">
        <Link 
          href="/wiki/File:WMF_open_door.png" 
          target="_blank" 
          rel="noopener noreferrer"
          display={['none', 'none', 'block']} // Hide on mobile
          mr={2}
        >
          <Image
            src="//upload.wikimedia.org/wikipedia/commons/thumb/b/be/WMF_open_door.png/60px-WMF_open_door.png"
            alt="WMF Open Door"
            w="60px"
            h="60px"
            srcSet="//upload.wikimedia.org/wikipedia/commons/thumb/b/be/WMF_open_door.png/90px-WMF_open_door.png 1.5x, //upload.wikimedia.org/wikipedia/commons/b/be/WMF_open_door.png 2x"
            decoding="async"
          />
        </Link>
        <Heading as="h2" size="lg">Introduction</Heading>
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
            <Heading as="h3" size="md" id="Welcome!" mb={4}>
              Welcome!
            </Heading>
            
            <VStack align="stretch" spaceY={4}>
              <Text>
                The Wikimedia movement is founded on a simple, but powerful principle: we can do more together than any of us can do alone. We cannot work collectively without gathering, sharing, and analyzing information about our users as we seek new ways to make the Wikimedia Sites more usable, safer, and more beneficial.
              </Text>
              
              <Text>
                We believe that information-gathering and use should go hand-in-hand with transparency. This Privacy Policy explains how the Wikimedia Foundation, the non-profit organization that hosts the Wikimedia Sites, like Wikipedia, collects, uses, and shares information we receive from you through your use of the Wikimedia Sites. It is essential to understand that, by using any of the Wikimedia Sites, you consent to the collection, transfer, processing, storage, disclosure, and use of your information as described in this Privacy Policy. That means that reading this Policy carefully is important.
              </Text>
              
              <Text>
                We believe that you should not have to provide nonpublic Personal Information to participate in the free knowledge movement. You do not have to provide things like your real name, address, or date of birth to sign up for a standard account or contribute content to the Wikimedia Sites.
              </Text>
              
              <Text id="donotsell">
                We do not sell or rent your Personal Information, nor do we give it to others to sell you anything. We use it to figure out how to make the Wikimedia Sites more engaging and accessible, to see which ideas work, and to make learning and contributing more fun. Put simply: we use this information to make the Wikimedia Sites better for you.
              </Text>
              
              <Text>
                After all, it is people like you, the champions of free knowledge, who make it possible for the Wikimedia Sites to not only exist, but also grow and thrive.
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
                <Link href="/wiki/Privacy_policy#top" title="Privacy policy">
                  <Image
                    src="//upload.wikimedia.org/wikipedia/commons/c/ce/WWC_arrow_up.png"
                    alt="Back to top"
                    w="11px"
                    h="11px"
                    decoding="async"
                  />
                </Link>
              </HStack>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </VStack>
    </Box>
  );
};