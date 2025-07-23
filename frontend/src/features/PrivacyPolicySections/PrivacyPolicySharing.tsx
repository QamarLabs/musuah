import {
  Box,
  Heading,
  Text,
  Link,
  Image,
  Flex,
  useBreakpointValue,
} from "@chakra-ui/react";

export const PrivacyPolicySharing = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  const sections = [
    {
      id: "when-we-may-share",
      title: "When May We Share Your Information?",
      level: 3,
      content: null,
    },
    {
      id: "share-with-permission",
      title: "With Your Permission",
      level: 4,
      content: (
        <Text mb={4}>
          We share your Personal Information for a particular purpose, if you agree. For example, if
          you receive a scholarship and we ask permission to share your Personal Information with a
          local chapter. You can find more information in the list of examples in our{" "}
          <Link
            href="/wiki/Special:MyLanguage/Policy:Privacy_policy/Frequently_asked_questions#permissionexamplesFAQ"
            color="blue.500"
          >
            FAQ
          </Link>
          .
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
            We will access, use, preserve, and/or disclose your Personal Information if we reasonably
            believe it necessary to satisfy a valid and legally enforceable warrant, subpoena, court
            order, law or regulation, or other judicial or administrative order. However, if we
            believe that a particular request for disclosure of a user's information is legally
            invalid or an abuse of the legal system and the affected user does not intend to oppose
            the disclosure themselves, we will try our best to fight it. We are committed to
            notifying you via email at least ten (10) calendar days, when possible, before we
            disclose your Personal Information in response to a legal demand. However, we may only
            provide notice if we are not legally restrained from contacting you, there is no
            credible threat to life or limb that is created or increased by disclosing the request,
            and you have provided us with an email address.
          </Text>
          <Text mb={4}>
            Nothing in this Privacy Policy is intended to limit any legal objections or defenses you
            may have to a third-party's request (whether it be civil, criminal, or governmental) to
            disclose your Personal Information. We recommend seeking the advice of legal counsel
            immediately if such a request is made involving you.
          </Text>
          <Text mb={4}>
            For more information, see our{" "}
            <Link
              href="/wiki/Special:MyLanguage/Policy:Privacy_policy/Subpoena_frequently_asked_questions"
              color="blue.500"
            >
              Subpoena FAQ
            </Link>
            .
          </Text>
        </>
      ),
    },
    {
      id: "share-org-transfer",
      title: "If the Organization is Transferred (Really Unlikely!)",
      level: 4,
      content: (
        <Text mb={4}>
          In the extremely unlikely event that ownership of all or substantially all of the
          Foundation changes, or we go through a reorganization (such as a merger, consolidation, or
          acquisition), consistent with our legitimate interest, we will continue to keep your
          Personal Information confidential, except as provided in this Policy, and provide notice to
          you via the Wikimedia Sites and a notification on{" "}
          <Link
            href="https://lists.wikimedia.org/mailman/listinfo/wikimediaannounce-l"
            color="blue.500"
          >
            WikimediaAnnounce-L
          </Link>{" "}
          or similar mailing list at least thirty (30) calendar days before any Personal Information
          is transferred or becomes subject to a different privacy policy.
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
            We, or particular users with certain administrative rights as described below, need to
            use and share your Personal Information if it is reasonably believed to be necessary to
            enforce or investigate potential violations of our{" "}
            <Link
              href="/wiki/Special:MyLanguage/Policy:Terms_of_Use"
              color="blue.500"
            >
              Terms of Use
            </Link>
            , this Privacy Policy, or any Wikimedia Foundation or user community-based policies. We
            may also need to access and share Personal Information to investigate and defend
            ourselves against legal threats or actions.
          </Text>
          <Text mb={4}>
            Wikimedia Sites are collaborative, with users writing most of the policies and selecting
            from amongst themselves people to hold certain administrative rights. These rights may
            include access to limited amounts of otherwise nonpublic information about recent
            contributions and activity by other users. They use this access to help protect against
            vandalism and abuse, fight harassment of other users, and generally try to minimize
            disruptive behavior on the Wikimedia Sites. These various user-selected administrative
            groups have their own privacy and confidentiality guidelines, but all such groups are
            supposed to agree to follow our{" "}
            <Link
              href="/wiki/Special:MyLanguage/Policy:Access_to_nonpublic_personal_data_policy"
              color="blue.500"
            >
              Access to nonpublic personal data policy
            </Link>
            . These user-selected administrative groups are accountable to other users through checks
            and balances: users are selected through a community-driven process and overseen by their
            peers through a logged history of their actions. However, the legal names of these users
            are not known to the Wikimedia Foundation.
          </Text>
          <Text mb={4}>
            We hope that this never comes up, but we may disclose your Personal Information if we
            believe that it is reasonably necessary to prevent imminent and serious bodily harm or
            death to a person, or to protect our organization, employees, contractors, users, or the
            public. We may also disclose your Personal Information if we reasonably believe it
            necessary to detect, prevent, or otherwise assess and address potential spam, malware,
            fraud, abuse, unlawful activity, and security or technical concerns. (Check out the list
            of examples in our{" "}
            <Link
              href="/wiki/Special:MyLanguage/Policy:Privacy_policy/Frequently_asked_questions#investigateuseFAQ"
              color="blue.500"
            >
              FAQ
            </Link>{" "}
            for more information.)
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
            We use third-party service providers or contractors to help run or improve the Wikimedia
            Sites for you and other users. We give access to your Personal Information to these
            providers or contractors as needed to perform their services for us or to use their tools
            and services. We put requirements, such as confidentiality agreements, in place to help
            ensure that these service providers treat your Personal Information consistently with,
            and no less protective of your privacy than, the principles of this Policy. For further
            information, please see our{" "}
            <Link
              href="/wiki/Special:MyLanguage/Policy:Privacy_policy/Frequently_asked_questions#thirdpartyshareexamplesFAQ"
              color="blue.500"
            >
              FAQ
            </Link>
            .
          </Text>
          <Text mb={4}>
            If you are visiting Wikimedia Sites with your mobile device, we use your IP address to
            provide anonymized or aggregated information to service providers regarding the volume of
            usage in certain areas.
          </Text>
          <Text mb={4}>
            Some of our service providers ask us to post links to their privacy policies; a list of
            these service providers and links to their policies can be found{" "}
            <Link
              href="/wiki/Special:MyLanguage/Policy:Privacy_policy/Supplement"
              color="blue.500"
            >
              on this page
            </Link>
            .
          </Text>
        </>
      ),
    },
    {
      id: "share-to-experiment",
      title: "To Understand & Experiment",
      level: 4,
      content: (
        <>
          <Text mb={4}>
            The open-source software that powers the Wikimedia Sites depends on the contributions of
            volunteer software developers, who spend time writing and testing code to help it improve
            and evolve with our users' needs. To facilitate their work, we give some developers
            limited access to systems that contain your Personal Information, but only as reasonably
            necessary for them to develop and contribute to the Wikimedia Sites.
          </Text>
          <Text mb={4}>
            Similarly, we share non-Personal Information or aggregated information with researchers,
            scholars, academics, and other interested third parties who wish to study the Wikimedia
            Sites. Sharing this Personal Information helps them understand usage, viewing, and
            demographics statistics and patterns. They then can share their findings with us and our
            users so that we can all better understand and improve the Wikimedia Sites.
          </Text>
          <Text mb={4}>
            When we give access to Personal Information to third-party developers or researchers, we
            put requirements, such as reasonable technical and contractual protections, in place to
            help ensure that these service providers treat your Personal Information consistently
            with the principles of this Policy and in accordance with our instructions. If these
            developers or researchers later publish their work or findings, we ask that they not
            disclose your Personal Information. Please note that, despite the obligations we impose
            on developers and researchers, we cannot guarantee that they will abide by our agreement,
            nor do we guarantee that we will regularly screen or audit their projects. (You can learn
            more about re-identification in our{" "}
            <Link
              href="/wiki/Special:MyLanguage/Policy:Privacy_policy/Frequently_asked_questions#reidentifiationFAQ"
              color="blue.500"
            >
              FAQ
            </Link>
            .)
          </Text>
        </>
      ),
    },
    {
      id: "share-because-public",
      title: "Because You Made It Public",
      level: 4,
      content: (
        <Text mb={4}>
          Any information you post publicly on the Wikimedia Sites is just that – public. For
          example, if you put your mailing address on your talk page, that is public, and not
          specifically protected by this Policy. And if you edit without registering or logging into
          your account, your IP address will be seen publicly. Please think carefully about your
          desired level of privacy before you disclose Personal Information on your user page or
          elsewhere.
        </Text>
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
                src="//upload.wikimedia.org/wikipedia/commons/thumb/9/90/WMF_share.png/60px-WMF_share.png"
                alt="Sharing icon"
                width="60px"
                height="60px"
                mr={2}
                srcSet="//upload.wikimedia.org/wikipedia/commons/thumb/9/90/WMF_share.png/90px-WMF_share.png 1.5x, //upload.wikimedia.org/wikipedia/commons/9/90/WMF_share.png 2x"
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
      case 4:
        return (
          <Heading as="h4" id={id} fontSize="md" mb={4}>
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
      <Box float={{ base: "none", md: "right" }} width={{ base: "100%", md: "70%" }} pl={{ base: 0, md: 8 }}>
        {renderHeading(2, "Sharing", "Sharing")}
        
        {sections.map((section, index) => (
          <Box key={index} mb={8}>
            <span id={section.id} />
            {renderHeading(section.level, section.title, section.title.replace(/\s+/g, "_"))}
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
    </Box>
  );
};