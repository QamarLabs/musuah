import {
  Box,
  Heading,
  Image,
  Text,
  Link,
  Table,
  Button,
  Collapsible,
  useDisclosure,
  Flex,
  Icon,
} from '@chakra-ui/react';
import { FaArrowUp } from 'react-icons/fa';

export const PrivacyPolicyCollectionPart1 = () => {
  const { open: isPublicInfoOpen, onToggle: onPublicInfoToggle } = useDisclosure();
  const { open: isUsernameOpen, onToggle: onUsernameToggle } = useDisclosure();

  return (
    <Box>
      {/* Main Heading */}
      <Box className="mw-heading mw-heading2">
        <Heading as="h2" id="Collection_&_Use_of_Info" size="lg" mb={4}>
          <Box display={{ base: 'none', md: 'inline' }}>
            <Link href="/wiki/File:WMF_chart.png">
              <Image
                src="//upload.wikimedia.org/wikipedia/commons/thumb/e/e5/WMF_chart.png/60px-WMF_chart.png"
                alt="WMF Chart"
                width="60px"
                height="60px"
                srcSet="//upload.wikimedia.org/wikipedia/commons/thumb/e/e5/WMF_chart.png/90px-WMF_chart.png 1.5x, //upload.wikimedia.org/wikipedia/commons/e/e5/WMF_chart.png 2x"
                decoding="async"
                display="inline"
                mr={2}
              />
            </Link>
          </Box>
          Collection & Use of Info
        </Heading>
      </Box>

      {/* Right Floating Content */}
      <Box float={{ base: 'none', md: 'right' }} width={{ base: '100%', md: '70%' }} pl={{ base: 0, md: 8 }} mb={4}>
        <Box id="types-of-info" />

        {/* Types of Information Section */}
        <Box className="mw-heading mw-heading3" mt={6}>
          <Heading as="h3" id="Types_of_Information_We_Receive_From_You_&_How_We_Get_It" size="md">
            Types of Information We Receive From You & How We Get It
          </Heading>
        </Box>

        <Box id="your-public-contribs" />

        {/* Public Contributions Section */}
        <Box className="mw-heading mw-heading4" mt={4}>
          <Heading as="h4" id="Your_Public_Contributions" size="sm">
            Your Public Contributions
          </Heading>
        </Box>

        <Text mt={2}>
          When you make a contribution to any Wikimedia Site, including on user or discussion pages, you are creating a permanent, public record of every piece of content added, removed, or altered by you. The page history will show when your contribution or deletion was made, as well as your username (if you are signed in) or your{' '}
          <Link href="/wiki/Special:MyLanguage/Policy:Privacy_policy/Glossary_of_key_terms#ip-address" color="blue.500">
            IP address
          </Link>{' '}
          (if you are not signed in). We may use your public contributions, either aggregated with the public contributions of others or individually, to create new features or data-related products for you or to learn more about how the Wikimedia Sites are used, as further explained below in the{' '}
          <Link href="#infowereceive" color="blue.500">
            "How We Use Information We Receive From You"
          </Link>{' '}
          section of this Privacy Policy.
        </Text>

        {/* Collapsible Public Info Table */}
        <Table.Root variant="outline" border="1px solid" borderColor="gray.200" mt={4}>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader bg="blue.50" textAlign="center" p={2}>
                <Button
                  variant="ghost"
                  onClick={onPublicInfoToggle}
                  size="sm"
                  fontWeight="bold"
                >
                  {isPublicInfoOpen ? 'Collapse' : 'Expand'}
                </Button>
                <Box bg="blue.100" p={2} fontWeight="bold" textAlign="center">
                  Publicly Visible Information
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
                      Unless this Policy says otherwise, you should assume that information that you actively contribute to the Wikimedia Sites, including Personal Information, is publicly visible and can be found by search engines. Like most things on the Internet, anything you share may be copied and redistributed throughout the Internet by other people. Please do not contribute any information that you are uncomfortable making permanently public, like revealing your real name or location in your contributions.
                    </Text>
                    <Text mt={2}>
                      You should be aware that specific data made public by you or aggregated data that is made public by us can be used by anyone for analysis and to infer further information, such as which country a user is from, political affiliation and gender.
                    </Text>
                  </Box>
                </Collapsible.Root>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Root>

        <Flex justify="flex-end" mt={4} display={{ base: 'none', md: 'flex' }}>
          <Link href="#top" color="blue.500" mr={2}>
            Back to top
          </Link>
          <Link href="/wiki/Privacy_policy#top">
            <Icon as={FaArrowUp} w={3} h={3} />
          </Link>
        </Flex>

        {/* Account Information Section */}
        <Box id="your-account-info" />
        <Box className="mw-heading mw-heading4" mt={6}>
          <Heading as="h4" id="Account_Information_&_Registration" size="sm">
            Account Information & Registration
          </Heading>
        </Box>

        <Text mt={2}>
          Want to create an account? Great! Do not want to create an account? No problem!
        </Text>
        <Text mt={2}>
          <Box as="span" id="notrequired" />
          You are not required to create an account to read or contribute to a Wikimedia Site, except under{' '}
          <Link href="/wiki/Special:MyLanguage/Policy:Privacy_policy/Frequently_asked_questions#needaccount" color="blue.500">
            rare circumstances
          </Link>. However, if you contribute without signing in, your contribution will be publicly attributed to the{' '}
          <Link href="/wiki/Special:MyLanguage/Policy:Privacy_policy/Glossary_of_key_terms#ip-address" color="blue.500">
            IP address
          </Link>{' '}
          associated with your device.
        </Text>
        <Text mt={2}>
          <Box as="span" id="noaccount" />
          If you want to create a{' '}
          <Link href="/wiki/Special:MyLanguage/Policy:Privacy_policy/Frequently_asked_questions#standardaccount" color="blue.500">
            standard account
          </Link>, in most cases we require only a username and a password. However, if you choose not to provide an email address, we cannot help you recover your password.
        </Text>

        {/* Collapsible Username Table */}
        <Table.Root variant="outline" border="1px solid" borderColor="gray.200" mt={4}>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader bg="blue.50" textAlign="center" p={2}>
                <Button
                  variant="ghost"
                  onClick={onUsernameToggle}
                //   _icon={<Box as="span">{isUsernameOpen ? '−' : '+'}</Box>}

                  size="sm"
                  fontWeight="bold"
                >
                  {isUsernameOpen ? 'Collapse' : 'Expand'}
                </Button>
                <Box bg="blue.100" p={2} fontWeight="bold" textAlign="center">
                  More on Usernames
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
                      Your username will be publicly visible, so please be careful about revealing your real name or other Personal Information in your username. Your password is only used to verify that the account is yours. Your{' '}
                      <Link href="/wiki/Special:MyLanguage/Policy:Privacy_policy/Glossary_of_key_terms#ip-address" color="blue.500">
                        IP address
                      </Link>{' '}
                      is also automatically submitted to us, and we record it temporarily. This is to protect Wikimedia users and project content; in the event of abuse, IP addresses may be associated with usernames as part of an investigation. No other Personal Information is required: no name, no email address, no date of birth, and no credit card information.
                    </Text>
                    <Text mt={2}>
                      Once created, user accounts cannot be removed entirely (although you can usually hide the information on your user page if you choose to). This is because your public contributions must be associated with their author (you!). In some circumstances, the Wikimedia communities{' '}
                      <Link href="https://meta.wikimedia.org/wiki/Special:MyLanguage/Right_to_vanish" color="blue.500">
                        can assist
                      </Link>{' '}
                      users with removing additional information related to their account from the projects.
                    </Text>
                  </Box>
                </Collapsible.Root>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Root>

        <Text mt={4}>
          To gain a better understanding of the demographics of our users, to localize our services and to learn how we can improve our services, we may ask you for more demographic information, such as gender or age, about yourself. We will tell you if such information is intended to be public or private, so that you can make an informed decision about whether you want to provide us with that information. Providing such information is always completely optional. If you do not want to, you do not have to—it is as simple as that.
        </Text>

        <Flex justify="flex-end" mt={4} display={{ base: 'none', md: 'flex' }}>
          <Link href="#top" color="blue.500" mr={2}>
            Back to top
          </Link>
          <Link href="/wiki/Privacy_policy#top">
            <Icon as={FaArrowUp} w={3} h={3} />
          </Link>
        </Flex>

        {/* Location Information Section */}
        <Box id="location-info" />
        <Box className="mw-heading mw-heading4" mt={6}>
          <Heading as="h4" id="Location_Information" size="sm">
            Location Information
          </Heading>
        </Box>

        <Box id="GPS" />
        <Box className="mw-heading mw-heading5" mt={4}>
          <Heading as="h5" id="GPS_&_Other_Location_Technologies" size="xs">
            GPS & Other Location Technologies
          </Heading>
        </Box>

        <Text mt={2}>
          If you consent, we can use{' '}
          <Link href="/wiki/Special:MyLanguage/Policy:Privacy_policy/Glossary_of_key_terms#gps" color="blue.500">
            GPS
          </Link>{' '}
          (and other technologies commonly used to determine location) to show you more relevant content. We keep information obtained by these technologies confidential, except as provided in this Policy. You can learn more by checking out the list of examples of how we use these technologies in our{' '}
          <Link href="/wiki/Special:MyLanguage/Policy:Privacy_policy/Frequently_asked_questions#gpsexamplesFAQ" color="blue.500">
            FAQ
          </Link>.
        </Text>

        <Flex justify="flex-end" mt={4} display={{ base: 'none', md: 'flex' }}>
          <Link href="#top" color="blue.500" mr={2}>
            Back to top
          </Link>
          <Link href="/wiki/Privacy_policy#top">
            <Icon as={FaArrowUp} w={3} h={3} />
          </Link>
        </Flex>

        {/* Metadata Section */}
        <Box id="metadata" />
        <Box className="mw-heading mw-heading5" mt={4}>
          <Heading as="h5" id="Metadata" size="xs">
            Metadata
          </Heading>
        </Box>

        <Text mt={2}>
          Sometimes, we automatically receive location data from your device. For example, if you want to upload a photo on the Wikimedia Commons mobile app, we may receive{' '}
          <Link href="/wiki/Special:MyLanguage/Policy:Privacy_policy/Glossary_of_key_terms#metadata" color="blue.500">
            metadata
          </Link>, such as the place and time you took the photo, automatically from your device. Please be aware that, unlike location information collected using GPS signals described above, the default setting on your mobile device typically includes the metadata in your photo or video upload to the Wikimedia Sites. If you do not want metadata sent to us and made public at the time of your upload, please change your settings on your device.
        </Text>

        <Flex justify="flex-end" mt={4} display={{ base: 'none', md: 'flex' }}>
          <Link href="#top" color="blue.500" mr={2}>
            Back to top
          </Link>
          <Link href="/wiki/Privacy_policy#top">
            <Icon as={FaArrowUp} w={3} h={3} />
          </Link>
        </Flex>

        {/* IP Addresses Section */}
        <Box id="ipinfouse" />
        <Box className="mw-heading mw-heading5" mt={4}>
          <Heading as="h5" id="IP_Addresses" size="xs">
            IP Addresses
          </Heading>
        </Box>

        <Text mt={2}>
          Finally, when you visit any Wikimedia Site, we automatically receive the{' '}
          <Link href="/wiki/Special:MyLanguage/Policy:Privacy_policy/Glossary_of_key_terms#ip-address" color="blue.500">
            IP address
          </Link>{' '}
          of the device (or your{' '}
          <Link href="/wiki/Special:MyLanguage/Policy:Privacy_policy/Glossary_of_key_terms#proxy-servers" color="blue.500">
            proxy server
          </Link>) you are using to access the Internet, which could be used to{' '}
          <Link href="/wiki/Special:MyLanguage/Policy:Privacy_policy/Frequently_asked_questions#inferlocationFAQ" color="blue.500">
            infer your geographical location
          </Link>.
        </Text>

        <Flex justify="flex-end" mt={4} display={{ base: 'none', md: 'flex' }}>
          <Link href="#top" color="blue.500" mr={2}>
            Back to top
          </Link>
          <Link href="/wiki/Privacy_policy#top">
            <Icon as={FaArrowUp} w={3} h={3} />
          </Link>
        </Flex>
      </Box>
    </Box>
  );
};


