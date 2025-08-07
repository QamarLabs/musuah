import { useEffect, useMemo, useState } from "react";
import { StackDivider } from '@chakra-ui/layout';
import { useStore } from "../store";
import { useParams } from "react-router";
import { CommonWikiPageTextContainer, CommonWikiPageGridBox } from "../common/ResponsiveContainer";
import HoverPopover from '../common/HoverPopover';
import { Accordion, Badge, Box, Grid, GridItem, Loader, Span, VStack, Table, Text, HStack } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { DeleteWikiBookRequest } from "../models/wikibook";
import { WarningAlert } from "../common/Alerts";
import { LuTrash } from "react-icons/lu";
import { MWIconButton } from '../common/Buttons';
import ConfirmationDialog from "../common/ConfirmationReasonDialog";
import { wikiBooksApi } from "../api/wikibooksApi";
import { useTranslation } from "react-i18next";
import LoadingSkeleton from "../common/LoadingSkeleton";

function WikiBookPage() {
  const { t } = useTranslation(["common", "errors", "form"]);
  const { authStore, commonStore, wikiBookStore, deleteWikiBookRequestStore } = useStore();
  const { language } = commonStore;
  const { authUserToken } = authStore;
  const { loadWikiBook, clearWikiBook, currentWikiBook } = wikiBookStore;
  const { 
    createDeleteWikiBookRequest 
  } = deleteWikiBookRequestStore;
  const { bookId } = useParams();

  const [currentDeleteWikibookRequest, setCurrentWikibookRequest] = useState<DeleteWikiBookRequest | undefined>(undefined);
  const [mounted, setMounted] = useState<boolean>(false);

  async function loadRequests() {
    const yourDeleteRequest = await wikiBooksApi.getWikiBookDeleteRequest(currentWikiBook?._id!, authUserToken!)

    setCurrentWikibookRequest(yourDeleteRequest);
    setMounted(true);
  }



  // useEffect(() => {
  //   document.title = t("not_found", { ns: "errors" });
  // }, []);
  async function getWikiBook() {
    await loadWikiBook(bookId!);
  }

  useEffect(() => {
    if(currentWikiBook && authUserToken)
      loadRequests();
  }, [currentWikiBook]);

  useEffect(
    () => {
      if (bookId)
        getWikiBook();

      return () => {
        clearWikiBook();
        setMounted(false);
      };
    },
    [bookId]
  );

  const showDeleteButton = useMemo(() => !currentDeleteWikibookRequest, [currentDeleteWikibookRequest])
  const onDelete = async (values: { reasonToConfirm: string }) => {
    try {
      // debugger
      if (currentWikiBook)
        await createDeleteWikiBookRequest({
          bookId: currentWikiBook._id,
          reasonToDelete: values.reasonToConfirm
        })

      await loadRequests();
    } catch (err) {
      console.log("on Delete create delete wiki page request error:", err);
    } finally {

    }
  };

  if (currentWikiBook && currentWikiBook._id)
    return (
      <VStack px={0} py={0}>
        {currentDeleteWikibookRequest && <WarningAlert title={t("alerts.pendingDeleteRequestTitle", { ns: "common" })} description={t("alerts.pendingDeleteRequestWikibookDesc", { ns: "common" })} />}
        <CommonWikiPageTextContainer position='relative' justify="start">
          {authUserToken && (
              <HStack zIndex={1000} position="absolute" top={-2} right={'0rem'}>
                  {!mounted 
                      ? <Loader color='black' /> 
                      : (
                        <>
                          {showDeleteButton && (
                            <ConfirmationDialog
                              triggerChildren={
                                <MWIconButton bg="red.400" >
                                  {t("buttons.requestToDelete", { ns: "form"})}
                                  <LuTrash />
                                </MWIconButton>
                              }
                              confirmationTitle={`${t("confirmation.deleteTitle", { ns: "form" })} "${currentWikiBook?.title}" ${t("confirmation.forDeletion", { ns: "form" })}`}
                              onConfirm={onDelete}
                              onConfirmLoading={deleteWikiBookRequestStore.loadingUpsert}
                            />
                          )}
                        </>
                      )
                    }
              </HStack>
          )}
          <Box w='full' mt={2}>
            <h3 className='w-100 mw-text mw-subheader m-1' >
              {currentWikiBook?.title}
            </h3>
          </Box>
          {currentWikiBook?.description != 'No description available' && (
            <Box>
              <p className='w-100 mw-text mw-body m-1'>
                {currentWikiBook?.description}
              </p>
            </Box>
          )}
          <Box>
            <CommonWikiPageGridBox >
              <Grid templateColumns="repeat(2, 1fr)" gap="2">
                <GridItem rowSpan={1} colSpan={1}>
                  <p className="mw-text fw-bold">{t("title", { ns: "common" })}</p>
                </GridItem>
                <GridItem rowSpan={1} colSpan={1}>
                  <p className='mw-text' >{currentWikiBook.title}</p>
                </GridItem>
              </Grid>

              <StackDivider p='0' backgroundColor='black' border='solid 1px var(--global-color-border, currentColor)' />
              <Grid templateColumns="repeat(2, 1fr)" gap="2">
                <GridItem rowSpan={1} colSpan={1}>
                  <p className="mw-text fw-bold">{t("publicationYear", { ns: "common" })}</p>
                </GridItem>
                <GridItem rowSpan={1} colSpan={1}>
                  <p className='mw-text' >{currentWikiBook.publicationYear}</p>
                </GridItem>
              </Grid>
              <StackDivider p='0' backgroundColor='black' border='solid 1px var(--global-color-border, currentColor)' />

              <Grid templateColumns="repeat(2, 1fr)" gap="2">
                <GridItem rowSpan={1} colSpan={1}>
                  <p className="mw-text fw-bold">{t("publicationDate", { ns: "common" })}</p>
                </GridItem>
                <GridItem rowSpan={1} colSpan={1}>
                  <p className='mw-text' >
                    {new Date(currentWikiBook.publicationDate).toLocaleString(language ?? "en", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </p>
                </GridItem>
              </Grid>
              <StackDivider p='0' backgroundColor='black' border='solid 1px var(--global-color-border, currentColor)' />

              <Grid templateColumns="repeat(2, 1fr)" gap="2">
                <GridItem rowSpan={1} colSpan={1}>
                  <p className="mw-text fw-bold">{t("primaryTopic", { ns: "common" })}</p>
                </GridItem>
                <GridItem rowSpan={1} colSpan={1}>
                  <p className='mw-text' >{currentWikiBook.primaryTopic}</p>
                </GridItem>
              </Grid>
              <StackDivider p='0' backgroundColor='black' border='solid 1px var(--global-color-border, currentColor)' />

              <Grid templateColumns="repeat(2, 1fr)" gap="2">
                <GridItem rowSpan={1} colSpan={1}>
                  <p className="mw-text fw-bold">{t("concepts", { ns: "common" })}</p>
                </GridItem>
                <GridItem rowSpan={1} colSpan={1}>
                  {currentWikiBook?.concepts && currentWikiBook.concepts.length &&
                    currentWikiBook.concepts.map(
                      (concept, idx) => <Badge key={idx} className='mw-text' variant="solid" colorPalette="#646cffaa">{concept}</Badge>
                    )}
                </GridItem>
              </Grid>
            </CommonWikiPageGridBox>
          </Box>
          <Box w='full'>
            <Accordion.Root w="full" variant={"enclosed"} collapsible defaultValue={["b"]}>
              <Accordion.Item w="full" value="0">
                <Accordion.ItemTrigger>
                  <Span className='mw-text' fontSize="0.90rem" flex="1">{t("authors", { ns: "common" })}</Span>
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
                                      <Table.ColumnHeader>{t("nameOfInstitution", { ns: "common" })}</Table.ColumnHeader>
                                      <Table.ColumnHeader textAlign="end">{t("countryCode", { ns: "common" })}</Table.ColumnHeader>
                                    </Table.Row>
                                  </Table.Header>
                                  <Table.Body>
                                    {author.institutions && author.institutions.length ?
                                      author.institutions.map(institution => (
                                        <Table.Row key={institution.display_name} fontSize="75%">
                                          <Table.Cell>{institution.display_name}</Table.Cell>
                                          <Table.Cell textAlign='end'>{institution.country_code}</Table.Cell>
                                        </Table.Row>
                                      )) : <Table.Row><Table.Cell colSpan={2} textAlign='center'>
                                        {t("noAuthorWithInstitution", { ns: "common" })}
                                      </Table.Cell></Table.Row>}
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
          </Box>

          <Box w='full'>
            <Accordion.Root w="full" variant={"enclosed"} collapsible defaultValue={["b"]}>
              <Accordion.Item w="full" value="0">
                <Accordion.ItemTrigger>
                  <Span className='mw-text' fontSize="0.90rem" flex="1">{t("whereYouCanFindThis", {ns: "common"})}</Span>
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
                            <Table.ColumnHeader>{t("name", {ns: "common"})}</Table.ColumnHeader>
                            <Table.ColumnHeader>{t("orgName", {ns: "common"})}</Table.ColumnHeader>
                            <Table.ColumnHeader w="33%" textAlign="end">{t("sourceUrl", {ns: "common"})}</Table.ColumnHeader>
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
          </Box>
        </CommonWikiPageTextContainer>
      </VStack>
    );

  return <LoadingSkeleton />
}

export default observer(WikiBookPage);