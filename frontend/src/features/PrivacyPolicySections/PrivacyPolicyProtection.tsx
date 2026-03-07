import {
  Box,
  Heading,
  Text,
  Link,
  Image,
  VStack,
  Flex,
  useBreakpointValue,
} from "@chakra-ui/react";

export const PrivacyPolicyProtection = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  const sections = [
    {
      id: "protection-means",
      title: "How Do We Protect Your Personal Information?",
      level: 3,
      content: (
        <>
          <Text mb={4}>
            We strive to protect your Personal Information from unauthorized
            access, use, or disclosure. We use a variety of physical and
            technical measures, policies, and procedures (such as access control
            procedures, network firewalls, and physical security) designed to
            protect our systems and your Personal Information. Unfortunately,
            there is no such thing as completely secure data transmission or
            storage, so we cannot guarantee that our security will not be
            breached (by technical measures or through violation of our policies
            and procedures).
          </Text>
          <Text mb={4}>
            We will never ask for your password by email (but may send you a
            temporary password via email if you have requested a password
            reset). If you ever receive an email that requests your password,{" "}
            <Text as="u">
              please let us know by sending it to privacy@wikimedia.org, so we
              can investigate the source of the email
            </Text>
            .
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
            Once we receive Personal Information from you, we keep it for the
            shortest possible time that is consistent with the maintenance,
            understanding, and improvement of the Wikimedia Sites, and our
            obligations under applicable law. In most instances, Personal
            Information is deleted, aggregated or de-identified after 90 days.
            Non-Personal Information may be retained indefinitely as
            appropriate. (Check out the list of examples in our{" "}
            <Link
              href="/wiki/Special:MyLanguage/Policy:Privacy_policy/Frequently_asked_questions#datatimeexamplesFAQ"
              color="blue.500"
            >
              FAQ
            </Link>
            .)
          </Text>
          <Text mb={4}>
            <span id="rememberIPindef" />
            Please remember that when you make a contribution to any Wikimedia
            Site, the page history will show when your contribution was made,
            your username (if you are signed in), or your{" "}
            <Link
              href="/wiki/Special:MyLanguage/Policy:Privacy_policy/Glossary_of_key_terms#ip-address"
              color="blue.500"
            >
              IP address
            </Link>{" "}
            (if you edit while not logged in). The transparency of the projects'
            contribution and revision histories is critical to their efficacy
            and trustworthiness. To learn more about our data retention
            practices, see our{" "}
            <Link
              href="/wiki/Special:MyLanguage/Legal:Data_retention_guidelines"
              color="blue.500"
            >
              data retention guidelines
            </Link>
            .
          </Text>
        </>
      ),
    },
    {
      id: "your_rights",
      title: "Your rights",
      level: 3,
      content: (
        <>
          <Text mb={4}>
            For information about how you may request removal of your Personal
            Information, or other rights you may have with respect to your
            Personal Information, see our{" "}
            <Link href="/wiki/Privacy_policy/FAQ#anonymize" color="blue.500">
              FAQ
            </Link>
            . If you would like to request to access, update or restrict/object
            to the processing of Personal Information, or receive a copy of your
            Personal Information for purposes of transmitting it to another
            organization, you may{" "}
            <Link href="/wiki/Privacy_policy#contact-us" color="blue.500">
              Contact Us
            </Link>
            . We will respond to your request consistent with applicable law.
          </Text>
          <Text mb={4}>
            Please note also that you may be able to exercise some of these
            rights without our intervention. For example, if you are a
            registered user, you can access and update some Personal Information
            in your Preferences, as well as download your user account data. You
            may also manage what kinds of notifications you receive and how
            often you receive them by going to your Notifications Preferences.
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
            as="h2"
            id={id}
            fontSize="xl"
            mb={4}
            display="flex"
            alignItems="center"
          >
            {!isMobile && (
              <Image
                src="//upload.wikimedia.org/wikipedia/commons/thumb/b/b0/WMF_safe.png/60px-WMF_safe.png"
                alt="Protection icon"
                width="60px"
                height="60px"
                mr={2}
                srcSet="//upload.wikimedia.org/wikipedia/commons/thumb/b/b0/WMF_safe.png/90px-WMF_safe.png 1.5x, //upload.wikimedia.org/wikipedia/commons/b/b0/WMF_safe.png 2x"
              />
            )}
            {title}
          </Heading>
        );
      case 3:
        return (
          <Heading as="h3" id={id} fontSize="lg" mb={4}>
            {title}
          </Heading>
        );
      default:
        return (
          <Heading as="h4" id={id} fontSize="md" mb={4}>
            {title}
          </Heading>
        );
    }
  };

  return (
    <Box>
      <VStack align="start" spaceY={4} mx="10%" textAlign="left">
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
                  <Link href="/wiki/Privacy_policy#top" title="Privacy policy">
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
        </Box>
        <Box clear="both" />
      </VStack>
    </Box>
  );
};
