import {
    Box,
    Text,
    Link,
    Table,
    Heading,
    List,
    Button,
    useDisclosure,
    Flex,
    HStack,
    Image,
    Collapsible
} from "@chakra-ui/react";

export const PrivacyPolicyDefinitions = () => {
    const { open: isExamplesOpen, onToggle: toggleExamples } = useDisclosure();
    const { open: isNonCoverageOpen, onToggle: toggleNonCoverage } = useDisclosure();

    return (
        <Box
            float={['none', 'none', 'right']}
            width={['100%', '100%', '70%']}
            pl={[0, 0, 8]}
        >
            <Text mb={4}>
                Because everyone (not just lawyers) should be able to easily understand how and why their information is collected and used, we use common language instead of more formal terms throughout this Policy. To help ensure your understanding of some particular key terms, here is a table of translations:
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
                        <Table.Cell>"the Wikimedia Foundation" / "the Foundation" / "we" / "us" / "our"</Table.Cell>
                        <Table.Cell>
                            The <Link href="https://wikimediafoundation.org/" color="blue.500">
                                Wikimedia Foundation, Inc.
                            </Link>, the non-profit organization that operates the Wikimedia Sites.
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>"Wikimedia Sites" / "our services"</Table.Cell>
                        <Table.Cell>
                            Wikimedia websites and services (regardless of language), including our{" "}
                            <Link href="https://wikimediafoundation.org/our-work/wikimedia-projects/" color="blue.500">
                                main projects
                            </Link>, such as Wikipedia and Wikimedia Commons, as well as mobile applications,
                            Application Programming Interfaces (APIs), emails, and notifications; excluding, however,
                            sites and services listed in the "What This Privacy Policy Does Not Cover" section below.
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>"you" / "your" / "me"</Table.Cell>
                        <Table.Cell>
                            You, regardless of whether you are an individual, group, or organization, and regardless
                            of whether you are using the Wikimedia Sites or our services on behalf of yourself or someone else.
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>"this Policy" / "this Privacy Policy"</Table.Cell>
                        <Table.Cell>This document, entitled the "Wikimedia Foundation Privacy Policy".</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>"contributions"</Table.Cell>
                        <Table.Cell>Content you add or changes you make to any Wikimedia Sites.</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>"Personal information"</Table.Cell>
                        <Table.Cell>
                            Information you provide us or information we collect that could be used to personally identify you.
                            To be clear, while we do not necessarily collect all of the following types of information,
                            we consider at least the following to be "personal information" if it is otherwise nonpublic
                            and can be used to identify you:
                            <List.Root listStyle="none" ml={4} spaceY={1}>
                                <List.Item>(a) your real name, address, phone number, email address, password, identification number on government-issued ID, IP address, user-agent information, payment account number;</List.Item>
                                <List.Item>(b) when associated with one of the items in subsection (a), any sensitive data such as date of birth, gender, sexual orientation, racial or ethnic origins, marital or familial status, medical conditions or disabilities, political affiliation, and religion.</List.Item>
                            </List.Root>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>"third party" / "third parties"</Table.Cell>
                        <Table.Cell>
                            Individuals, entities, websites, services, products, and applications that are not controlled,
                            managed, or operated by the Wikimedia Foundation. This includes other Wikimedia users and
                            independent organizations or groups who help promote the Wikimedia movement such as{" "}
                            <Link href="https://meta.wikimedia.org/wiki/Special:MyLanguage/Wikimedia_chapters" color="blue.500">
                                Wikimedia chapters
                            </Link>,{" "}
                            <Link href="https://meta.wikimedia.org/wiki/Special:MyLanguage/Wikimedia_thematic_organizations" color="blue.500">
                                thematic organizations
                            </Link>, and{" "}
                            <Link href="https://meta.wikimedia.org/wiki/Special:MyLanguage/Wikimedia_user_groups" color="blue.500">
                                user groups
                            </Link> as well as volunteers, employees, directors, officers,{" "}
                            <Link href="https://meta.wikimedia.org/wiki/Special:MyLanguage/Grants:Start/About" color="blue.500">
                                grant recipients
                            </Link>, and contractors of those organizations or groups.
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table.Root>

            <Box id="coverage" mb={8}>
                <Heading as="h4" size="sm" mb={4} id="What_This_Privacy_Policy_Does_and_Does_Not_Cover">
                    What This Privacy Policy Does and Does Not Cover
                </Heading>

                <Text mb={4}>
                    Except as explained below, this Privacy Policy applies to our collection and handling of information
                    about you that we receive as a result of your use of any of the Wikimedia Sites. This Policy also
                    applies to information that we receive from our partners or other third parties. To understand more
                    about what this Privacy Policy covers, please see below.
                </Text>

                <Box border="1px" borderColor="gray.200" mb={4}>
                    <Button
                        onClick={toggleExamples}
                        width="100%"
                        justifyContent="space-between"
                        bg="blue.50"
                        fontWeight="bold"
                        textAlign="center"
                        py={2}
                        px={4}
                    >
                        Examples of What This Privacy Policy Covers
                        <Box as="span">{isExamplesOpen ? '−' : '+'}</Box>
                    </Button>

                </Box>

                <Text mb={4}>
                    This Privacy Policy, however, does not cover some situations where we may gather or process information.
                    For example, some uses may be covered by separate privacy policies (like those of the{" "}
                    <Link href="https://shop.wikimedia.org" color="blue.500">
                        Wikimedia Shop
                    </Link>) or sites or services run by third parties (such as third-party developer projects on{" "}
                    <Link href="https://labs.wikimedia.org" color="blue.500">
                        Wikimedia Cloud Services
                    </Link>). To understand more about what this Privacy Policy does not cover, please see below.
                </Text>

                <Box id="More_On_What_This_Privacy_Policy_Doesn't_Cover" mb={4}>
                    <Box border="1px" borderColor="gray.200" mb={4}>
                        <Button
                            onClick={toggleNonCoverage}
                            width="100%"
                            justifyContent="space-between"
                            bg="blue.50"
                            fontWeight="bold"
                            textAlign="center"
                            py={2}
                            px={4}
                        >
                            More on what the Wikimedia Foundation Privacy Policy does not cover
                            <Box as="span">{isNonCoverageOpen ? '−' : '+'}</Box>
                        </Button>
                        <Collapsible.Root open={isNonCoverageOpen}>
                            <Box p={4}>
                                <Text mb={4}>
                                    This section is part of the Privacy Policy and is meant to explain in detail which situations are not covered by our Privacy Policy.
                                </Text>

                                <Text fontWeight="bold" mb={2}>Wikimedia Sites and Tools with alternative policies</Text>
                                <Text mb={4}>
                                    Some Wikimedia Foundation websites or tools have alternative privacy policies or provisions that differ from this Privacy Policy. These websites include:
                                </Text>
                                <List.Root spaceY={2} mb={4}>
                                    <List.Item>
                                        <Text as="span" fontWeight="bold">Wikipedia Store</Text> (covered by{" "}
                                        <Link href="https://store.wikimedia.org/pages/copy-of-privacy-policy" color="blue.500">
                                            the shop's policy
                                        </Link>);
                                    </List.Item>
                                    <List.Item>
                                        <Text as="span" fontWeight="bold">donate.wikimedia.org</Text>, including the donation process, such as clicking on a donation banner (covered by{" "}
                                        <Link href="/wiki/Special:MyLanguage/Policy:Donor_privacy_policy" color="blue.500">
                                            the Donor Privacy Policy
                                        </Link>); and
                                    </List.Item>
                                    <List.Item>
                                        <Text as="span" fontWeight="bold">The{" "}
                                            <Link href="https://www.mediawiki.org/wiki/Special:MyLanguage/Wikimedia_Apps/Synced_Reading_Lists" color="blue.500">
                                                Wikipedia Reading Lists Browser Extension
                                            </Link></Text>, which is governed by a separate{" "}
                                        <Link href="/wiki/Special:MyLanguage/Policy:Wikipedia_Reading_Lists_Browser_Extension_Privacy_Policy" color="blue.500">
                                            Privacy Policy
                                        </Link>. This separate policy will also be made available where the Extension can be downloaded.
                                    </List.Item>
                                </List.Root>
                                <Text mb={4}>
                                    If a Wikimedia Foundation website is governed by an alternative privacy policy, it will link to such policy. When a Wikimedia Foundation tool is governed by an alternative privacy policy, the page where the tool may be downloaded or enabled will include a link to that policy.
                                </Text>

                                <Text fontWeight="bold" mb={2}>Community members</Text>
                                <Text mb={2}>
                                    The Wikimedia Sites are collaborative labors of love that are constantly maintained and updated by a global community of volunteers. This global community of volunteers may sometimes have access to personal Information in order to ensure the functioning of the Wikimedia Sites.
                                </Text>
                                <List.Root spaceY={2} mb={4}>
                                    <List.Item>
                                        <Text as="span" fontWeight="bold">Administrative volunteers</Text>, such as{" "}
                                        <Link href="https://meta.wikimedia.org/wiki/Special:MyLanguage/CheckUser" color="blue.500">
                                            CheckUsers
                                        </Link> or{" "}
                                        <Link href="https://meta.wikimedia.org/wiki/Special:MyLanguage/Stewards" color="blue.500">
                                            Stewards
                                        </Link>. These are volunteers who enforce Wikimedia Site policies and ensure the safety of the Wikimedia Sites. When these administrators access Personal Information that is nonpublic, they are required to comply with our{" "}
                                        <Link href="/wiki/Special:MyLanguage/Policy:Access_to_nonpublic_personal_data_policy" color="blue.500">
                                            Access to nonpublic personal data policy
                                        </Link>, as well as other, tool-specific policies.
                                    </List.Item>
                                    <List.Item>
                                        <Text as="span" fontWeight="bold">Tool providers</Text>. We support platforms for third-party developers to experiment and develop new tools and sites, such as{" "}
                                        <Link href="https://www.mediawiki.org/wiki/Special:MyLanguage/Wikimedia_Cloud_Services" color="blue.500">
                                            wmflabs.org
                                        </Link>. When you use one of the tools developed by these volunteers, you may transfer information to them. When these volunteers access nonpublic information or Personal Information, they are required to comply with the terms governing the particular platform the tool is available on.
                                    </List.Item>
                                    <List.Item>
                                        <Text as="span" fontWeight="bold">Other users</Text>. We provide several tools that allow users to communicate with each other. The communications may be covered by this Policy while they pass through our systems, but the users who receive these communications, and what they do with the communications once they receive them, are not covered by this Policy. Examples include:
                                        <List.Root spaceY={2} mt={2} ml={4}>
                                            <List.Item>posting to Foundation-hosted email lists;</List.Item>
                                            <List.Item>
                                                requesting support from volunteers through our{" "}
                                                <Link href="https://meta.wikimedia.org/wiki/Special:MyLanguage/Volunteer_Response_Team" color="blue.500">
                                                    online ticketing system
                                                </Link> (email sent to info@wikimedia.org goes to this system);
                                            </List.Item>
                                            <List.Item>emailing other users through the Wikimedia Sites (for example, by using the "Email this user" feature); and</List.Item>
                                            <List.Item>
                                                chatting on{" "}
                                                <Link href="https://meta.wikimedia.org/wiki/Special:MyLanguage/IRC" color="blue.500">
                                                    IRC
                                                </Link> (such as on the #wikipedia channel).
                                            </List.Item>
                                        </List.Root>
                                    </List.Item>
                                </List.Root>

                                <Text fontWeight="bold" mb={2}>Third parties</Text>
                                <Text mb={2}>
                                    This Privacy Policy only covers the way the Wikimedia Foundation collects, uses and discloses Personal Information and does not address the practices of third parties. For example, this Privacy Policy does not address the practices of:
                                </Text>
                                <List.Root mb={4}>
                                    <List.Item>
                                        <Text as="span" fontWeight="bold">Websites run by other organizations</Text>, like websites linked to from the "References" sections of Wikipedia, or run by Wikimedia chapters or other{" "}
                                        <Link href="https://meta.wikimedia.org/wiki/Special:MyLanguage/Wikimedia_movement_affiliates" color="blue.500">
                                            movement organizations
                                        </Link>. These organizations may receive information from you if you visit their websites after using one of the Wikimedia Sites. They are governed by their own privacy policies.
                                    </List.Item>
                                    <List.Item>
                                        <Text as="span" fontWeight="bold">Mobile applications provided by other organizations or individuals</Text>. These organizations or individuals may receive information from you if you use those applications to access the Wikimedia Sites or Wikimedia Site content. They are governed by their own privacy policies.
                                    </List.Item>
                                </List.Root>

                                <Text mb={4}>
                                    Sometimes, volunteers may place a data-collecting tool, such as a script, gadget, tracking pixel, or share button, on a Wikimedia Site without our knowledge. This Policy does not cover how third parties handle the information they receive as a result of such a tool. If you come across such a third-party tool, and you believe it violates this Policy, you can remove the tool yourself, or report it to privacy@wikimedia.org so we can investigate.
                                </Text>
                            </Box>
                        </Collapsible.Root>
                    </Box>
                </Box>

                <Text mb={4}>
                    Where community policies govern information, such as the{" "}
                    <Link href="https://meta.wikimedia.org/wiki/Special:MyLanguage/CheckUser_policy" color="blue.500">
                        CheckUser policy
                    </Link>, the relevant community may add to the rules and obligations set out in this Policy. However, they are not permitted to create new exceptions or otherwise reduce the protections offered by this Policy.
                </Text>

                <Flex justify="flex-end" display={['none', 'none', 'flex']}>
                    <HStack>
                        <Link href="#top" color="blue.500">
                            Back to top
                        </Link>
                        <Link href="/wiki/Privacy_policy#top" title="Privacy policy">
                            <Image
                                src="//upload.wikimedia.org/wikipedia/commons/c/ce/WWC_arrow_up.png"
                                alt="Back to top"
                                w="11px"
                                h="11px"
                                decoding="async"
                            />
                        </Link>
                    </HStack>
                </Flex>
            </Box>
        </Box>
    );
};