import React from "react";
import {
  Box,
  Text,
  Heading,
  Link,
  Image,
  List,
  ListItem,
  Table,
  Button,
  useDisclosure,
  Collapsible,
  VStack,
} from "@chakra-ui/react";

const CollapsibleSection: React.FC<{
  title: string;
  children: React.ReactNode;
}> = ({ title, children }) => {
  const { open, onToggle } = useDisclosure();

  return (
    <Table.Root variant="outline" border="1px solid #AAA" width="100%" my={2}>
      <Table.Body>
        <Table.Row>
          <Table.ColumnHeader>
            <Button onClick={onToggle} variant="ghost" size="sm">
              {title}
            </Button>
          </Table.ColumnHeader>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <Collapsible.Root open={open}>{children}</Collapsible.Root>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table.Root>
  );
};

export const PrivacyPolicyCollectionPart2 = () => {
  return (
    <>
      <VStack align="start" spaceY={4} mx="10%" textAlign="left">

        <Box
          float="right"
          width="100%"
          pl="2em"
          className="mobile-float-reset mobile-padding-reset"
        >
          <Text>
            We want to make the Wikimedia Sites better for you by learning more
            about how you use them. Examples of this might include how often you
            visit the Wikimedia Sites, what you like, what you find helpful, how
            you get to the Wikimedia Sites, and whether you would use a helpful
            feature more if we explained it differently. We also want this Policy
            and our practices to reflect our community's values. For this reason,
            we keep information related to your use of the Wikimedia Sites
            confidential, except as provided in this Policy.
          </Text>
          <Box float="right" className="nomobile">
            <Link href="#top">Back to top</Link>{" "}
            <Link href="/wiki/Privacy_policy#top" title="Privacy policy">
              <Image
                src="//upload.wikimedia.org/wikipedia/commons/c/ce/WWC_arrow_up.png"
                width="11px"
                height="11px"
                alt="Back to top"
              />
            </Link>
          </Box>
        </Box>

        <Box
          float="right"
          width="100%"
          pl="2em"
          className="mobile-float-reset mobile-padding-reset"
        >
          <span id="info-received-automatically"></span>
          <Heading as="h4" size="md" id="Information_We_Receive_Automatically">
            Information We Receive Automatically
          </Heading>
        </Box>

        <Box
          float="right"
          width="100%"
          pl="2em"
          className="mobile-float-reset mobile-padding-reset"
        >
          <Text>
            Because of how browsers work, we receive some information
            automatically when you visit the Wikimedia Sites. This includes when
            you use an online tool on a third-party site that loads information
            coming from the Wikimedia Sites. This information includes the type of
            device you are using (possibly including unique device identification
            numbers, for some beta versions of our mobile applications), the type
            and version of your{" "}
            <Link
              href="/wiki/Special:MyLanguage/Policy:Privacy_policy/Glossary_of_key_terms#browsers"
              title="Special:MyLanguage/Policy:Privacy policy/Glossary of key terms"
            >
              browser
            </Link>
            , your browser's language preference, the type and version of your
            device's{" "}
            <Link
              href="/wiki/Special:MyLanguage/Policy:Privacy_policy/Glossary_of_key_terms#operating-system"
              title="Special:MyLanguage/Policy:Privacy policy/Glossary of key terms"
            >
              operating system
            </Link>
            , in some cases the name of your internet service provider or mobile
            carrier, the website that referred you to the Wikimedia Sites, which
            pages you request and visit, and the date and time of each request you
            make to the Wikimedia Sites.
          </Text>
          <Text>
            Put simply, we use this information to enhance your experience with
            Wikimedia Sites. For example, we use this information to administer
            the sites, provide greater security, and fight vandalism; optimize
            mobile applications, customize content and set language preferences,
            test features to see what works, and improve performance; understand
            how users interact with the Wikimedia Sites, track and study use of
            various features, gain understanding about the demographics of the
            different Wikimedia Sites, and analyze trends.
          </Text>
          <Box float="right" className="nomobile">
            <Link href="#top">Back to top</Link>{" "}
            <Link href="/wiki/Privacy_policy#top" title="Privacy policy">
              <Image
                src="//upload.wikimedia.org/wikipedia/commons/c/ce/WWC_arrow_up.png"
                width="11px"
                height="11px"
                alt="Back to top"
              />
            </Link>
          </Box>
        </Box>

        <Box
          float="right"
          width="100%"
          pl="2em"
          className="mobile-float-reset mobile-padding-reset"
        >
          <span id="info-collected"></span>
          <Heading as="h4" size="md" id="Information_We_Collect">
            Information We Collect
          </Heading>
        </Box>

        <Box
          float="right"
          width="100%"
          pl="2em"
          className="mobile-float-reset mobile-padding-reset"
        >
          <Text>
            We actively collect some types of information with a variety of
            commonly-used technologies. These generally include{" "}
            <Link
              href="/wiki/Special:MyLanguage/Policy:Privacy_policy/Glossary_of_key_terms#tracking-pixel"
              title="Special:MyLanguage/Policy:Privacy policy/Glossary of key terms"
            >
              tracking pixels
            </Link>
            ,{" "}
            <Link
              href="/wiki/Special:MyLanguage/Policy:Privacy_policy/Glossary_of_key_terms#javascript"
              title="Special:MyLanguage/Policy:Privacy policy/Glossary of key terms"
            >
              JavaScript
            </Link>
            , and a variety of "locally stored data" technologies, such as{" "}
            <Link
              href="/wiki/Special:MyLanguage/Policy:Privacy_policy/Glossary_of_key_terms#cookies"
              title="Special:MyLanguage/Policy:Privacy policy/Glossary of key terms"
            >
              cookies
            </Link>{" "}
            and{" "}
            <Link
              href="/wiki/Special:MyLanguage/Policy:Privacy_policy/Glossary_of_key_terms#local-storage"
              title="Special:MyLanguage/Policy:Privacy policy/Glossary of key terms"
            >
              local storage
            </Link>
            . These types of technologies may also be used in online tools on a
            third-party site that loads information from the Wikimedia Sites. We
            realize that some of these technologies do not have the best
            reputation in town and can be used for less-than-noble purposes. So we
            want to be as clear as we can about why we use these methods and the
            type of information we collect with them.
          </Text>
          <Text>
            Depending on which technology we use, locally stored data may include
            text, Personal Information (like your{" "}
            <Link
              href="/wiki/Special:MyLanguage/Policy:Privacy_policy/Glossary_of_key_terms#ip-address"
              title="Special:MyLanguage/Policy:Privacy policy/Glossary of key terms"
            >
              IP address
            </Link>
            ), and information about your use of the Wikimedia Sites (like your
            username or the time of your visit). See below for more information.
          </Text>
          <Text>
            We use this information to make your experience with the Wikimedia
            Sites safer and better, to gain a greater understanding of user
            preferences and their interaction with the Wikimedia Sites, and to
            generally improve our services. We will never use third-party cookies,
            unless we get your permission to do so. If you ever come across a
            third-party data collection tool that has not been authorized by you
            (such as one that may have been mistakenly placed by another user or
            administrator), please report it to us at{" "}
            <Link href="mailto:privacy@wikimedia.org">privacy@wikimedia.org</Link>
            .
          </Text>

          <CollapsibleSection title="More on Locally Stored Data">
            <Text>
              Locally stored data, JavaScript, and tracking pixels help us do
              things like:
            </Text>
            <List.Root listStyle="disc" pl={5}>
              <ListItem>
                Provide you with a customizable experience, such as using cookies
                to know your language preference, to remember the user preferences
                you set so we can provide you with the customized look and feel
                that you want, and to tell you about interesting Wikimedia issues
                and events in your area.
              </ListItem>
              <ListItem>
                Deliver more relevant content to you faster. For example, we use
                local storage to store your most recently read articles directly
                on your device, so they can be retrieved quickly. Also, we use
                cookies to learn about the topics searched so that we can optimize
                the search results we deliver to you.
              </ListItem>
              <ListItem>
                Understand how you use the Wikimedia Sites, so that we know what
                works and what is useful. For example, we might use cookies to
                learn about the list of articles you are following on your
                watchlist so that we can recommend similar articles that you may
                be interested in.
              </ListItem>
              <ListItem>
                Understand how you use the Wikimedia Sites across different
                devices, so that we can make our varied Wikimedia Sites more
                efficient and effective for you.
              </ListItem>
              <ListItem>
                Make the Wikimedia Sites more convenient to use, such as by using
                cookies to maintain your session when you log in or to remember
                your username in the login field.
              </ListItem>
            </List.Root>
          </CollapsibleSection>

          <Text id="KnowMoreCookiesReturn">
            Want to know even more? You can read more about some of the specific
            cookies we use, when they expire, and what we use them for in our{" "}
            <Link
              href="/wiki/Special:MyLanguage/Policy:Privacy_policy/Frequently_asked_questions#cookieFAQ"
              title="Special:MyLanguage/Policy:Privacy policy/Frequently asked questions"
            >
              FAQ
            </Link>
            .
          </Text>
          <Text id="LimitStorageReturn">
            We believe this data collection helps improve your user experience,
            but you may remove or disable some or all locally stored data through
            your browser settings, depending on your browser. You can learn more
            about some options you have in our{" "}
            <Link
              href="/wiki/Special:MyLanguage/Policy:Privacy_policy/Frequently_asked_questions#limitstorageFAQ"
              title="Special:MyLanguage/Policy:Privacy policy/Frequently asked questions"
            >
              FAQ
            </Link>
            . While locally stored data may not be necessary to use our sites,
            some features will not function properly if you disable locally stored
            data.
          </Text>
          <Text id="PublicLogsReturn">
            While the examples above concerning information about you collected
            through the use of data collection tools are kept confidential in
            accordance with this Policy, please note that some information about
            the actions taken by your username is made publicly available through{" "}
            <Link
              href="/wiki/Privacy_policy/FAQ#publiclogsFAQ"
              className="mw-redirect"
              title="Privacy policy/FAQ"
            >
              public logs
            </Link>{" "}
            alongside actions taken by other users. For example, a public log may
            include the date your account was created on a Wikimedia Site along
            with the dates that other accounts were created on a Wikimedia Site.
          </Text>
          <Box float="right" className="nomobile">
            <Link href="#top">Back to top</Link>{" "}
            <Link href="/wiki/Privacy_policy#top" title="Privacy policy">
              <Image
                src="//upload.wikimedia.org/wikipedia/commons/c/ce/WWC_arrow_up.png"
                width="11px"
                height="11px"
                alt="Back to top"
              />
            </Link>
          </Box>
        </Box>
      </VStack>
      {/* Additional sections would follow the same pattern */}
    </>
  );
};
