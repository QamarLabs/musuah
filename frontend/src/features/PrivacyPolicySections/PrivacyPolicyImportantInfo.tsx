import {
  Box,
  Heading,
  Text,
  Link,
  Image,
  Flex,
  VStack,
  useBreakpointValue,
  List,
  ListItem
} from "@chakra-ui/react";

export function PrivacyPolicyImportantInfo() {
  const isMobile = useBreakpointValue({ base: true, md: false });

  const sections = [
    {
      id: "",
      title: "",
      level: 0,
      content: (
        <Text fontWeight="bold" mb={4} fontSize="lg" color="blue.600">
          At Qamar Labs, we believe in honesty and transparency. By using our mobile 
          encyclopedia, you trust us with your information. This Privacy Policy is 
          designed to help you understand what we collect, why we collect it, and 
          what you can do to protect your privacy.
        </Text>
      ),
    },
    {
      id: "where-is-qamarlabs",
      title: "Where Is Qamar Labs Located?",
      level: 3,
      content: (
        <>
          <Text className='mw-text' mb={4}>
            Qamar Labs is a developer committed to building quality applications for 
            the Ummah. We are headquartered in [Insert Country/City]. Our servers and 
            infrastructure may be located in various countries, including the United 
            States and other regions.
          </Text>
          <Text className='mw-text' mb={4}>
            By using our mobile encyclopedia, you understand that your information 
            may be collected, transferred, stored, and processed in countries where 
            our servers and service providers are located. These countries may have 
            data protection laws that differ from those in your country of residence. 
            We take steps to ensure that your information receives an adequate level 
            of protection regardless of where it is processed.
          </Text>
          <Box className='mw-text' bg="yellow.50" p={4} borderRadius="md" mb={4}>
            <Text fontWeight="bold" mb={2}>🌍 International Users:</Text>
            <Text>
              If you are accessing our app from outside the US, please be 
              aware that your information may be transferred to and maintained on 
              servers located outside of your country. By using our app, you consent 
              to this transfer and processing of your information.
            </Text>
          </Box>
        </>
      ),
    },
    {
      id: "DNT",
      title: "Do Not Track (DNT) Signals",
      level: 3,
      content: (
        <>
          <Text className='mw-text' mb={4}>
            We respect your privacy choices. Currently, our app does not respond to 
            "Do Not Track" signals from web browsers because:
          </Text>
          <List.Root className='mw-text' listStyle="disc" pl={6} mb={4}>
            <ListItem>We do not track you across third-party websites</ListItem>
            <ListItem>We do not use your information for marketing or advertising purposes</ListItem>
            <ListItem>We already protect all users in accordance with this Privacy Policy regardless of DNT signals</ListItem>
          </List.Root>
          <Text className='mw-text' mb={4}>
            In short, because we don't engage in the types of tracking that DNT is 
            designed to prevent, there's no behavior to change. We treat all users 
            with the same high standard of privacy protection.
          </Text>
          <Text className='mw-text' mb={4}>
            If you have questions about how we handle tracking technologies, please 
            review the "Local Storage & Data Collection Technologies" section of this 
            Privacy Policy.
          </Text>
        </>
      ),
    },
    {
      id: "changes",
      title: "Changes to This Privacy Policy",
      level: 3,
      content: (
        <>
          <Text className='mw-text' mb={4}>
            As we grow and improve our app, and as laws and technologies evolve, we 
            may need to update this Privacy Policy. Our commitment to honesty means 
            we will always notify you of significant changes.
          </Text>
          
          <Text className='mw-text' mb={2} fontWeight="bold">How we handle changes:</Text>
          
          <List.Root className='mw-text' listStyle="disc" pl={6} mb={4}>
            <ListItem mb={3}>
              <Box as="span" fontWeight="bold">Major changes:</Box> For significant updates 
              that affect your rights or how we handle your information, we will:
              <List.Root listStyle="circle" pl={6} mt={2}>
                <ListItem>Update the "Effective Date" at the top of this policy</ListItem>
                <ListItem>Provide notice within the app (such as a pop-up or notification)</ListItem>
                <ListItem>Give you an opportunity to review the changes before they take effect</ListItem>
                <ListItem>Offer a 30-day period for you to ask questions or provide feedback</ListItem>
              </List.Root>
            </ListItem>
            <ListItem>
              <Box as="span" fontWeight="bold">Minor changes:</Box> For clarifications, 
              grammatical fixes, or administrative updates, we will post the updated 
              policy with a revised effective date. We may provide notice through the 
              app when appropriate.
            </ListItem>
          </List.Root>
          
          <Text mb={4}>
            We encourage you to review this Privacy Policy periodically. Your 
            continued use of our mobile encyclopedia after any updates constitutes 
            your acceptance of the revised policy. If you do not agree with the 
            changes, you should stop using the app and uninstall it.
          </Text>
          
          <Box bg="blue.50" p={3} borderRadius="md" mb={4}>
            <Text fontSize="sm">
              <Box as="span" fontWeight="bold">📅 Current version effective:</Box> TBD
            </Text>
          </Box>
        </>
      ),
    },
    {
      id: "contact-us",
      title: "Contact Us",
      level: 3,
      content: (
        <>
          <Text className='mw-text' mb={4}>
            We're here to help! If you have questions, concerns, or suggestions 
            about this Privacy Policy or how we handle your information, please 
            reach out to us. We aim to respond to all inquiries within 30 days.
          </Text>
          
          <Box className='mw-text' bg="green.50" p={5} borderRadius="md" mb={4}>
            <Heading as="h4" size="sm" mb={3}>
              📧 How to Reach Us
            </Heading>
            
            <Text fontWeight="bold" mb={1}>Email:</Text>
            <Link href="mailto:support@qamarlabsllc.com" color="blue.500" fontSize="lg" mb={3} display="block">
              support@qamarlabsllc.com
            </Link>
            
            
            <Text fontWeight="bold" mb={1}>Website:</Text>
            <Link href="https://www.qamarlabs.com/contact" color="blue.500" display="block" mb={2}>
              https://qamarlabs.netlify.app/contact
            </Link>
          </Box>
          
          <Text mb={4}>
            <Box as="span" fontWeight="bold">For data protection inquiries:</Box> If you are 
            contacting us about a data protection or privacy matter, please include 
            "Privacy Request" in the subject line to help us route your inquiry 
            quickly to the right team.
          </Text>
          
          <Text mb={4}>
            Depending on your jurisdiction, you may have the right to lodge a complaint 
            with a supervisory authority if you believe we have not adequately addressed 
            your concern. We encourage you to contact us first so we can work to 
            resolve any issues directly.
          </Text>
        </>
      ),
    },
    {
      id: "jurisdiction-specific",
      title: "Additional Information for Specific Regions",
      level: 3,
      content: (
        <>
          <Text className='mw-text' mb={3} fontWeight="bold">European Economic Area (EEA) and United Kingdom</Text>
          <Text className='mw-text' mb={3}>
            If you are located in the European Economic Area or the United Kingdom, 
            you have certain rights under the General Data Protection Regulation (GDPR) 
            regarding your personal information.
          </Text>
          <List.Root className='mw-text' listStyle="disc" pl={6} mb={4}>
            <ListItem>Right to access your personal information</ListItem>
            <ListItem>Right to rectify inaccurate information</ListItem>
            <ListItem>Right to erasure ("right to be forgotten")</ListItem>
            <ListItem>Right to restrict processing</ListItem>
            <ListItem>Right to data portability</ListItem>
            <ListItem>Right to object to processing</ListItem>
          </List.Root>
          <Text className='mw-text' mb={4}>
            To exercise these rights, please contact us at{" "}
            <Link href="mailto:privacy@qamarlabs.com" color="blue.500">
              privacy@qamarlabs.com
            </Link>
            . We will respond within the timeframe required by applicable law.
          </Text>
          
          <Text className='mw-text' mb={3} fontWeight="bold">California Residents</Text>
          <Text className='mw-text' mb={4}>
            If you are a California resident, the California Consumer Privacy Act 
            (CCPA) provides you with specific rights regarding your personal 
            information. These include the right to know what personal information 
            we collect, the right to delete personal information, and the right to 
            opt out of the sale of personal information. We do not sell your personal 
            information. To exercise your rights, please contact us at the email 
            address above.
          </Text>
          
          <Box className='mw-text' bg="purple.50" p={4} borderRadius="md" mb={4}>
            <Text fontWeight="bold" mb={2}>🌎 Other Regions:</Text>
            <Text>
              Regardless of where you are located, we are committed to protecting 
              your privacy and handling your information responsibly. If your local 
              laws provide additional privacy rights, we will respect them to the 
              best of our ability.
            </Text>
          </Box>
        </>
      ),
    },
    {
      id: "thank-you",
      title: "Thank You!",
      level: 3,
      content: (
        <>
          <Text className='mw-text' mb={4} fontSize="lg">
            Thank you for taking the time to read our Privacy Policy. We know it's 
            not the most exciting reading, but we appreciate your attention to 
            understanding how we protect your information.
          </Text>
          
          <Text className='mw-text' mb={4}>
            At Qamar Labs, we're honored that you've chosen our mobile encyclopedia 
            as a source of knowledge. We're committed to serving the Ummah with 
            honest, quality applications that respect your privacy.
          </Text>
          
          <Box className='mw-text' bg="yellow.50" p={5} borderRadius="md" mb={4} textAlign="center">
            <Text fontSize="xl" mb={2} fontFamily="serif">
              جزاك الله خير
            </Text>
            <Text fontStyle="italic">
              Jazak Allah Khair — Thank you for your trust.
            </Text>
          </Box>
          
          <Text className='mw-text' fontWeight="bold" fontSize="sm" color="gray.600" mt={6}>
            Please note that in the event of any differences in meaning or 
            interpretation between the original English version of this Privacy 
            Policy and a translation, the original English version takes precedence.
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
                src="/flaticon-icons/importantinfo.svg"
                alt="Important info icon"
                width="60px"
                height="60px"
                mr={2}
              />
            )}
            Important Information
          </Heading>
        );
      case 3:
        return (
          <Heading className='mw-text' as="h3" id={id} fontSize="lg" mb={4}>
            {title}
          </Heading>
        );
      default:
        return null;
    }
  };

  // Summary section
  const summarySection = (
    <Box mt={8} p={5} bg="blue.50" borderRadius="md" borderLeft="4px solid" borderLeftColor="blue.500">
      <Heading className='mw-text' as="h4" size="sm" mb={3}>
        📋 Key Takeaways
      </Heading>
      
      <List.Root className='mw-text' spaceY={2}>
        <ListItem>
          <Box as="span" fontWeight="bold">✓ We're here to help</Box> — Contact us anytime with questions
        </ListItem>
        <ListItem>
          <Box as="span" fontWeight="bold">✓ We'll notify you of changes</Box> — Especially major updates
        </ListItem>
        <ListItem>
          <Box as="span" fontWeight="bold">✓ Your rights matter</Box> — We respect regional privacy laws
        </ListItem>
        <ListItem>
          <Box as="span" fontWeight="bold">✓ We don't track you</Box> — No marketing, no advertising, no selling data
        </ListItem>
        <ListItem>
          <Box as="span" fontWeight="bold">✓ Thank you for your trust</Box> — We're honored to serve you
        </ListItem>
      </List.Root>
    </Box>
  );

  return (
    <Box>
      <VStack align="start" spaceY={4} mx="10%" textAlign="left">
        <Box
          float={{ base: "none", md: "right" }}
          width={{ base: "100%", md: "100%" }}
          pl={{ base: 0, md: 8 }}
        >
          {renderHeading(2, "Important Information", "Important_info")}

          {sections.map((section, index) => (
            <Box key={index} mb={8}>
              <span id={section.id} />
              {section.level > 0 &&
                renderHeading(
                  section.level,
                  section.title,
                  section.title.replace(/\s+/g, "_"),
                )}
              {section.content}

              {!isMobile && section.content && section.level > 0 && (
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
}