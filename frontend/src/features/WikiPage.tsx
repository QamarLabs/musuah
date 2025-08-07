import React, { useEffect, useMemo, useRef, useState } from "react";
import { Divider, StackDivider } from '@chakra-ui/layout';
import { useTranslation } from "react-i18next";
import { useStore } from "../store";
import { useParams } from "react-router";
import { CommonWikiPageTextContainer, CommonWikiPageGridBox } from "../common/ResponsiveContainer";
import { Box, Grid, GridItem, HStack, Loader, Span, useDisclosure, VStack } from "@chakra-ui/react";
import { LuCheck, LuPen, LuTrash, LuX } from "react-icons/lu";
import MWTextEditor from "../common/TextEditor";
import { MWCommonButton, MWIconButton } from "../common/Buttons";
import ConfirmationDialog from "../common/ConfirmationReasonDialog";
import { wikipagesApi } from "../api/wikipagesApi";
import { InfoAlert, WarningAlert } from "../common/Alerts";
import { DeleteWikiPageRequestRecord, WikiPageRequestRecord } from "../models/wikipage";
import { ATTRIBUTES_GIVEN_OWN_SECTION } from "../common/constants/wikipage";


export default function WikiPage() {
  const { t } = useTranslation(["common", "errors", "form"]);
  const {
    authStore,
    deleteWikiPageRequestStore,
    wikiPageStore,
    wikiPageRequestStore,
  } = useStore();
  const [currentWikiPageRequest, setCurrentWikiPageRequest] = useState<WikiPageRequestRecord | undefined>(undefined);
  const [currentDeleteWikiPageRequest, setCurrentDeleteWikiPageRequest] = useState<DeleteWikiPageRequestRecord | undefined>(undefined);

  const { pageId } = useParams();
  const { open: doEdit, setOpen: setDoEdit } = useDisclosure();
  const { loadWikiPage, currentWikiPage, clearWikiPage } = wikiPageStore;
  const { authUserToken } = authStore;
  const {
    createDeleteWikiPageRequest
  } = deleteWikiPageRequestStore;
  const {
    createWikiPageRequest
  } = wikiPageRequestStore;
  const [articleSentences, setArticleSentences] = useState<string[] | undefined>(undefined);
  const [summarySentences, setSummarySentences] = useState<string[] | undefined>(undefined);
  const [mounted, setMounted] = useState<boolean>(false);
  const [
    pageFetched,
    setPageFetched
  ] = useState<boolean>(false);
  const textEditorRef = useRef<any>(null);
  async function loadRequests() {
    const yourRequest = await wikipagesApi.getWikiPageRequest(currentWikiPage!.pageid.toString(), authUserToken!);
    const yourDeleteRequest = await wikipagesApi.getDeleteWikiPageRequest(currentWikiPage!.pageid.toString(), authUserToken!);
  
    setCurrentWikiPageRequest(yourRequest);
    setCurrentDeleteWikiPageRequest(yourDeleteRequest);
    setMounted(true);
  }

  useEffect(() => {
    if (currentWikiPage && authUserToken)
      loadRequests();
  }, [currentWikiPage]);
  // useEffect(() => {
  //   document.title = t("not_found", { ns: "errors" });
  // }, []);
  useEffect(
    () => {
      if (pageId)
        loadWikiPage(pageId)
          .then(wikipge => {
            setArticleSentences(wikipge ? wikipge.text.split(/(?<=[.!?])\s+/) : undefined);
            setSummarySentences(wikipge ? wikipge.summary.split(/(?<=[.!?])\s+/) : undefined);

          });

      setPageFetched(true);
      return () => {
        clearWikiPage();
      };
    },
    [pageId]
  );

  const onSave = async () => {
    const textEditorValue = textEditorRef.current.getContent();
    console.log("textEditorValue:", textEditorValue)
    try {
      if (currentWikiPage)
        await createWikiPageRequest({
          title: currentWikiPage.title,
          text: textEditorValue,
          articleId: currentWikiPage._id,
          pageid: currentWikiPage.pageid,
          revid: currentWikiPage.revid,
          word_count: currentWikiPage.word_count,
          summary: currentWikiPage.summary,
          attributes: currentWikiPage.attributes
        })

      setDoEdit(false);

      await loadRequests();
    } catch (err) {
      console.log("on Save create wiki page request error:", err);
    } finally {

    }
  };

  const onDelete = async (values: { reasonToConfirm: string }) => {
    try {
      // debugger
      if (currentWikiPage)
        await createDeleteWikiPageRequest({
          articleId: currentWikiPage._id,
          reasonToDelete: values.reasonToConfirm
        })

      await loadRequests();
      setDoEdit(false);
    } catch (err) {
      console.log("on Delete create delete wiki page request error:", err);
    } finally {

    }
  };

  const showEditButton = useMemo(() => !doEdit && !currentWikiPageRequest, [currentWikiPageRequest, doEdit])
  const showDeleteButton = useMemo(() => !doEdit && !currentDeleteWikiPageRequest, [currentDeleteWikiPageRequest, doEdit])
  const gridAttributes = useMemo(() => {
    let result: {[key:string]: any} = {};
    Object.keys(currentWikiPage?.attributes ?? {})
          .filter(k => !ATTRIBUTES_GIVEN_OWN_SECTION.includes(k))
          .forEach(k => result[k] = currentWikiPage?.attributes);

    return result;
  }, [currentWikiPage]);

  console.log(pageFetched)

  if (currentWikiPage)
    return (
      <VStack minH="100vh" px={0} mx={0}>
        {(currentWikiPageRequest || currentDeleteWikiPageRequest) && (
          <VStack w='full' px={{ base: '2rem', xl: 'unset' }}>
            {currentDeleteWikiPageRequest && <WarningAlert title={t("alerts.pendingDeleteRequestTitle", { ns: "common" })} description={t("alerts.pendingDeleteRequestDesc", { ns: "common" })} />}
            {currentWikiPageRequest && <InfoAlert title={t("alerts.pendingChangeRequestTitle", { ns: "common" })} description={t("alerts.pendingChangeRequestDesc", { ns: "common" })} />}
          </VStack>
        )}
        <CommonWikiPageTextContainer position="relative" px={{ base: '2rem', xl: 'unset' }}>
          {authUserToken && (
            <HStack zIndex={1000} position="absolute" top={-2} right={'2rem'}>
              {!mounted 
              ? <Loader color='black' /> 
              : (
                <>
                  {doEdit
                    ? (
                      <>
                        <MWCommonButton onClick={onSave} loading={wikiPageRequestStore.loadingUpsert} disabled={wikiPageRequestStore.loadingUpsert}>
                          {t("buttons.save", { ns: "form" })}
                          <LuCheck />
                        </MWCommonButton>
                        <MWIconButton onClick={() => {
                          if (textEditorRef.current)
                            textEditorRef.current.destroyTextEditor();
                          setDoEdit(false)
                        }}>
                          {t("buttons.cancel", { ns: "form" })}
                          <LuX />
                        </MWIconButton>
    
                      </>
                    )
                    : (
                      <>
                        {showEditButton && (
                          <MWIconButton onClick={() => setDoEdit(true)}>
                            {t("buttons.edit", { ns: "form" })}
                            <LuPen />
                          </MWIconButton>
                        )}
                        {showDeleteButton && (
                          <ConfirmationDialog
                            triggerChildren={
                              <MWIconButton bg="red.400" onClick={() => setDoEdit(false)}>
                                {t("buttons.requestToDelete", { ns: "form" })}
                                <LuTrash />
                              </MWIconButton>
                            }
                            confirmationTitle={`${t("confirmation.deleteTitle", { ns: "form" })}"${currentWikiPage?.title}"${t("confirmation.forDeletion", { ns: "form" })}`}
                            onConfirm={onDelete}
                            onConfirmLoading={deleteWikiPageRequestStore.loadingUpsert}
                          />
                        )}
                      </>
                    )}
                </>
              )}
            </HStack>
          )}
          <Box className='w-100'>
            <h3 className='w-100 mw-text mw-subheader mb-2' >
              {currentWikiPage?.title}
            </h3>
          </Box>
          {doEdit
            ? (
              <>
                <VStack minW="50vw" minH="100vh" float='left' w='full' bg='brown' id="text-editor-container">
                  <MWTextEditor
                    ref={textEditorRef}
                    initialContent={`${currentWikiPage.text}\n\n`}
                  />
                </VStack>
              </>
            )
            : (
              <VStack justify="start">
                <HStack 
                  direction={{ base: "column", lg: "row" }}
                  justify={{ base: "space-around", lg: "space-between"}}
                  px={0} py={0}
                >
                  <CommonWikiPageTextContainer minH="unset" justify="space-between">
                    <>
                      <Box
                        textAlign={'left'}
                        w={{ base: 'full', lg: '95%' }}
                        fontSize="125%"
                        fontWeight="light"
                        borderBottomWidth="thin"
                        borderBottomColor="gray.700"
                        borderBottomStyle="solid"
                        mb={2}
                      >
                        <Span ml={{ lg: '0.25rem' }}>{t("wikipages.summary", { ns: "form" })}</Span>
                      </Box>
                      {summarySentences && summarySentences.length &&
                        summarySentences.map((smySentence: string, smySentenceIdx: number) => (
                          <Span key={smySentenceIdx}>{smySentence}</Span>
                        ))}
                    </>
                  </CommonWikiPageTextContainer>
                  <CommonWikiPageGridBox>
                    <Box textAlign='center' className='w-100'>
                      <Span className="mw-text mw-bold-small-header">{currentWikiPage.title}</Span>
                    </Box>
                    {
                      currentWikiPage.attributes &&
                      Object.keys(gridAttributes).map((k, i) => (
                        <React.Fragment key={i}>
                          <StackDivider p='0' backgroundColor='black' border='solid 1px var(--global-color-border, currentColor)' />
                          <Grid templateColumns="repeat(2, 1fr)" gap="2">
                            <GridItem rowSpan={1} colSpan={1}>
                              <p className="mw-text fw-bold">{k}:</p>
                            </GridItem>
                            <GridItem rowSpan={1} colSpan={1}>
                              <p className='mw-text' >{gridAttributes[k]}</p>
                            </GridItem>
                          </Grid>
                        </React.Fragment>
                      ))
                    }

                    {/* <StackDivider p='0' backgroundColor='black' border='solid 1px var(--global-color-border, currentColor)' />
                    <Grid templateColumns="repeat(2, 1fr)" gap="2">
                      <GridItem rowSpan={1} colSpan={1}>
                        <p className="mw-text fw-bold">Example 2:</p>
                      </GridItem>
                      <GridItem rowSpan={1} colSpan={1}>
                        <p className='mw-text' >colSpan=5</p>
                      </GridItem>
                    </Grid> */}

                  </CommonWikiPageGridBox>
                </HStack>

                <br />
                <Divider />
                <CommonWikiPageTextContainer justify="space-around">
                  {articleSentences && articleSentences.length &&
                    articleSentences.map((sentence: string, sentenceIdx: number) => (
                      <Box textAlign='left' key={sentenceIdx}>
                        <p>{sentence}</p>
                      </Box>
                    ))}
                  <br />

                </CommonWikiPageTextContainer>
              </VStack>
            )}
        </CommonWikiPageTextContainer>
      </VStack>
    );
}