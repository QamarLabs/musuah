import {
  Box,
  Heading,
  Text,
  Link,
  ListItem,
  Image,
  Flex,
  VStack,
} from "@chakra-ui/react";
import { UnorderedList, Divider } from "@chakra-ui/layout";

export function PrivacyPolicyBox() {
  return (
    <Box p="0.3em 0" textAlign="center">
      <Heading
        as="h2"
        bg="green.700"
        fontSize="150%"
        m="0.3em auto"
        fontWeight="bold"
        textAlign="center"
        py={2}
        px={4}
      >
        mūsūʿah Privacy Policy
      </Heading>

      <Flex justify="flex-end" mr={0}>
        <Link href="/wiki/File:Wikimedia-logo_black.svg" target="_blank" rel="noopener noreferrer">
          <Image
            src="//upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Wikimedia-logo_black.svg/120px-Wikimedia-logo_black.svg.png"
            alt="Wikimedia Logo"
            w={90}
            h={90}
            srcSet="//upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Wikimedia-logo_black.svg/250px-Wikimedia-logo_black.svg.png 1.5x"
            decoding="async"
          />
        </Link>
      </Flex>

      <Text p="0.3em 0" textAlign="center" mx="10%" my={1}>
        This is a{" "}
        <Link href="/wiki/Special:MyLanguage/Policy:Privacy_policy/Summary" target="_blank" rel="noopener noreferrer">
          summary
        </Link>{" "}
        of the Privacy Policy. To read the full terms, scroll down or{" "}
        <Link href="/wiki/Special:MyLanguage/Policy:Privacy_policy#introduction" target="_blank" rel="noopener noreferrer">
          click here
        </Link>.
      </Text>

      <Text
        fontSize="90%"
        fontStyle="italic"
        p="0.3em"
        mx="75px"
      >
        Disclaimer: This summary is not a part of the Privacy Policy and is not a legal document.
        It is simply a handy reference for understanding the full Privacy Policy. Think of it as the
        user-friendly interface to our Privacy Policy.
      </Text>

      <Divider my={4} />

      <VStack align="start" spaceY={4} mx="10%" textAlign="left">
        <Text fontWeight="bold">
          Because we believe that you should not have to provide personal information to participate
          in the free knowledge movement, you may:
        </Text>
        <UnorderedList spacing={2}>
          <ListItem>
            Read, edit, or use any mūsūʿah site{" "}
            <Link href="/wiki/Special:MyLanguage/Policy:Privacy_policy#your-account-info" target="_blank" rel="noopener noreferrer">
              without registering an account
            </Link>.
          </ListItem>
          <ListItem>
            Register for an account{" "}
            <Link href="/wiki/Special:MyLanguage/Policy:Privacy_policy#your-account-info" target="_blank" rel="noopener noreferrer">
              without providing
            </Link>{" "}
            an email address or real name.
          </ListItem>
        </UnorderedList>

        <Text fontWeight="bold">
          Because we want to understand how Wikimedia Sites are used so we can make them better for
          you, we collect some information when you:
        </Text>
        <UnorderedList spacing={2}>
          <ListItem>
            Make{" "}
            <Link href="/wiki/Special:MyLanguage/Policy:Privacy_policy#your-public-contribs" target="_blank" rel="noopener noreferrer">
              public contributions
            </Link>.
          </ListItem>
          <ListItem>
            <Link href="/wiki/Special:MyLanguage/Policy:Privacy_policy#your-account-info" target="_blank" rel="noopener noreferrer">
              Register an account
            </Link>{" "}
            or update your user page.
          </ListItem>
          <ListItem>
            <Link href="/wiki/Special:MyLanguage/Policy:Privacy_policy#your-use-of-wm-sites" target="_blank" rel="noopener noreferrer">
              Use
            </Link>{" "}
            the Wikimedia Sites.
          </ListItem>
          <ListItem>
            Send us{" "}
            <Link href="/wiki/Special:MyLanguage/Policy:Privacy_policy#emails" target="_blank" rel="noopener noreferrer">
              emails
            </Link>{" "}
            or participate in a{" "}
            <Link href="/wiki/Special:MyLanguage/Policy:Privacy_policy#surveys-feedback" target="_blank" rel="noopener noreferrer">
              survey or give feedback
            </Link>.
          </ListItem>
        </UnorderedList>

        <Text fontWeight="bold">We are committed to:</Text>
        <UnorderedList spacing={2}>
          <ListItem>
            Describing how your information may be used or{" "}
            <Link href="/wiki/Special:MyLanguage/Policy:Privacy_policy#when-we-may-share" target="_blank" rel="noopener noreferrer">
              shared
            </Link>{" "}
            in this Privacy Policy.
          </ListItem>
          <ListItem>
            Using reasonable measures to keep your information{" "}
            <Link href="/wiki/Special:MyLanguage/Policy:Privacy_policy#protection-means" target="_blank" rel="noopener noreferrer">
              secure
            </Link>.
          </ListItem>
          <ListItem>
            Never{" "}
            <Link href="/wiki/Special:MyLanguage/Policy:Privacy_policy#donotsell" target="_blank" rel="noopener noreferrer">
              selling
            </Link>{" "}
            your information or sharing it with third parties for marketing purposes.
          </ListItem>
          <ListItem>
            Only{" "}
            <Link href="/wiki/Special:MyLanguage/Policy:Privacy_policy#when-we-may-share" target="_blank" rel="noopener noreferrer">
              sharing
            </Link>{" "}
            your information in limited circumstances, such as to{" "}
            <Link href="/wiki/Special:MyLanguage/Policy:Privacy_policy#share-to-experiment" target="_blank" rel="noopener noreferrer">
              improve the Wikimedia Sites
            </Link>, to{" "}
            <Link href="/wiki/Special:MyLanguage/Policy:Privacy_policy#share-legal-reasons" target="_blank" rel="noopener noreferrer">
              comply with the law
            </Link>, or to{" "}
            <Link href="/wiki/Special:MyLanguage/Policy:Privacy_policy#share-to-protect-people" target="_blank" rel="noopener noreferrer">
              protect you and others
            </Link>.
          </ListItem>
          <ListItem>
            <Link href="/wiki/Special:MyLanguage/Policy:Privacy_policy#protection-duration" target="_blank" rel="noopener noreferrer">
              Retaining your data
            </Link>{" "}
            for the shortest possible time that is consistent with maintaining, understanding, and
            improving the Wikimedia Sites, and our obligations under applicable law.
          </ListItem>
        </UnorderedList>

        <Text fontWeight="bold">Be aware:</Text>
        <UnorderedList spacing={2}>
          <ListItem>
            Any content you add or any change that you make to a Wikimedia Site will be{" "}
            <Link href="/wiki/Special:MyLanguage/Policy:Privacy_policy#your-public-contribs" target="_blank" rel="noopener noreferrer">
              publicly and permanently available
            </Link>.
          </ListItem>
          <ListItem>
            If you add content or make a change to a Wikimedia Site{" "}
            <Link href="/wiki/Special:MyLanguage/Policy:Privacy_policy#noaccount" target="_blank" rel="noopener noreferrer">
              without logging in
            </Link>, that content or change will be publicly and permanently attributed to the IP
            address used at the time rather than a username.
          </ListItem>
          <ListItem>
            Our community of volunteer editors and contributors is a self-policing body. Certain
            administrators of the Wikimedia Sites, who are chosen by the community, use tools that
            grant them limited access to nonpublic information about recent contributions so they may
            protect the Wikimedia Sites and enforce policies.
          </ListItem>
          <ListItem>
            This Privacy Policy{" "}
            <Link href="/wiki/Special:MyLanguage/Policy:Privacy_policy#coverage" target="_blank" rel="noopener noreferrer">
              does not apply
            </Link>{" "}
            to all sites and services run by the Wikimedia Foundation, such as sites or services that
            have their own privacy policy (like the{" "}
            <Link href="https://shop.wikimedia.org" target="_blank" rel="noopener noreferrer">
              Wikimedia Shop
            </Link>) or sites or services run by third parties (like third-party developer projects
            on{" "}
            <Link
              href="https://www.mediawiki.org/wiki/Special:MyLanguage/Wikimedia_Cloud_Services"
              target="_blank"
              rel="noopener noreferrer"
            >
              Wikimedia Cloud Services
            </Link>).
          </ListItem>
          <ListItem>
            As part of our commitment to education and research around the world, we occasionally
            release public information and aggregated or non-personal information to the general
            public through data dumps and data sets.
          </ListItem>
          <ListItem>
            For the protection of the Wikimedia Foundation and other users, if you do not agree with
            this Privacy Policy, you may not use the Wikimedia Sites.
          </ListItem>
        </UnorderedList>
      </VStack>
    </Box>
  );
}