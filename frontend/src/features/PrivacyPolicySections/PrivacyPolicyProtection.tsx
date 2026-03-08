import {
  Box,
  Heading,
  Text,
  Link,
  Image,
  VStack,
  Flex,
  useBreakpointValue,
  List,
  ListItem
} from "@chakra-ui/react";

export const PrivacyPolicyProtection = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  const sections = [
    {
      id: "protection-means",
      title: "How Do We Protect Your Information?",
      level: 3,
      content: (
        <>
          <Text mb={4}>
            At Qamar Labs, we take the protection of your information seriously. 
            Our commitment to honesty means being transparent about both our 
            protections and their limitations.
          </Text>
          
          <Text mb={4} fontWeight="bold">
            What we do to protect you:
          </Text>
          
          <List.Root listStyle="disc" pl={6} mb={4}>
            <ListItem>We use industry-standard encryption to protect data transmitted between our app and our servers</ListItem>
            <ListItem>We implement access controls and security procedures for our systems</ListItem>
            <ListItem>We regularly review our security practices</ListItem>
            <ListItem>We minimize data collection, which inherently minimizes risk</ListItem>
            <ListItem>We keep sensitive information (like support emails) in secured, access-restricted systems</ListItem>
          </List.Root>
          
          <Text mb={4}>
            <Box as="span" fontWeight="bold">Important to know:</Box> No method of electronic 
            transmission or storage is 100% secure. While we strive to protect your 
            information, we cannot guarantee absolute security. What we can guarantee 
            is our commitment to transparency if any security issue arises.
          </Text>
          
          <Box bg="yellow.50" p={4} borderRadius="md" mb={4}>
            <Text fontWeight="bold" mb={2}>🔒 Security Best Practices for You:</Text>
            <List.Root listStyle="disc" pl={6}>
              <ListItem>Keep your device's operating system and apps updated</ListItem>
              <ListItem>Use a secure lock screen on your device</ListItem>
              <ListItem>Be cautious when using public Wi-Fi networks</ListItem>
              <ListItem>Download apps only from official app stores (Google Play, Apple App Store)</ListItem>
            </List.Root>
          </Box>
          
          <Text mb={4}>
            <Box as="span" fontWeight="bold">Never share sensitive information via email.</Box>{" "}
            We will never ask for your passwords or personal information through 
            email. If you receive any suspicious communication claiming to be from 
            Qamar Labs, please contact us immediately.
          </Text>
        </>
      ),
    },
    {
      id: "protection-duration",
      title: "How Long Do We Keep Your Data?",
      level: 3,
      content: (
        <>
          <Text mb={4}>
            We follow the principle of data minimization: we keep information only 
            for as long as necessary to fulfill the purposes described in this 
            Policy, unless a longer retention period is required by law.
          </Text>
          
          <Text mb={2} fontWeight="bold">Our retention practices:</Text>
          
          <List.Root listStyle="disc" pl={6} mb={4}>
            <ListItem>
              <Box as="span" fontWeight="bold">Anonymous usage data:</Box> Aggregated and retained for up to 90 days for analysis purposes
            </ListItem>
            <ListItem>
              <Box as="span" fontWeight="bold">Crash logs:</Box> Retained for up to 30 days to diagnose and fix issues
            </ListItem>
            <ListItem>
              <Box as="span" fontWeight="bold">IP addresses:</Box> Temporarily stored in server logs, typically deleted within 90 days
            </ListItem>
            <ListItem>
              <Box as="span" fontWeight="bold">Support correspondence:</Box> Retained as long as needed to address your inquiry and for legitimate business purposes (usually up to 2 years)
            </ListItem>
            <ListItem>
              <Box as="span" fontWeight="bold">Local device data:</Box> Stored on your device until you choose to clear it—we don't have access to it
            </ListItem>
          </List.Root>
          
          <Text mb={4}>
            <Box as="span" fontWeight="bold">Note:</Box> Since our mobile encyclopedia is read-only 
            and does not require accounts or user contributions, there is no permanent 
            public record of your activity. Your reading history stays on your device 
            and is not stored on our servers.
          </Text>
          
          <Text mb={4}>
            For more details about our data retention practices, please{" "}
            <Link href="#contact-us" color="blue.500">
              contact us
            </Link>
            .
          </Text>
        </>
      ),
    },
    {
      id: "your_rights",
      title: "Your Rights & Control Over Your Information",
      level: 3,
      content: (
        <>
          <Text mb={4}>
            We believe you should have control over your information. Depending on 
            your location, you may have certain rights regarding your personal data.
          </Text>
          
          <Text mb={2} fontWeight="bold">Your rights may include:</Text>
          
          <List.Root listStyle="disc" pl={6} mb={4}>
            <ListItem>
              <Box as="span" fontWeight="bold">Right to know:</Box> What information we collect and how we use it (explained in this Policy)
            </ListItem>
            <ListItem>
              <Box as="span" fontWeight="bold">Right to access:</Box> Request a copy of the personal information we hold about you
            </ListItem>
            <ListItem>
              <Box as="span" fontWeight="bold">Right to deletion:</Box> Request that we delete your personal information
            </ListItem>
            <ListItem>
              <Box as="span" fontWeight="bold">Right to correction:</Box> Request that we correct inaccurate information
            </ListItem>
            <ListItem>
              <Box as="span" fontWeight="bold">Right to restriction:</Box> Object to or restrict our processing of your data
            </ListItem>
            <ListItem>
              <Box as="span" fontWeight="bold">Right to data portability:</Box> Receive your data in a structured, commonly used format
            </ListItem>
          </List.Root>
          
          <Text mb={4}>
            <Box as="span" fontWeight="bold">How to exercise your rights:</Box> To make a request 
            regarding your personal information, please contact us at{" "}
            <Link href="mailto:privacy@qamarlabs.com" color="blue.500">
              privacy@qamarlabs.com
            </Link>
            . We will respond to your request consistent with applicable law and 
            typically within 30 days.
          </Text>
          
          <Box bg="green.50" p={4} borderRadius="md" mb={4}>
            <Text fontWeight="bold" mb={2}>✅ Rights You Can Exercise Directly:</Text>
            <List.Root listStyle="disc" pl={6}>
              <ListItem>
                <Box as="span" fontWeight="bold">Clear local data:</Box> You can clear all locally stored data (bookmarks, preferences, history) through your device settings at any time
              </ListItem>
              <ListItem>
                <Box as="span" fontWeight="bold">Opt out of analytics:</Box> If our app includes analytics, you can opt out through your device settings (check your device's privacy settings)
              </ListItem>
              <ListItem>
                <Box as="span" fontWeight="bold">Uninstall:</Box> You can simply uninstall the app at any time, which removes all app data from your device
              </ListItem>
            </List.Root>
          </Box>
          
          <Text mb={4}>
            <Box as="span" fontWeight="bold">Important note:</Box> Because our app does not require 
            accounts and collects minimal personal information, many of these rights 
            may not apply simply because we don't have the data to act upon. For 
            example, if you haven't contacted us for support, we likely have no 
            personal information about you at all.
          </Text>
          
          <Text mb={4}>
            We will not discriminate against you for exercising any of your privacy 
            rights. Our service will remain fully functional regardless of your choices.
          </Text>
        </>
      ),
    },
  ];

  const renderHeading = (level: number, title: string, id: string) => {
    switch (level) {
      case 2:
        return (
          <Heading
            className='mw-text'
            as="h2"
            id={id}
            fontSize="xl"
            mb={4}
            display="flex"
            alignItems="center"
          >
            {!isMobile && (
              <Image
                src="/flaticon-icons/security.svg"
                alt="Protection icon"
                width="60px"
                height="60px"
                mr={2}
              />
            )}
            Data Protection & Your Rights
          </Heading>
        );
      case 3:
        return (
          <Heading className='mw-text' as="h3" id={id} fontSize="lg" mb={4}>
            {title}
          </Heading>
        );
      default:
        return (
          <Heading className='mw-text' as="h4" id={id} fontSize="md" mb={4}>
            {title}
          </Heading>
        );
    }
  };

  // Summary section
  const summarySection = (
    <Box mt={8} p={5} bg="blue.50" borderRadius="md" borderLeft="4px solid" borderLeftColor="blue.500">
      <Heading className='mw-text' as="h4" size="sm" mb={3}>
        📋 Summary: Protection & Your Rights
      </Heading>
      
      <List.Root spaceY={2}>
        <ListItem>
          <Box as="span" fontWeight="bold">✓ Industry-standard security measures</Box> — encryption, access controls, regular reviews
        </ListItem>
        <ListItem>
          <Box as="span" fontWeight="bold">✓ Minimal data means minimal risk</Box> — we collect only what's necessary
        </ListItem>
        <ListItem>
          <Box as="span" fontWeight="bold">✓ Data retained only as long as needed</Box> — typically 30-90 days
        </ListItem>
        <ListItem>
          <Box as="span" fontWeight="bold">✓ You have rights</Box> — access, deletion, correction, and more
        </ListItem>
        <ListItem>
          <Box as="span" fontWeight="bold">✓ Direct control</Box> — clear local data anytime, opt out of analytics, uninstall
        </ListItem>
        <ListItem>
          <Box as="span" fontWeight="bold">✓ No permanent public record</Box> — your reading activity stays on your device
        </ListItem>
      </List.Root>
      
      <Text mt={4} fontStyle="italic">
        At Qamar Labs, protecting your privacy isn't just about compliance—it's 
        about honoring our commitment to honesty and serving the Ummah with 
        quality applications you can trust.
      </Text>
    </Box>
  );

  return (
    <Box>
      <VStack className='mw-text' align="start" spaceY={4} mx="10%" textAlign="left">
        <Box
          float={{ base: "none", md: "right" }}
          width={{ base: "100%", md: "100%" }}
          pl={{ base: 0, md: 8 }}
        >
          {renderHeading(2, "Protection", "Protection")}

          {sections.map((section, index) => (
            <Box key={index} mb={8}>
              <span id={section.id} />
              {renderHeading(
                section.level,
                section.title,
                section.title.replace(/\s+/g, "_"),
              )}
              {section.content}

              {!isMobile && section.content && (
                <Flex justify="flex-end" mt={4}>
                  <Link href="#top" color="blue.500" mr={2}>
                    Back to top
                  </Link>
                  <Link href="#top" title="Back to top">
                    <Image
                      src="//upload.wikimedia.org/wikipedia/commons/c/ce/WWC_arrow_up.png"
                      alt="Up arrow"
                      width="11px"
                      height="11px"
                    />
                  </Link>
                </Flex>
              )}
            </Box>
          ))}
          
          {/* Add summary section */}
          {summarySection}
          
          {!isMobile && (
            <Flex justify="flex-end" mt={4}>
              <Link href="#top" color="blue.500" mr={2}>
                Back to top
              </Link>
              <Link href="#top" title="Back to top">
                <Image
                  src="//upload.wikimedia.org/wikipedia/commons/c/ce/WWC_arrow_up.png"
                  alt="Up arrow"
                  width="11px"
                  height="11px"
                />
              </Link>
            </Flex>
          )}
        </Box>
        <Box clear="both" />
      </VStack>
    </Box>
  );
};