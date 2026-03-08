import {
  Box,
  Text,
  Link,
  Table,
  Heading,
  List,
  Flex,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { InfoCollapsibleSection } from "../../common/Accordion";

export const PrivacyPolicyDefinitions = () => {
  return (
    <VStack align="start" spaceY={4} mx="10%" textAlign="left">
      <Box
        float={["none", "none", "right"]}
        width={["100%", "100%", "100%"]}
        pl={[0, 0, 8]}
      >
        <Text mb={4}>
          At Qamar Labs, we believe in honesty and transparency. Because
          everyone (not just lawyers) should be able to easily understand how
          and why their information is collected and used, we use common
          language instead of more formal terms throughout this Policy. To help
          ensure your understanding of some particular key terms, here is a
          table of translations:
        </Text>

        <Table.Root mb={8} className="wikitable">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>When we say...</Table.ColumnHeader>
              <Table.ColumnHeader>...we mean:</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>"Qamar Labs" / "we" / "us" / "our"</Table.Cell>
              <Table.Cell>
                Qamar Labs, the developer committed to building honest, quality
                applications for the Ummah.
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                "[Mobile Encyclopedia Name]" / "our app" / "our services"
              </Table.Cell>
              <Table.Cell>
                Our mobile encyclopedia application, including all content,
                features, and services offered through the app (regardless of
                language). This does not cover third-party websites or services
                linked within our app.
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>"you" / "your" / "user"</Table.Cell>
              <Table.Cell>
                You, the individual using our mobile encyclopedia application,
                regardless of whether you are using it on your own behalf or
                someone else's.
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>"this Policy" / "this Privacy Policy"</Table.Cell>
              <Table.Cell>
                This document, the Qamar Labs Privacy Policy for our mobile
                encyclopedia app.
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>"Personal information"</Table.Cell>
              <Table.Cell>
                Information that could be used to personally identify you. In
                keeping with our commitment to minimal data collection, we
                intentionally collect very little of this. Examples include:
                <List.Root listStyle="none" ml={4} spaceY={1}>
                  <List.Item>
                    (a) your real name, email address (if you contact us), phone
                    number, IP address, device information;
                  </List.Item>
                  <List.Item>
                    (b) any sensitive data such as religious beliefs, political
                    opinions, health information, or biometric data. We do not
                    collect these.
                  </List.Item>
                </List.Root>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>"Usage Data"</Table.Cell>
              <Table.Cell>
                Anonymous information collected automatically about how you
                interact with our app, such as which articles you read, how long
                you use the app, crash reports, and device type. This cannot be
                used to identify you personally.
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>"third party" / "third parties"</Table.Cell>
              <Table.Cell>
                Individuals, entities, websites, services, products, and
                applications that are not controlled, managed, or operated by
                Qamar Labs. This includes analytics providers we may use (like
                Google Analytics or Firebase) and any external websites linked
                from our encyclopedia content.
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Root>

        <Box id="coverage" mb={8}>
          <Heading
            as="h4"
            size="sm"
            mb={4}
            id="What_This_Privacy_Policy_Does_and_Does_Not_Cover"
          >
            What This Privacy Policy Does and Does Not Cover
          </Heading>

          <Text mb={4}>
            As part of our mission to be honest and serve the Ummah with quality
            applications, this Privacy Policy applies to our collection and
            handling of information about you that we receive as a result of
            your use of our mobile encyclopedia app. This Policy also applies to
            information that we receive from our partners or other third
            parties. To understand more about what this Privacy Policy covers,
            please see below.
          </Text>

          <InfoCollapsibleSection title="Examples of What This Privacy Policy Covers">
            <Box p={4}>
              <List.Root spaceY={3}>
                <List.Item>
                  <Text as="span" fontWeight="bold">
                    ✓ Your use of the encyclopedia
                  </Text>{" "}
                  — Reading articles, searching for content, and navigating
                  through the app.
                </List.Item>
                <List.Item>
                  <Text as="span" fontWeight="bold">
                    ✓ Saving favorites
                  </Text>{" "}
                  — When you bookmark articles for offline reading, this data is
                  stored locally on your device.
                </List.Item>
                <List.Item>
                  <Text as="span" fontWeight="bold">
                    ✓ Anonymous usage statistics
                  </Text>{" "}
                  — If you consent, we may collect anonymized data about which
                  features are most popular to improve the app.
                </List.Item>
                <List.Item>
                  <Text as="span" fontWeight="bold">
                    ✓ Crash reports
                  </Text>{" "}
                  — Technical data sent when the app unexpectedly closes,
                  helping us fix bugs and improve stability.
                </List.Item>
              </List.Root>
            </Box>
          </InfoCollapsibleSection>

          <Text mb={4}>
            This Privacy Policy, however, does not cover some situations where
            we may gather or process information. In keeping with our commitment
            to quality over quantity, we intentionally limit data collection to
            only what is necessary. To understand more about what this Privacy
            Policy does not cover, please see below.
          </Text>

          <Box id="More_On_What_This_Privacy_Policy_Doesn't_Cover" mb={4}>
            <InfoCollapsibleSection title="What This Privacy Policy Does NOT Cover">
              <Box p={4}>
                <Text mb={4}>
                  This section is part of the Privacy Policy and is meant to
                  explain in detail which situations are not covered.
                </Text>

                <Text fontWeight="bold" mb={2}>
                  External Links
                </Text>
                <Text mb={4}>
                  Our encyclopedia may contain links to external websites,
                  references, or third-party content. Once you leave our app,
                  this Privacy Policy no longer applies. We encourage you to
                  review the privacy policies of any external sites you visit.
                </Text>

                <Text fontWeight="bold" mb={2}>
                  Third-Party Services Integrated into Our App
                </Text>
                <Text mb={4}>
                  We may use third-party services (such as analytics providers
                  or video hosting platforms) to enhance your experience. These
                  services have their own privacy policies and data handling
                  practices. We select partners who align with our values of
                  honesty and respect for user privacy.
                </Text>

                <Text fontWeight="bold" mb={2}>
                  Device Permissions
                </Text>
                <Text mb={4}>
                  Our app may request access to certain device features (like
                  storage for saving favorites). How your device handles these
                  permissions and any data stored locally on your device is
                  governed by your device's operating system and settings, not
                  this Policy.
                </Text>

                <Text fontWeight="bold" mb={2}>
                  Children Under 13
                </Text>
                <Text mb={4}>
                  While our app is suitable for all ages, we do not knowingly
                  collect personal information from children under 13. If you
                  believe a child has provided us with personal information,
                  please contact us so we can delete it.
                </Text>

                <Text fontWeight="bold" mb={2}>
                  Communications with Us
                </Text>
                <Text mb={4}>
                  If you contact us directly via email or support channels,
                  those communications are covered by this Policy while in our
                  systems. However, any information you choose to share in those
                  communications is voluntary.
                </Text>
              </Box>
            </InfoCollapsibleSection>
          </Box>

          <Text mb={4}>
            We are committed to being the best we can be by building apps that
            respect your privacy while serving the Ummah with valuable
            knowledge. If you have any questions about what is or isn't covered,
            please contact us.
          </Text>

          <Flex justify="flex-end" display={["none", "none", "flex"]}>
            <HStack>
              <Link href="#top" color="blue.500">
                Back to top
              </Link>
            </HStack>
          </Flex>
        </Box>
      </Box>
    </VStack>
  );
};
