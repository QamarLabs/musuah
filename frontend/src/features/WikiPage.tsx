import { useEffect, useState } from "react";
import {  FlexItem } from "@wordpress/components";
import { StackDivider } from '@chakra-ui/layout';
// import { useTranslation } from "react-i18next";
import { useStore } from "../store";
import { useParams } from "react-router";
import ResponsiveContainer, { CommonWikiPageTextContainer, CommonWikiPageGridBox } from "../common/ResponsiveContainer";
import { Grid, GridItem } from "@chakra-ui/react";


export default function WikiPage() {
  // const { t } = useTranslation(["common", "errors"]);
  const { wikiPageStore } = useStore();
  const { pageId } = useParams();
  const { loadWikiPage, currentWikiPage, clearWikiPage } = wikiPageStore;
  const [articleSentences, setArticleSentences] = useState<string[] | undefined>(undefined);
  const [summarySentences, setSummarySentences] = useState<string[] | undefined>(undefined);
  const [
    pageFetched, 
    setPageFetched] = useState<boolean>(false);

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
      <CommonWikiPageTextContainer>
        <FlexItem className='w-100'>
          <h3 className='w-100 mw-text mw-subheader m-1' >
            {currentWikiPage?.title}
          </h3>
        </FlexItem>
        <FlexItem>
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
              <CommonWikiPageGridBox >
                <h3 className='mw-text mw-bold-small-header w-100'>
                  {currentWikiPage.title}
                </h3>
                <StackDivider p='0' backgroundColor='black' border='solid 1px var(--global-color-border, currentColor)' />
                <Grid templateColumns="repeat(2, 1fr)" gap="2">
                  <GridItem rowSpan={1} colSpan={1}>
                    <p className="mw-text fw-bold">Example:</p>
                  </GridItem>
                  <GridItem rowSpan={1} colSpan={1}>
                    <p className='mw-text' >colSpan=2</p>
                  </GridItem>
                </Grid>

                <StackDivider p='0' backgroundColor='black' border='solid 1px var(--global-color-border, currentColor)' />
                <Grid templateColumns="repeat(2, 1fr)" gap="2">
                  <GridItem rowSpan={1} colSpan={1}>
                    <p className="mw-text fw-bold">Example 2:</p>
                  </GridItem>
                  <GridItem rowSpan={1} colSpan={1}>
                    <p className='mw-text' >colSpan=5</p>
                  </GridItem>
                </Grid>
                
              </CommonWikiPageGridBox>
            </FlexItem>
          </ResponsiveContainer>
        </FlexItem>
      </CommonWikiPageTextContainer>
    );
}