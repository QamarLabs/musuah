import {
  Box,
  Heading,
  Text,
  Link,
  ListItem,
  Image,
  Flex,
  VStack,
  useBreakpointValue,
  List,
} from "@chakra-ui/react";

export const PrivacyPolicySharing = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  const sections = [
    {
      id: "when-we-may-share",
      title: "When May We Share Your Information?",
      level: 3,
      content: (
        <Text mb={4}>
          At Qamar Labs, our commitment to honesty means we are transparent about 
          the limited circumstances where we might share information. The good news 
          is that since we collect very little personal information, there is very 
          little to share. Here are the rare situations where sharing could occur:
        </Text>
      ),
    },
    {
      id: "share-with-permission",
      title: "With Your Explicit Permission",
      level: 4,
      content: (
        <Text mb={4}>
          We will only share your personal information for a specific purpose if 
          you explicitly agree to it. For example, if you contact us for support 
          and we need to involve a third-party service to help resolve your issue, 
          we would ask for your permission first. We believe in quality over quantity—including 
          when it comes to permissions. You'll always know what you're agreeing to.
        </Text>
      ),
    },
    {
      id: "share-legal-reasons",
      title: "For Legal Reasons",
      level: 4,
      content: (
        <>
          <Text mb={4}>
            We will access, use, or disclose your Personal Information only if we 
            reasonably believe it is necessary to satisfy a valid and legally 
            enforceable warrant, subpoena, court order, law, or regulation. 
            However, if we believe a request for disclosure is legally invalid or 
            an abuse of the legal system, we will try our best to fight it.
          </Text>
          <Text mb={4}>
            <Box as="span" fontWeight="bold">Our commitment to you:</Box> If we receive a legal 
            demand for your information, we will notify you via email (if you have 
            provided one) at least 7 days before disclosure, when legally permitted 
            to do so. This gives you an opportunity to challenge the request if 
            you wish.
          </Text>
          <Text mb={4}>
            Nothing in this Privacy Policy limits any legal objections or defenses 
            you may have to a third party's request to disclose your information. 
            We recommend seeking legal counsel if such a situation arises.
          </Text>
        </>
      ),
    },
    {
      id: "share-org-transfer",
      title: "If Qamar Labs Is Transferred (Extremely Unlikely!)",
      level: 4,
      content: (
        <Text mb={4}>
          In the highly unlikely event that ownership of Qamar Labs changes, or we 
          go through a reorganization (such as a merger or acquisition), we will 
          continue to keep your Personal Information confidential, except as 
          provided in this Policy. We will provide notice to you through our app 
          and website at least 30 days before any Personal Information is transferred 
          or becomes subject to a different privacy policy. We will ensure that the 
          new entity honors this Privacy Policy or give you the option to delete 
          your information.
        </Text>
      ),
    },
    {
      id: "share-to-protect-people",
      title: "To Protect You, Ourselves & Others",
      level: 4,
      content: (
        <>
          <Text mb={4}>
            We may access and share Personal Information if we reasonably believe 
            it is necessary to:
          </Text>
          <List.Root listStyle="disc" pl={6} mb={4}>
            <ListItem>Enforce or investigate potential violations of our Terms of Use</ListItem>
            <ListItem>Detect, prevent, or address fraud, security, or technical issues</ListItem>
            <ListItem>Protect against harm to the rights, property, or safety of Qamar Labs, our users, or the public</ListItem>
            <ListItem>Respond to reports of abuse or harassment</ListItem>
          </List.Root>
          <Text mb={4}>
            We hope this never comes up, but we may disclose your Personal Information 
            if we believe it is reasonably necessary to prevent imminent and serious 
            bodily harm or death to a person.
          </Text>
          <Text mb={4}>
            <Box as="span" fontWeight="bold">Note:</Box> Since our mobile encyclopedia does not 
            require accounts or user contributions, these situations are extremely 
            rare. We simply don't have the type of user-generated content that 
            typically leads to these scenarios.
          </Text>
        </>
      ),
    },
    {
      id: "share-to-our-sp",
      title: "To Our Service Providers",
      level: 4,
      content: (
        <>
          <Text mb={4}>
            We use third-party service providers to help run and improve our mobile 
            encyclopedia. These may include:
          </Text>
          <List.Root listStyle="disc" pl={6} mb={4}>
            <ListItem>Cloud hosting providers (to serve app content)</ListItem>
            <ListItem>Analytics services (to understand usage patterns anonymously)</ListItem>
            <ListItem>Crash reporting tools (to fix bugs and improve stability)</ListItem>
            <ListItem>Customer support tools (if you contact us for help)</ListItem>
          </List.Root>
          <Text mb={4}>
            We only give these providers access to the information necessary to 
            perform their services. We put confidentiality agreements in place to 
            ensure they treat your information consistently with this Policy and 
            no less protectively than we do.
          </Text>
          <Text mb={4}>
            <Box as="span" fontWeight="bold">Importantly:</Box> Our service providers receive 
            only anonymized or aggregated data whenever possible. For example, 
            analytics providers see that "1000 users read article X" but not 
            "User 123 read article X."
          </Text>
          <Text mb={4}>
            If you are using our mobile app, your IP address may be shared with 
            our hosting provider to deliver content to your device. This is 
            standard for any internet service.
          </Text>
          <Box bg="yellow.50" p={3} borderRadius="md" mb={4}>
            <Text fontWeight="bold" mb={2}>📋 Current Service Providers:</Text>
            <Text fontSize="sm">
              We will maintain a list of our current service providers and links 
              to their privacy policies on our website. Please check there for 
              the most up-to-date information.
            </Text>
          </Box>
        </>
      ),
    },
    {
      id: "share-to-experiment",
      title: "For Research & Improvement",
      level: 4,
      content: (
        <>
          <Text mb={4}>
            As part of our mission to serve the Ummah with quality knowledge, we 
            occasionally collaborate with researchers to understand how our app 
            is used and how we can improve it.
          </Text>
          <Text mb={4}>
            <Box as="span" fontWeight="bold">What we share:</Box> We share only non-personal, 
            aggregated information with researchers—for example, "articles about 
            Islamic history are read 50% more on weekends" or "users in certain 
            regions prefer longer articles."
          </Text>
          <Text mb={4}>
            <Box as="span" fontWeight="bold">Our safeguards:</Box> When we give researchers 
            access to any data, we:
          </Text>
          <List.Root listStyle="disc" pl={6} mb={4}>
            <ListItem>Require them to sign confidentiality agreements</ListItem>
            <ListItem>Ensure data is anonymized and cannot be traced to individuals</ListItem>
            <ListItem>Prohibit them from attempting to re-identify users</ListItem>
            <ListItem>Review their research methodology and intended use</ListItem>
          </List.Root>
          <Text mb={4}>
            These collaborations help us make data-driven decisions about how to 
            better serve you, always respecting your privacy.
          </Text>
        </>
      ),
    },
    {
      id: "share-because-public",
      title: "Information You Make Public",
      level: 4,
      content: (
        <Text mb={4}>
          <Box as="span" fontWeight="bold">Important:</Box> Our mobile encyclopedia is designed 
          for reading, not for posting content. You cannot make public posts, 
          comments, or contributions within the app itself. Therefore, there is 
          no scenario where you would accidentally make your personal information 
          public through our app.
        </Text>
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
                src="/flaticon-icons/sharing.svg"
                alt="Sharing icon"
                width="60px"
                height="60px"
                mr={2}
              />
            )}
            {title}
          </Heading>
        );
      case 3:
        return (
          <Heading className='mw-text' as="h3" id={id} fontSize="lg" mb={4}>
            {title}
          </Heading>
        );
      case 4:
        return (
          <Heading className='mw-text' as="h4" id={id} fontSize="md" mb={4}>
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

  // Summary section to add at the end
  const summarySection = (
    <Box mt={8} p={5} bg="blue.50" borderRadius="md" borderLeft="4px solid" borderLeftColor="blue.500">
      <Heading className='mw-text' as="h4" size="sm" mb={3}>
        📋 Summary: How We Share Information
      </Heading>
      
      <List.Root spaceY={2}>
        <ListItem>
          <Box as="span" fontWeight="bold">✓ We collect very little, so we share very little</Box>
        </ListItem>
        <ListItem>
          <Box as="span" fontWeight="bold">✓ We never sell your information</Box> — period
        </ListItem>
        <ListItem>
          <Box as="span" fontWeight="bold">✓ We share only with your permission</Box> or for legal reasons
        </ListItem>
        <ListItem>
          <Box as="span" fontWeight="bold">✓ Service providers get only what's necessary</Box> and are bound by confidentiality
        </ListItem>
        <ListItem>
          <Box as="span" fontWeight="bold">✓ Research partners receive only anonymized, aggregated data</Box>
        </ListItem>
        <ListItem>
          <Box as="span" fontWeight="bold">✓ No public posting means no accidental sharing</Box>
        </ListItem>
      </List.Root>
      
      <Text mt={4} fontStyle="italic">
        At Qamar Labs, we're building honest apps for the Ummah. Our sharing 
        practices reflect our commitment to quality over quantity—and privacy first.
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
          className='mw-text'
        >
          {renderHeading(2, "Information Sharing", "Sharing")}

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