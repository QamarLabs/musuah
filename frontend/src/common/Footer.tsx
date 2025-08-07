import { Box, Flex, Text, Link, useBreakpointValue } from '@chakra-ui/react';

function Footer() {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const direction = isMobile ? 'column' : 'row';
  const align = isMobile ? 'center' : 'space-between';

  return (
    <Box 
      as="footer" 
      bg="white" 
      py={3} 
      px={{ base: 4, md: 8 }}
      width="100%"
      borderTop="1px solid"
      borderColor="gray.100"
    >
      <Flex
        direction={direction}
        align="center"
        justify={align}
        maxW="1200px"
        mx="auto"
      >
        <Box mb={{ base: 2, md: 0 }}>
          <Text fontWeight="600" fontSize="lg" color="gray.800">
            COMET
          </Text>
          <Text fontSize="sm" color="gray.500">
            Collaborative Organization for Muslims in Emerging Technology
          </Text>
        </Box>

        <Box textAlign={isMobile ? 'center' : 'right'}>
          
          <Link 
            href="mailto:devmtnali@gmail.com" 
            color="blue.500"
            fontWeight="500"
            fontSize="sm"
            _hover={{ textDecoration: 'underline' }}
          >
            devmtnali@gmail.com
          </Link>
          <Text fontSize="xs" color="gray.400" mt={2}>
            © {new Date().getFullYear()} COMET. All rights reserved.
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}

export default Footer;