import { useCallback, useEffect, useMemo } from "react";
import ResponsiveContainer from './common/ResponsiveContainer';
import { FlexBlock, FlexItem, Flex, ExternalLink, CardDivider } from "@wordpress/components";
import { StackDivider } from '@chakra-ui/layout';
import { useTranslation } from 'react-i18next';
import Autocomplete from './common/Autocomplete';
import { observer } from 'mobx-react-lite';
import { useStore } from './store/index';
import { useNavigate, useParams } from 'react-router';
import i18n from "./i18n";
import { AutocompleteType } from "./models/common";
import JigSawIcon from "./icons/JigSawIcon";
import ChatbotIcon from "./icons/ChatbotIcon";
import EBooksIcon from "./icons/EBooksIcon";
import SignInIcon from "./icons/SignInIcon";
import LogoutIcon from "./icons/LogoutIcon";
import YourAccountIcon from "./icons/YourAccountIcon";


export default observer(function HomePage() {
  const {
    t,
    // i18n 
  } = useTranslation("common");
  const navigate = useNavigate();
  const { lang } = useParams();
  const { authStore, commonStore, searchStore } = useStore();
  const { searchQry, loadSearchWikiPages } = searchStore;
  const { userSession, userSessionToken, logout } = authStore;
  const { setLanguage, language } = commonStore;


  useEffect(() => {
    if (!lang) {
      i18n.changeLanguage('en');
      setLanguage('en');
      navigate('/en', { replace: true });
    } else if (lang != language) {
      i18n.changeLanguage(lang);
      setLanguage(lang as "ar" | "al" | "ba" | "cn" | "de" | "en" | "es" | "fa" | "fr" | "hi" | "jp" | "ru" | "tr" | "ur");
    }
  }, [lang]);

  const handleSubmitSearch = (setOpen: Function) => async (e: React.MouseEvent) => {
    e.preventDefault();
    if (searchQry) {
      await loadSearchWikiPages(searchQry);
      navigate(`/${language}/search?title=${searchQry}`);

      setOpen(false);
    }
  }
  const logoutUser = useCallback(async () => {
    await logout();
  }, [userSession]);
  const userLoggedIn = useMemo(() => userSessionToken, [userSession, userSessionToken])

  return (
    <>
      {/* <div> */}
      <ResponsiveContainer>
        <>
          <Flex className='globeContainer'>
            <FlexBlock>
              <Flex direction='column' align="center">

                <h2 className="mw-text mw-header">mūsūʿah</h2>
                <h5 className="mw-text mw-subheader">The Free Encyclopedia</h5>
                <img
                  src="/muslimwiki-globe.svg"
                  className='logo genezio'
                  alt="Genezio Logo"
                />
              </Flex>
            </FlexBlock>
            <FlexItem className='autocompleteContainer'>
              <Autocomplete
                id='homepage-autocomplete'
                placeholder={t("searchPlaceholder")}
                autocompleteType={AutocompleteType.Search}
                hasButton={true}
                handleSubmitSearch={handleSubmitSearch}
              />
            </FlexItem>
          </Flex>
          <CardDivider />
          <Flex id='language-links' justify='space-between' className="w-100" wrap={true}>
            <FlexItem className="lng-item">
              <ExternalLink className="mw-body mw-link" href="/es">{t("links.es")}</ExternalLink>
            </FlexItem>
            <FlexItem className="lng-item">
              <ExternalLink className="mw-body mw-link" href="/en">{t("links.en")}</ExternalLink>
            </FlexItem>
            <FlexItem className="lng-item">
              <ExternalLink className="mw-body mw-link" href="/ar">{t("links.ar")}</ExternalLink>
            </FlexItem>
            <FlexItem className="lng-item">
              <ExternalLink className="mw-body mw-link" href="/tr">{t("links.tr")}</ExternalLink>
            </FlexItem>
            <FlexItem className="lng-item">
              <ExternalLink className="mw-body mw-link" href="/fr">{t("links.fr")}</ExternalLink>
            </FlexItem>
            <FlexItem className="lng-item">
              <ExternalLink className="mw-body mw-link" href="/ur">{t("links.ur")}</ExternalLink>
            </FlexItem>
            <FlexItem className="lng-item">
              <ExternalLink className="mw-body mw-link" href="/fa">{t("links.fr")}</ExternalLink>
            </FlexItem>
            <FlexItem className="lng-item">
              <ExternalLink className="mw-body mw-link" href="/cn">{t("links.cn")}</ExternalLink>
            </FlexItem>
            <FlexItem className="lng-item">
              <ExternalLink className="mw-body mw-link" href="/ru">{t("links.ru")}</ExternalLink>
            </FlexItem>
            <FlexItem className="lng-item">
              <ExternalLink className="mw-body mw-link" href="/de">{t("links.de")}</ExternalLink>
            </FlexItem>
            <FlexItem className="lng-item">
              <ExternalLink className="mw-body mw-link" href="/jp">{t("links.jp")}</ExternalLink>
            </FlexItem>
            <FlexItem className="lng-item">
              <ExternalLink className="mw-body mw-link" href="/hi">{t("links.hi")}</ExternalLink>
            </FlexItem>
          </Flex>
          <StackDivider p='0' backgroundColor='black' border='solid 1px var(--global-color-border, currentColor)' />
          <Flex className='pr-5' id='tools'>
            {userLoggedIn
              ? (
                <>
                  <FlexItem className='tool-item' onClick={() => navigate(`youraccount`, { replace: true })}>
                    <YourAccountIcon />
                    <p className='mw-text mw-small'>{t("mainLinks.yourAccount")}</p>
                  </FlexItem>
                  <FlexItem className='tool-item' onClick={logoutUser}>
                    <LogoutIcon />
                    <p className='mw-text mw-small'>{t("logout")}</p>
                  </FlexItem>
                </>
              )
              : (
                <>
                  <FlexItem className='tool-item' onClick={() => navigate(`collaborate`, { replace: true })}>
                    <JigSawIcon />
                    <p className='mw-text mw-small'>{t("mainLinks.collaborate")}</p>
                  </FlexItem>
                  <FlexItem className='tool-item' onClick={() => navigate(`login`, { replace: true })}>
                    <SignInIcon />
                    <p className='mw-text mw-small'>{t("login")}</p>
                  </FlexItem>
                </>
              )
            }
            <FlexItem className='tool-item' onClick={() => navigate(`ai-assistant`, { replace: true })}>
              <ChatbotIcon />
              <p className='mw-text mw-small'>{t("mainLinks.useAI")}</p>
            </FlexItem>
            <FlexItem className='tool-item' onClick={() => navigate(`searchBooks`, { replace: true })}>
              <EBooksIcon />
              <p className='mw-text mw-small'>{t("mainLinks.booksAndStudiesPart1")}<br /> {t("mainLinks.booksAndStudiesPart2")}</p>
            </FlexItem>
          </Flex>
        </>
      </ResponsiveContainer>
    </>
  );
})
