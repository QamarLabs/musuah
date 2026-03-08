import {
  Box,
  Heading,
  Image,
  Text,
  Link,
  VStack,
  Table,
  Button,
  Collapsible,
  useDisclosure,
  Flex,
  Icon,
  List, 
  ListItem
} from "@chakra-ui/react";
import { FaArrowUp } from "react-icons/fa";

export const PrivacyPolicyCollectionPart1 = () => {
  const { open: isPublicInfoOpen, onToggle: onPublicInfoToggle } =
    useDisclosure();
  const { open: isUsernameOpen, onToggle: onUsernameToggle } = useDisclosure();

  return (
    <VStack className='mw-text' align="start" spaceY={4} mx="10%" textAlign="left">
      <Box className='mw-text'>
        {/* Main Heading */}
        <Box className="mw-heading mw-heading2">
          <Heading  className='mw-text' as="h2" id="Collection_&_Use_of_Info" size="lg" mb={4}>
            <Box display={{ base: "none", md: "inline" }} mr={2}>
              <Image
                src="/flaticon-icons/informationwecollect.svg"
                alt="Data Collection"
                width="60px"
                height="60px"
                decoding="async"
                display="inline"
              />
            </Box>
            Information We Collect & How We Use It
          </Heading>
        </Box>

        {/* Right Floating Content */}
        <Box
          float={{ base: "none", md: "right" }}
          width={{ base: "100%", md: "100%" }}
          pl={{ base: 0, md: 8 }}
          mb={4}
          className='mw-text'
        >
          <Box id="types-of-info" />

          {/* Types of Information Section */}
          <Box className="mw-heading mw-heading3" mt={6}>
            <Heading
              className='mw-text'
              as="h3"
              id="Types_of_Information_We_Receive_From_You"
              size="md"
            >
              Types of Information We Receive From You
            </Heading>
          </Box>
          
          <Text  className='mw-text' mt={2} mb={4}>
            At Qamar Labs, we believe in honesty and minimal data collection. 
            Our mobile encyclopedia is designed to respect your privacy while 
            providing quality knowledge to the Ummah. Here's what you should 
            know about the information we collect:
          </Text>

          {/* Information You Provide Directly Section */}
          <Box id="info-you-provide" />
          <Box className="mw-heading mw-heading4" mt={4}>
            <Heading  className='mw-text' as="h4" id="Information_You_Provide_Directly" size="sm">
              Information You Provide Directly
            </Heading>
          </Box>

          <Text mt={2}>
            Unlike many online services, we intentionally limit the information 
            we ask from you. You can use our encyclopedia to read articles, 
            search for topics, and access knowledge without providing any 
            personal information.
          </Text>
          
          <Text mt={2}>
            <Box as="span" fontWeight="bold">No Account Required: </Box>
            You are <Box as="span" fontWeight="bold">not required</Box> to create an account 
            or log in to use our mobile encyclopedia. We believe access to 
            knowledge should be free and private.
          </Text>

          {/* Collapsible Public Info Table - Adapted for Encyclopedia Context */}
          <Table.Root
            variant="outline"
            border="1px solid"
            borderColor="gray.200"
            mt={4}
          >
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader bg="blue.50" textAlign="center" p={2}>
                  <Button
                    variant="ghost"
                    onClick={onPublicInfoToggle}
                    size="sm"
                    fontWeight="bold"
                  >
                    {isPublicInfoOpen ? "Collapse" : "Expand"}
                  </Button>
                  <Box bg="blue.100" p={2} fontWeight="bold" textAlign="center">
                    Information That May Be Visible
                  </Box>
                </Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell p={0}>
                  <Collapsible.Root open={isPublicInfoOpen}>
                    <Box p={4}>
                      <Text>
                        Since we do not require accounts or contributions, very 
                        little information about you is visible to us or others. 
                        However, please be aware:
                      </Text>
                      <List.Root mt={2} spaceY={2}>
                        <ListItem>
                          <Text as="span" fontWeight="bold">• Anonymous Usage Data: </Text>
                          If you consent, anonymized data about how you use the 
                          app (which articles you read, how long you spend) may 
                          be collected to help us improve the app.
                        </ListItem>
                        <ListItem>
                          <Text as="span" fontWeight="bold">• Device Information: </Text>
                          Basic device information (device type, OS version) may 
                          be collected automatically for analytics and crash reporting.
                        </ListItem>
                        <ListItem>
                          <Text as="span" fontWeight="bold">• Saved Favorites: </Text>
                          Any articles you bookmark or save for offline reading 
                          are stored locally on your device and are not accessible to us.
                        </ListItem>
                      </List.Root>
                      <Text mt={3}>
                        We do <Box as="span" fontWeight="bold">not</Box> collect your name, 
                        email address, phone number, or precise location. We believe 
                        in quality over quantity—including when it comes to data collection.
                      </Text>
                    </Box>
                  </Collapsible.Root>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table.Root>

          <Flex
            justify="flex-end"
            mt={4}
            display={{ base: "none", md: "flex" }}
          >
            <Link href="#top" color="blue.500" mr={2}>
              Back to top
            </Link>
            <Link href="#top">
              <Icon as={FaArrowUp} w={3} h={3} />
            </Link>
          </Flex>

          {/* Account Information Section - Simplified for No-Account Model */}
          <Box id="account-info" />
          <Box className="mw-heading mw-heading4" mt={6}>
            <Heading className='mw-text' as="h4" id="Account_Information" size="sm">
              Account Information
            </Heading>
          </Box>

          <Text mt={2}>
            <Box as="span" fontWeight="bold" fontSize="lg">✨ No Account? No Problem!</Box>
          </Text>
          
          <Text mt={2}>
            Our mobile encyclopedia is designed to be used without an account. 
            You can:
          </Text>
          
          <List.Root mt={2} spaceY={2}>
            <ListItem>• Read thousands of articles instantly</ListItem>
            <ListItem>• Search for any topic</ListItem>
            <ListItem>• Bookmark your favorite articles (saved locally)</ListItem>
            <ListItem>• Access content offline</ListItem>
          </List.Root>
          
          <Text mt={2}>
            All of this without ever creating an account or sharing your 
            personal information.
          </Text>

          {/* Collapsible Username Table - Adapted for No-Account Context */}
          <Table.Root
            variant="outline"
            border="1px solid"
            borderColor="gray.200"
            mt={4}
          >
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader bg="blue.50" textAlign="center" p={2}>
                  <Button
                    variant="ghost"
                    onClick={onUsernameToggle}
                    size="sm"
                    fontWeight="bold"
                  >
                    {isUsernameOpen ? "Collapse" : "Expand"}
                  </Button>
                  <Box bg="blue.100" p={2} fontWeight="bold" textAlign="center">
                    What If I Contact Support?
                  </Box>
                </Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell p={0}>
                  <Collapsible.Root open={isUsernameOpen}>
                    <Box p={4}>
                      <Text>
                        If you choose to contact us for support or with questions:
                      </Text>
                      <List.Root mt={2} spaceY={2}>
                        <ListItem>
                          • We will receive your email address and the content 
                          of your message
                        </ListItem>
                        <ListItem>
                          • This information is used only to respond to your inquiry
                        </ListItem>
                        <ListItem>
                          • We will not add you to marketing lists or share your 
                          email with third parties
                        </ListItem>
                        <ListItem>
                          • Your support correspondence is kept confidential
                        </ListItem>
                      </List.Root>
                      <Text mt={3}>
                        We value your trust and handle any information you share 
                        with us honestly and responsibly, in line with our mission 
                        to serve the Ummah.
                      </Text>
                    </Box>
                  </Collapsible.Root>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table.Root>

          <Flex
            justify="flex-end"
            mt={4}
            display={{ base: "none", md: "flex" }}
          >
            <Link href="#top" color="blue.500" mr={2}>
              Back to top
            </Link>
            <Link href="#top">
              <Icon as={FaArrowUp} w={3} h={3} />
            </Link>
          </Flex>

          {/* Location Information Section - Simplified */}
          <Box id="location-info" />
          <Box className="mw-heading mw-heading4" mt={6}>
            <Heading className='mw-text' as="h4" id="Location_Information" size="sm">
              Location Information
            </Heading>
          </Box>

          <Text mt={2}>
            <Box as="span" fontWeight="bold">We do not collect your precise location.</Box>
          </Text>
          
          <Text mt={2}>
            Unlike many apps, we do not use GPS, cell tower triangulation, or 
            WiFi positioning to track where you are. Your physical location 
            remains private when using our encyclopedia.
          </Text>

          <Box className='mw-text' id="IP_Addresses" mt={4}>
            <Heading className='mw-text' as="h5" id="IP_Addresses_Heading" size="xs" mb={2}>
              IP Addresses
            </Heading>
            <Text>
              When you use our app, we may automatically receive the IP address 
              of your device. This is standard for internet communications. 
              IP addresses may be used:
            </Text>
            <List.Root mt={2} spaceY={1}>
              <ListItem>• To provide the service (delivering content to your device)</ListItem>
              <ListItem>• For anonymous geographic region analysis (country-level only)</ListItem>
              <ListItem>• To diagnose problems and improve app performance</ListItem>
            </List.Root>
            <Text mt={2}>
              IP addresses are not used to identify you personally and are 
              handled in accordance with our commitment to privacy.
            </Text>
          </Box>

          <Flex
            justify="flex-end"
            mt={4}
            display={{ base: "none", md: "flex" }}
          >
            <Link href="#top" color="blue.500" mr={2}>
              Back to top
            </Link>
            <Link href="#top">
              <Icon as={FaArrowUp} w={3} h={3} />
            </Link>
          </Flex>

          {/* Analytics Section - New Addition */}
          <Box className='mw-text' id="analytics-info" mt={6}>
            <Box className="mw-heading mw-heading4">
              <Heading className='mw-text' as="h4" id="Analytics_&_Usage_Data" size="sm">
                Analytics & Usage Data
              </Heading>
            </Box>
            
            <Text mt={2}>
              To help us improve the app and deliver on our promise of quality 
              over quantity, we may use third-party analytics services that 
              collect anonymous usage data.
            </Text>
            
            <Text mt={2}>
              <Box as="span" fontWeight="bold">This may include: </Box>
              Which articles are most popular, how long users spend in the app, 
              which features are used most, crash reports, and device types.
            </Text>
            
            <Text mt={2}>
              <Box as="span" fontWeight="bold">This does NOT include: </Box>
              Your name, email, precise location, or any information that could 
              identify you personally.
            </Text>
            
            <Text mt={2}>
              You can learn more about our analytics partners in the 
              "Information We Share" section of this Privacy Policy.
            </Text>
          </Box>

          {/* Summary Section - New */}
          <Box className='mw-text' id="summary" mt={6} p={4} bg="blue.50" borderRadius="md">
            <Heading className='mw-text' as="h4" size="sm" mb={2}>
              📋 Summary: What We Collect
            </Heading>
            <List.Root spaceY={2}>
              <ListItem>✓ Basic device information for app functionality</ListItem>
              <ListItem>✓ IP address (temporary, for service delivery)</ListItem>
              <ListItem>✗ No name, email, or account information</ListItem>
              <ListItem>✗ No precise location</ListItem>
              <ListItem>✗ No sensitive personal data</ListItem>
            </List.Root>
            <Text className='mw-text' mt={3} fontStyle="italic">
              At Qamar Labs, we're committed to being honest, serving the Ummah, 
              and delivering quality over quantity—including how we handle your data.
            </Text>
          </Box>

          <Flex
            justify="flex-end"
            mt={4}
            display={{ base: "none", md: "flex" }}
          >
            <Link href="#top" color="blue.500" mr={2}>
              Back to top
            </Link>
            <Link href="#top">
              <Icon as={FaArrowUp} w={3} h={3} />
            </Link>
          </Flex>
        </Box>
      </Box>
    </VStack>
  );
};