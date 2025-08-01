import React, { useEffect, useState } from "react";
import { FlexItem } from "@wordpress/components";
import { Divider, StackDivider } from '@chakra-ui/layout';
// import { useTranslation } from "react-i18next";
import { useStore } from "../store";
import { useParams } from "react-router";
import ResponsiveContainer, { CommonWikiPageTextContainer, CommonWikiPageGridBox } from "../common/ResponsiveContainer";
import { Box, Grid, GridItem, Span } from "@chakra-ui/react";


export default function WikiPage() {
  // const { t } = useTranslation(["common", "errors"]);
  const { wikiPageStore } = useStore();
  const { pageId } = useParams();
  const { loadWikiPage, currentWikiPage, clearWikiPage } = wikiPageStore;
  const [articleSentences, setArticleSentences] = useState<string[] | undefined>(undefined);
  const [summarySentences, setSummarySentences] = useState<string[] | undefined>(undefined);
  const [
    pageFetched,
    setPageFetched
  ] = useState<boolean>(false);

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

  console.log('currentWikiPage on component:', currentWikiPage)
  console.log('pageFetched:', pageFetched);
  if (currentWikiPage)
    return (
      <CommonWikiPageTextContainer px={{ base: '2rem', xl: 'unset' }}>
        <Box className='w-100'>
          <h3 className='w-100 mw-text mw-subheader mb-2' >
            {currentWikiPage?.title}
          </h3>
        </Box>
        <ResponsiveContainer extraClasses="wikipage">
          <CommonWikiPageTextContainer minH="unset" justify="space-around" style={{ backgroundColor: 'sliver' }}>
            <>
              <Box
                textAlign={'left'}
                w={{ base: 'full', lg: '95%'}}
                fontSize="125%"
                fontWeight="light"
                borderBottomWidth="thin"
                borderBottomColor="gray.700"
                borderBottomStyle="solid"
                mb={2}
              >
                <Span ml={{ lg: '0.25rem' }}>Summary</Span>
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
              Object.keys(currentWikiPage.attributes).map((k, i) => (
                <React.Fragment key={i}>
                  <StackDivider p='0' backgroundColor='black' border='solid 1px var(--global-color-border, currentColor)' />
                  <Grid templateColumns="repeat(2, 1fr)" gap="2">
                    <GridItem rowSpan={1} colSpan={1}>
                      <p className="mw-text fw-bold">{k}:</p>
                    </GridItem>
                    <GridItem rowSpan={1} colSpan={1}>
                      <p className='mw-text' >{currentWikiPage.attributes[k]}</p>
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

          <br />
          <Divider />
          <CommonWikiPageTextContainer justify="space-around" style={{ backgroundColor: 'red' }}>
            {articleSentences && articleSentences.length &&
              articleSentences.map((sentence: string, sentenceIdx: number) => (
                <Box textAlign='left' key={sentenceIdx}>
                  <p>{sentence}</p>
                </Box>
              ))}
            <br />

          </CommonWikiPageTextContainer>
        </ResponsiveContainer>
      </CommonWikiPageTextContainer>
    );
}