import { useEffect, useState } from "react";
import { FlexItem } from "@wordpress/components";
import { StackDivider } from '@chakra-ui/layout';
// import { useTranslation } from "react-i18next";
import { useStore } from "../store";
import { useParams } from "react-router";
import { CommonWikiPageTextContainer, CommonWikiPageGridBox } from "../common/ResponsiveContainer";
import HoverPopover from '../common/HoverPopover';
import { Accordion, Badge, Box, Grid, GridItem, Loader, Span, VStack, Table, Text } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";


function WikiBookPage() {
  // const { t } = useTranslation(["common", "errors"]);
  const { wikiBookStore } = useStore();
  const { loadWikiBook, clearWikiBook, currentWikiBook } = wikiBookStore;
  const { bookId } = useParams();
  const [mounted, setMounted] = useState<boolean>(false);

  // useEffect(() => {
  //   document.title = t("not_found", { ns: "errors" });
  // }, []);
  async function getWikiBook() {
    await loadWikiBook(bookId!);
  }

  useEffect(
    () => {
      if (bookId)
        getWikiBook();

      setMounted(true);

      return () => {
        clearWikiBook();
        setMounted(false);
      };
    },
    [bookId]
  );

  console.log("WIKIBOOK COMPONENT:", JSON.stringify(currentWikiBook));
  if (currentWikiBook && currentWikiBook._id)
    return (
      <CommonWikiPageTextContainer>
        <FlexItem className='w-100'>
          <h3 className='w-100 mw-text mw-subheader m-1' >
            {currentWikiBook?.title}
          </h3>
        </FlexItem>
        {currentWikiBook?.description != 'No description available' && (
          <FlexItem>
            <p className='w-100 mw-text mw-body m-1'>
              {currentWikiBook?.description}
            </p>
          </FlexItem>
        )}
        <FlexItem>
          <CommonWikiPageGridBox >
            <Grid templateColumns="repeat(2, 1fr)" gap="2">
              <GridItem rowSpan={1} colSpan={1}>
                <p className="mw-text fw-bold">Title:</p>
              </GridItem>
              <GridItem rowSpan={1} colSpan={1}>
                <p className='mw-text' >{currentWikiBook.title}</p>
              </GridItem>
            </Grid>

            <StackDivider p='0' backgroundColor='black' border='solid 1px var(--global-color-border, currentColor)' />
            <Grid templateColumns="repeat(2, 1fr)" gap="2">
              <GridItem rowSpan={1} colSpan={1}>
                <p className="mw-text fw-bold">Publication Year:</p>
              </GridItem>
              <GridItem rowSpan={1} colSpan={1}>
                <p className='mw-text' >{currentWikiBook.publicationYear}</p>
              </GridItem>
            </Grid>
            <StackDivider p='0' backgroundColor='black' border='solid 1px var(--global-color-border, currentColor)' />

            <Grid templateColumns="repeat(2, 1fr)" gap="2">
              <GridItem rowSpan={1} colSpan={1}>
                <p className="mw-text fw-bold">Publication Date:</p>
              </GridItem>
              <GridItem rowSpan={1} colSpan={1}>
                <p className='mw-text' >{new Date(currentWikiBook.publicationDate).toLocaleString()}</p>
              </GridItem>
            </Grid>
            <StackDivider p='0' backgroundColor='black' border='solid 1px var(--global-color-border, currentColor)' />

            <Grid templateColumns="repeat(2, 1fr)" gap="2">
              <GridItem rowSpan={1} colSpan={1}>
                <p className="mw-text fw-bold">Primary Topic:</p>
              </GridItem>
              <GridItem rowSpan={1} colSpan={1}>
                <p className='mw-text' >{currentWikiBook.primaryTopic}</p>
              </GridItem>
            </Grid>
            <StackDivider p='0' backgroundColor='black' border='solid 1px var(--global-color-border, currentColor)' />

            <Grid templateColumns="repeat(2, 1fr)" gap="2">
              <GridItem rowSpan={1} colSpan={1}>
                <p className="mw-text fw-bold">Concepts:</p>
              </GridItem>
              <GridItem rowSpan={1} colSpan={1}>
                {currentWikiBook?.concepts && currentWikiBook.concepts.length &&
                  currentWikiBook.concepts.map(
                    (concept, idx) => <Badge key={idx} className='mw-text' variant="solid" colorPalette="#646cffaa">{concept}</Badge>
                  )}
              </GridItem>
            </Grid>
          </CommonWikiPageGridBox>
        </FlexItem>
        <FlexItem className='w-100'>
          <Accordion.Root w="full" variant={"enclosed"} collapsible defaultValue={["b"]}>
            <Accordion.Item w="full" value="0">
              <Accordion.ItemTrigger>
                <Span className='mw-text' fontSize="0.90rem" flex="1">Authors:</Span>
                <Accordion.ItemIndicator />
              </Accordion.ItemTrigger>
              <Accordion.ItemContent w="full">
                <Accordion.ItemBody w={{
                  base: 'full',
                  lg: "40rem"
                }} maxW="unset">
                  {currentWikiBook?.authors && currentWikiBook?.authors.length && (
                    <VStack className="mw-text mw-sm">
                      {currentWikiBook?.authors.map(
                        (author) => (
                          <>
                            <Text pl={2} mb={0} pb={0} textAlign='left' w='100%' key={author.name} fontSize="90%">
                              {author.name}
                            </Text>
                            <Box w="full" px={0}>
                              <Table.Root className="mw-text mw-sm" px={0}>
                                <Table.Header>
                                  <Table.Row fontSize="75%">
                                    <Table.ColumnHeader>Name of Institution</Table.ColumnHeader>
                                    <Table.ColumnHeader textAlign="end">Country Code</Table.ColumnHeader>
                                  </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                  {author.institutions && author.institutions.length &&
                                    author.institutions.map(institution => (
                                      <Table.Row key={institution.display_name} fontSize="75%">
                                        <Table.Cell>{institution.display_name}</Table.Cell>
                                        <Table.Cell textAlign='end'>{institution.country_code}</Table.Cell>
                                      </Table.Row>
                                    ))}
                                </Table.Body>
                              </Table.Root>
                            </Box>
                          </>
                        ))}
                    </VStack>
                  )}
                </Accordion.ItemBody>
              </Accordion.ItemContent>
            </Accordion.Item>
          </Accordion.Root>
        </FlexItem>

        <FlexItem className='w-100'>
          <Accordion.Root w="full" variant={"enclosed"} collapsible defaultValue={["b"]}>
            <Accordion.Item w="full" value="0">
              <Accordion.ItemTrigger>
                <Span className='mw-text' fontSize="0.90rem" flex="1">Where you can find this:</Span>
                <Accordion.ItemIndicator />
              </Accordion.ItemTrigger>
              <Accordion.ItemContent w="full">
                <Accordion.ItemBody w={{
                  base: 'full',
                  lg: "40rem"
                }} maxW="unset">
                  {currentWikiBook?.locations && currentWikiBook?.locations.length && (
                    <Table.Root className="mw-text mw-sm">
                      <Table.Header>
                        <Table.Row fontSize="100%">
                          <Table.ColumnHeader>Name</Table.ColumnHeader>
                          <Table.ColumnHeader>Org Name</Table.ColumnHeader>
                          <Table.ColumnHeader w="33%" textAlign="end">Source Url</Table.ColumnHeader>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {currentWikiBook?.locations.filter(l => l.isOpenAccess).map(
                          (loc) => (
                            <Table.Row key={loc.name} fontSize="75%">
                              <Table.Cell>{loc.name}</Table.Cell>
                              <Table.Cell>{loc.orgName}</Table.Cell>
                              <Table.Cell textAlign="end">
                                <HoverPopover
                                  label="See Source"
                                  onClick={() => window.open("_blank", loc.pdfUrl)}
                                >
                                  <Text as="a">{loc.pdfUrl}</Text>
                                </HoverPopover>
                              </Table.Cell>
                            </Table.Row>
                          ))}
                      </Table.Body>
                    </Table.Root>
                  )}
                </Accordion.ItemBody>
              </Accordion.ItemContent>
            </Accordion.Item>
          </Accordion.Root>
        </FlexItem>
        {/* <FlexItem>
          <ResponsiveContainer extraClasses="wikipage">
            <FlexItem>
              <CommonWikiPageTextContainer style={{ backgroundColor: 'red'}}>
                {articleSentences && articleSentences.length &&
                  articleSentences.map((sentence: string, sentenceIdx: number) => (
                    <FlexItem key={sentenceIdx}>
                      <p>{sentence}</p>
                    </FlexItem>
                  ))}
                <br />
                <br />
                {summarySentences && summarySentences.length &&
                  summarySentences.map((smySentence: string, smySentenceIdx: number) => (
                    <FlexItem key={smySentenceIdx}>
                      <p>{smySentence}</p>
                    </FlexItem>
                  ))}
              </CommonWikiPageTextContainer>
            </FlexItem>
            <FlexItem>

            </FlexItem>
          </ResponsiveContainer>
        </FlexItem> */}
      </CommonWikiPageTextContainer>
    );

  return <Loader color="gray.900" />
}

export default observer(WikiBookPage);