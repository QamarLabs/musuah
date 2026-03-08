import {
  Box,
  Heading,
  Text,
  List,
  ListItem,
  Image,
  Flex,
  VStack,
} from "@chakra-ui/react";
import { Divider } from "@chakra-ui/layout";

export function PrivacyPolicyBox() {
  return (
    <Box className="mw-text" p="0.3em 0" textAlign="center">
      <Heading
        as="h2"
        bg="green.700"
        fontSize="150%"
        m="0.3em auto"
        fontWeight="bold"
        textAlign="center"
        className='mw-text'
        color="rgba(255, 255, 255, 0.87)"
        py={2}
        px={4}
      >
        Qamar Labs Privacy Policy
      </Heading>

      <Flex justify="flex-end" mr={0}>
        <Image
          src="/qamar-labs-logo.png"
          alt="Qamar Labs Logo"
          w={90}
          h={90}
          decoding="async"
        />
      </Flex>

      <Text p="0.3em 0" textAlign="center" mx="10%" my={1}>
        This is a{" "}
        <Text as="span" fontWeight="bold">
          summary
        </Text>{" "}
        of the Qamar Labs Privacy Policy. To read the full terms, scroll down.
        We believe in honesty, clarity, and serving the Ummah with transparency.
      </Text>

      <Text
        fontSize="90%"
        fontStyle="italic"
        p="0.3em"
        mx="75px"
      >
        Disclaimer: This summary is not a legal document. It is a simplified
        explanation meant to help you understand our full Privacy Policy. Think
        of it as the user‑friendly version of how Qamar Labs protects your data.
      </Text>

      <Divider my={4} />

      <VStack align="start" spaceY={4} mx="10%" textAlign="left">
        <Text fontWeight="bold">
          At Qamar Labs, we believe you should be able to benefit from our apps
          without giving up unnecessary personal information. You may:
        </Text>

        <List.Root spaceY={2}>
          <ListItem>
            Use most Qamar Labs apps{" "}
            <Text as="span" fontWeight="bold">
              without creating an account
            </Text>.
          </ListItem>
          <ListItem>
            Create an account{" "}
            <Text as="span" fontWeight="bold">
              without providing your real name
            </Text>{" "}
            or unnecessary personal details.
          </ListItem>
        </List.Root>

        <Text fontWeight="bold">
          To improve our apps and serve the Ummah better, we collect limited
          information when you:
        </Text>

        <List.Root spaceY={2}>
          <ListItem>Use features inside our apps.</ListItem>
          <ListItem>Create an account or update your profile.</ListItem>
          <ListItem>Send us feedback or contact our support team.</ListItem>
          <ListItem>
            Participate in optional surveys, beta programs, or community
            feedback sessions.
          </ListItem>
        </List.Root>

        <Text fontWeight="bold">We are committed to:</Text>

        <List.Root spaceY={2}>
          <ListItem>
            Being{" "}
            <Text as="span" fontWeight="bold">
              honest
            </Text>{" "}
            and clear about how your information is used or shared.
          </ListItem>
          <ListItem>
            Using reasonable security measures to keep your information safe.
          </ListItem>
          <ListItem>
            Never{" "}
            <Text as="span" fontWeight="bold">
              selling
            </Text>{" "}
            your information or sharing it with third parties for marketing.
          </ListItem>
          <ListItem>
            Only sharing your information in limited cases, such as:
            <List.Root pl={4} mt={1} spaceY={1}>
              <ListItem>Improving Qamar Labs apps and services.</ListItem>
              <ListItem>Complying with legal obligations.</ListItem>
              <ListItem>Protecting our users and systems.</ListItem>
            </List.Root>
          </ListItem>
          <ListItem>
            Retaining your data only for as long as needed to operate and
            improve our services.
          </ListItem>
        </List.Root>

        <Text fontWeight="bold">Be aware:</Text>

        <List.Root spaceY={2}>
          <ListItem>
            Any content you publicly submit inside a Qamar Labs app may be
            visible to other users.
          </ListItem>
          <ListItem>
            If you submit content without logging in, it may be associated with
            your device or IP address.
          </ListItem>
          <ListItem>
            Some Qamar Labs apps include community‑moderated spaces where trusted
            volunteers may have limited access to non‑public information to
            maintain safety.
          </ListItem>
          <ListItem>
            This Privacy Policy applies only to Qamar Labs apps and services.
            Third‑party tools or integrations may have their own privacy
            policies.
          </ListItem>
          <ListItem>
            We may release aggregated, non‑personal data for research,
            transparency, or community benefit.
          </ListItem>
          <ListItem>
            If you do not agree with this Privacy Policy, you may choose not to
            use Qamar Labs apps.
          </ListItem>
        </List.Root>
      </VStack>
    </Box>
  );
}
