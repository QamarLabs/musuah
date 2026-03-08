import {
  Box,
  Text,
  Heading,
  Link,
  List,
  ListItem,
  VStack,
} from "@chakra-ui/react";
import { InfoCollapsibleSection } from "../../common/Accordion";

export const PrivacyPolicyCollectionPart2 = () => {
  return (
    <>
      <VStack
        className="mw-text"
        align="start"
        spaceY={4}
        mx="10%"
        textAlign="left"
      >
        <Box
          float="right"
          width="100%"
          pl="2em"
          className="mobile-float-reset mobile-padding-reset"
        >
          <Text mb={4}>
            At Qamar Labs, our mission is to be honest, serve the Ummah, and
            deliver quality over quantity. This extends to how we handle
            information about your use of our mobile encyclopedia. We want to
            make our app better for you by learning more about how you use
            it—while respecting your privacy every step of the way.
          </Text>
          <Text mb={4}>
            Examples of what we learn include: which articles are most popular,
            what features you find helpful, how you navigate through the app,
            and whether certain improvements make your experience better. We
            keep all information related to your use of our app confidential,
            except as provided in this Policy.
          </Text>
          <Box float="right" className="nomobile" mb={6}>
            <Link href="#top" color="blue.500" mr={2}>
              Back to top
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
          <Heading
            className="mw-text"
            as="h4"
            size="md"
            id="Information_We_Receive_Automatically"
            mb={4}
          >
            Information We Receive Automatically
          </Heading>
        </Box>

        <Box
          float="right"
          width="100%"
          pl="2em"
          className="mobile-float-reset mobile-padding-reset"
        >
          <Text mb={3}>
            Like most mobile applications, we receive some information
            automatically when you use our encyclopedia. This is standard
            practice and helps us ensure the app works properly across different
            devices.
          </Text>

          <Text fontWeight="bold" mb={2}>
            This information may include:
          </Text>

          <List.Root listStyle="disc" pl={5} mb={4}>
            <ListItem>
              The type of device you are using (manufacturer and model)
            </ListItem>
            <ListItem>Your device's operating system and version</ListItem>
            <ListItem>App version and settings</ListItem>
            <ListItem>Crash logs and performance data</ListItem>
            <ListItem>Which pages you view and for how long</ListItem>
            <ListItem>
              The date and time of your interactions with the app
            </ListItem>
            <ListItem>
              Your general region (country-level, not precise location)
            </ListItem>
          </List.Root>

          <Text mb={3}>
            <Box as="span" fontWeight="bold">
              Put simply, we use this information to enhance your experience.
            </Box>{" "}
            For example, we use it to:
          </Text>

          <List.Root listStyle="disc" pl={5} mb={4}>
            <ListItem>Optimize the app for your specific device</ListItem>
            <ListItem>Fix bugs and improve performance</ListItem>
            <ListItem>
              Understand which articles are most valuable to our users
            </ListItem>
            <ListItem>Test new features to see what works best</ListItem>
            <ListItem>Analyze trends to make content more accessible</ListItem>
          </List.Root>

          <Text mb={4} fontStyle="italic">
            All of this is done with anonymized, aggregated data that cannot be
            used to identify you personally.
          </Text>

          <Box float="right" className="nomobile" mb={6}>
            <Link href="#top" color="blue.500" mr={2}>
              Back to top
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
          <Heading
            className="mw-text"
            as="h4"
            size="md"
            id="Information_We_Collect"
            mb={4}
          >
            Local Storage & Data Collection Technologies
          </Heading>
        </Box>

        <Box
          float="right"
          width="100%"
          pl="2em"
          className="mw-text mobile-float-reset mobile-padding-reset"
        >
          <Text mb={3}>
            To make your experience smoother and enable features like offline
            reading, we use standard technologies that store data locally on
            your device. These include:
          </Text>

          <List.Root listStyle="disc" pl={5} mb={4}>
            <ListItem>
              <Box as="span" fontWeight="bold">
                Local Storage:
              </Box>{" "}
              Saves your preferences and recently read articles on your device
            </ListItem>
            <ListItem>
              <Box as="span" fontWeight="bold">
                Cookies:
              </Box>{" "}
              Small text files that remember your settings (used primarily if
              you access our web version)
            </ListItem>
            <ListItem>
              <Box as="span" fontWeight="bold">
                App Cache:
              </Box>{" "}
              Stores content so you can access articles offline
            </ListItem>
          </List.Root>

          <Text mb={4}>
            We recognize that some of these technologies can be misused by
            others, which is why we want to be completely transparent about how
            and why we use them. We will{" "}
            <Box as="span" fontWeight="bold">
              never
            </Box>{" "}
            use third-party tracking cookies or data collection tools without
            your explicit permission.
          </Text>

          <InfoCollapsibleSection title="📱 How We Use Locally Stored Data">
            <Text mb={3}>
              Local storage helps us provide you with a better, more
              personalized experience while keeping your data on your device.
              Here's how:
            </Text>

            <List.Root listStyle="disc" pl={5} spaceY={3}>
              <ListItem>
                <Box as="span" fontWeight="bold">
                  Offline Reading:
                </Box>{" "}
                When you save articles to read later, they are stored locally on
                your device. This means you can access them without an internet
                connection, and we never see which articles you've saved.
              </ListItem>

              <ListItem>
                <Box as="span" fontWeight="bold">
                  Your Preferences:
                </Box>{" "}
                If you adjust settings like text size or theme (light/dark
                mode), these preferences are saved locally so you don't have to
                set them each time you open the app.
              </ListItem>

              <ListItem>
                <Box as="span" fontWeight="bold">
                  Recently Read:
                </Box>{" "}
                We may store a list of your recently viewed articles locally to
                make it easy for you to pick up where you left off. This
                information never leaves your device.
              </ListItem>

              <ListItem>
                <Box as="span" fontWeight="bold">
                  Performance Optimization:
                </Box>{" "}
                We cache certain content to make the app load faster and reduce
                data usage. This is standard practice and improves your
                experience.
              </ListItem>

              <ListItem>
                <Box as="span" fontWeight="bold">
                  Bookmarks/Favorites:
                </Box>{" "}
                Your saved articles are stored only on your device unless you
                explicitly choose to sync them (and we don't offer syncing
                features that would require us to store this information).
              </ListItem>
            </List.Root>

            <Text mt={4}>
              The key principle is this: information that is personal to
              you—like what you read, save, or bookmark—stays on your device
              unless you explicitly choose to share it.
            </Text>
          </InfoCollapsibleSection>

          <Text mt={4} id="KnowMoreCookiesReturn">
            <Box as="span" fontWeight="bold">
              Want to know more?
            </Box>{" "}
            We use only essential local storage that is necessary for the app to
            function properly. We do not use any third-party cookies for
            advertising or tracking purposes. Our approach reflects our
            commitment to quality over quantity—we collect only what we need to
            serve you better.
          </Text>

          <Text mt={4} id="LimitStorageReturn">
            <Box as="span" fontWeight="bold">
              You're in control.
            </Box>{" "}
            You can clear locally stored data at any time through your device
            settings:
          </Text>

          <List.Root listStyle="disc" pl={5} mt={2} mb={4}>
            <ListItem>
              On iOS: Settings → General → iPhone Storage → [App Name]
            </ListItem>
            <ListItem>
              On Android: Settings → Apps → [App Name] → Storage → Clear Data
            </ListItem>
          </List.Root>

          <Text mb={4}>
            Please note that if you clear locally stored data, you may lose your
            saved articles, preferences, and reading history. Some features may
            need to be reconfigured.
          </Text>

          <Text mb={4} id="PublicLogsReturn">
            <Box as="span" fontWeight="bold">
              Important Note:
            </Box>{" "}
            Unlike many online platforms, we do not maintain public logs of user
            activity. Since we don't require accounts, there are no usernames or
            public profiles associated with your reading activity. Your use of
            our encyclopedia is private.
          </Text>

          <Box
            bg="green.50"
            p={4}
            borderRadius="md"
            borderLeft="4px solid"
            borderLeftColor="green.500"
            mb={4}
          >
            <Text fontWeight="bold" mb={2}>
              ✅ Qamar Labs Commitment:
            </Text>
            <List.Root spaceY={1}>
              <ListItem>• No third-party tracking cookies</ListItem>
              <ListItem>• No advertising trackers</ListItem>
              <ListItem>
                • No selling of your data (we don't have any to sell)
              </ListItem>
              <ListItem>• Local storage only for app functionality</ListItem>
              <ListItem>• Your reading habits remain private to you</ListItem>
            </List.Root>
          </Box>

          <Text mb={4}>
            If you ever come across any data collection tool in our app that
            concerns you, or if you have questions about how we handle
            information, please contact us immediately. We take our commitment
            to honesty and the Ummah seriously.
          </Text>

          <Box float="right" className="nomobile" mb={6}>
            <Link href="#top" color="blue.500" mr={2}>
              Back to top
            </Link>
          </Box>
        </Box>

        {/* Summary section */}
        <Box
          float="right"
          width="100%"
          pl="2em"
          className="mobile-float-reset mobile-padding-reset"
          mt={4}
        >
          <Heading className="mw-text" as="h4" size="sm" mb={3}>
            📋 Part 2 Summary: What You Should Know
          </Heading>

          <List.Root spaceY={2}>
            <ListItem>
              <Box as="span" fontWeight="bold">
                ✓ Automatic information:
              </Box>{" "}
              Basic device and usage data (anonymized) to improve the app
            </ListItem>
            <ListItem>
              <Box as="span" fontWeight="bold">
                ✓ Local storage:
              </Box>{" "}
              Saves your preferences and articles on YOUR device, not ours
            </ListItem>
            <ListItem>
              <Box as="span" fontWeight="bold">
                ✓ Offline reading:
              </Box>{" "}
              Your saved articles stay private on your device
            </ListItem>
            <ListItem>
              <Box as="span" fontWeight="bold">
                ✓ No tracking:
              </Box>{" "}
              We don't use third-party cookies or follow you across the internet
            </ListItem>
            <ListItem>
              <Box as="span" fontWeight="bold">
                ✓ You're in control:
              </Box>{" "}
              You can clear all locally stored data anytime
            </ListItem>
          </List.Root>

          <Text mt={4} fontStyle="italic">
            At Qamar Labs, we're building apps for the Ummah with honesty and
            quality over quantity. Your privacy is not an afterthought—it's
            built into how we design our applications.
          </Text>
        </Box>
      </VStack>
    </>
  );
};
