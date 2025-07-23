import {
    Box,
    Heading,
    Text,
    Link,
    Image,
    Flex,
    useBreakpointValue,
    List,
} from "@chakra-ui/react";

export function PrivacyPolicyImportantInfo(){
    const isMobile = useBreakpointValue({ base: true, md: false });

    const sections = [
        {
            id: "",
            title: "",
            level: 0,
            content: (
                <Text fontWeight="bold" mb={4}>
                    For the protection of the Wikimedia Foundation and other users, if you do not agree with this Privacy Policy, you may not use the Wikimedia Sites.
                </Text>
            ),
        },
        {
            id: "where-is-the-wmf",
            title: "Where is the Foundation & What Does That Mean for Me?",
            level: 3,
            content: (
                <Text mb={4}>
                    The Wikimedia Foundation is a non-profit organization based in San Francisco, California, with servers and data centers located in the U.S. If you decide to use Wikimedia Sites, whether from inside or outside of the U.S., you understand that your Personal Information will be collected, transferred, stored, processed, disclosed and otherwise used in the U.S. as described in this Privacy Policy. You also understand that your information may be transferred by us from the U.S. to other countries, which may have different or less stringent data protection laws than your country, in connection with providing services to you.
                </Text>
            ),
        },
        {
            id: "DNT",
            title: "Our Response to Do Not Track (DNT) signals",
            level: 3,
            content: (
                <>
                    <Text mb={4}>
                        We are strongly committed to protecting users' Personal Information. Under this Policy, we may share your information only under particular situations, which you can learn more about in the{" "}
                        <Link href="#sharing" color="blue.500">
                            "When May We Share Your Information"
                        </Link>{" "}
                        section of this Privacy Policy. In particular, we do not share your Personal Information for marketing purposes.
                    </Text>
                    <Text mb={4}>
                        Because we protect all users in accordance with this Privacy Policy, we do not change our behavior in response to a web browser's "do not track" signal. For more information regarding Do Not Track signals and how we handle them, please visit our{" "}
                        <Link
                            href="/wiki/Special:MyLanguage/Policy:Privacy_policy/Frequently_asked_questions#DNTFAQ"
                            color="blue.500"

                        >
                            FAQ
                        </Link>
                        .
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
                    <Text mb={4}>
                        Because things naturally change over time and we want to ensure our Privacy Policy accurately reflects our practices and the law, it may be necessary to modify this Privacy Policy from time to time. We reserve the right to do so in the following manner:
                    </Text>
                    <List.Root mb={4} pl={6}>
                        <List.Item mb={2}>
                            In the event of substantial changes, we will provide the proposed changes to our users in at least three (3) languages (selected at our discretion) for an open comment period lasting at least thirty (30) calendar days. Prior to the start of any comment period, we will provide notice of such changes and the opportunity to comment via the Wikimedia Sites, and via a notification on{" "}
                            <Link
                                href="https://lists.wikimedia.org/mailman/listinfo/wikimediaannounce-l"
                                color="blue.500"

                            >
                                WikimediaAnnounce-L
                            </Link>{" "}
                            or a similar mailing list.
                        </List.Item>
                        <List.Item>
                            For minor changes, such as grammatical fixes, administrative or legal changes, or corrections of inaccurate statements, we will post the changes and, when possible, provide at least three (3) calendar days' prior notice via{" "}
                            <Link
                                href="https://lists.wikimedia.org/mailman/listinfo/wikimediaannounce-l"
                                color="blue.500"

                            >
                                WikimediaAnnounce-L
                            </Link>{" "}
                            or similar mailing list.
                        </List.Item>
                    </List.Root>
                    <Text mb={4}>
                        We ask that you please review the most up-to-date version of our Privacy Policy. Your continued use of the Wikimedia Sites after any effective date of a subsequent version of this Privacy Policy constitutes acceptance of this Privacy Policy on your part.
                    </Text>
                </>
            ),
        },
        {
            id: "contact-us",
            title: "Contact Us",
            level: 3,
            content: (
                <>
                    <Text mb={4}>
                        If you have questions or suggestions about this Privacy Policy, or the information collected under this Privacy Policy, please email us at{" "}
                        <Link href="mailto:privacy@wikimedia.org" color="blue.500" >
                            privacy@wikimedia.org
                        </Link>{" "}
                        or{" "}
                        <Link
                            href="https://wikimediafoundation.org/about/contact/"
                            color="blue.500"

                        >
                            contact us
                        </Link>{" "}
                        directly. If you are located in the European Economic Area and have questions about your personal data or would like to request to access, update, or delete it, you may contact our representative via email at EUrepresentative.Wikimedia@twobirds.com, or via mail at:
                    </Text>
                    <List.Root mb={4} spaceY={1} listStyle="none">
                        <List.Item>Bird &amp; Bird GDPR Representative Ireland</List.Item>
                        <List.Item>29 Earlsfort Terrace</List.Item>
                        <List.Item>Dublin 2</List.Item>
                        <List.Item>D02 AY28</List.Item>
                        <List.Item>Ireland</List.Item>
                    </List.Root>
                    <Text mb={4}>
                        If you are an individual located in the United Kingdom, and have questions about your personal data or would like to request to access, update, or delete it, you may contact our representative via email at UKrepresentative.Wikimedia@twobirds.com, or via mail at:
                    </Text>
                    <List.Root mb={4} spaceY={1} listStyle="none">
                        <List.Item>Bird &amp; Bird GDPR Representative Services UK</List.Item>
                        <List.Item>12 New Fetter Lane</List.Item>
                        <List.Item>London</List.Item>
                        <List.Item>EC4A 1JP</List.Item>
                        <List.Item>United Kingdom</List.Item>
                    </List.Root>
                    <Text mb={4}>
                        Our European Economic Area and United Kingdom Representative can only be contacted for queries in relation to data protection.
                    </Text>
                    <Text mb={4}>
                        Depending on your jurisdiction, you also may have the right to lodge a complaint with a supervisory authority competent for your country or region.
                    </Text>
                </>
            ),
        },
        {
            id: "thank-you",
            title: "Thank You!",
            level: 3,
            content: (
                <>
                    <Text mb={4}>
                        Thank you for reading our Privacy Policy. We hope you enjoy using the Wikimedia Sites and appreciate your participation in creating, maintaining, and constantly working to improve the largest repository of free knowledge in the world.
                    </Text>
                    <Text fontWeight="bold" mb={4}>
                        Please note that in the event of any differences in meaning or interpretation between the original English version of this Privacy Policy and a translation, the original English version takes precedence.
                    </Text>
                </>
            ),
        },
    ];

    const renderHeading = (level: number, title: string, id: string) => {
        switch (level) {
            case 2:
                return (
                    <Heading as="h2" id={id} fontSize="xl" mb={4} display="flex" alignItems="center">
                        {!isMobile && (
                            <Image
                                src="//upload.wikimedia.org/wikipedia/commons/thumb/9/92/WMF_sign.png/60px-WMF_sign.png"
                                alt="Important info icon"
                                width="60px"
                                height="60px"
                                mr={2}
                                srcSet="//upload.wikimedia.org/wikipedia/commons/thumb/9/92/WMF_sign.png/90px-WMF_sign.png 1.5x, //upload.wikimedia.org/wikipedia/commons/9/92/WMF_sign.png 2x"
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
                return null;
        }
    };

    return (
        <Box>
            <Box float={{ base: "none", md: "right" }} width={{ base: "100%", md: "70%" }} pl={{ base: 0, md: 8 }}>
                {renderHeading(2, "Important info", "Important_info")}

                {sections.map((section, index) => (
                    <Box key={index} mb={8}>
                        <span id={section.id} />
                        {section.level > 0 && renderHeading(section.level, section.title, section.title.replace(/\s+/g, "_"))}
                        {section.content}

                        {!isMobile && section.content && section.level > 0 && (
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
        </Box>
    );
};
