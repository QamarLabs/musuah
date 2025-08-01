import { Flex, Box, Image, Button, useMediaQuery, ButtonProps } from '@chakra-ui/react';
import { FaEllipsis  } from 'react-icons/fa6';
import Autocomplete from './Autocomplete';
import { useTranslation } from 'react-i18next';
import { AutocompleteType } from '../models/common';
import { useNavigate } from 'react-router';
import { observer } from 'mobx-react-lite';
import { useStore } from '../store';
import React from 'react';

const NavigationBarLink = ({ children, onClick }: React.PropsWithChildren<ButtonProps>) => {
    return (
        <Button as='a' variant="ghost" bg='transparent' p={0} fontSize="85%" onClick={onClick}>
            {children}
        </Button>
    );
}

export default observer(function NavigationBar() {
    const {
        t,
        // i18n 
    } = useTranslation("common");
    const [isLarger600px] = useMediaQuery(['(min-width: 600px)']);
    
    const { commonStore, searchStore } = useStore();
    const { searchQry, loadSearchWikiPages } = searchStore;
    const { language, navbarSearchQry } = commonStore;
    const navigate = useNavigate();
    const handleSubmitSearch = (setOpen: Function) => async (e: React.MouseEvent) => {
        e.preventDefault();
        if (navbarSearchQry) {
            await loadSearchWikiPages(navbarSearchQry);
            navigate(`/${language}/search?title=${navbarSearchQry}`);

        }
        setOpen(false);
    }
    return (
        <Flex bg='blue' h="4em" w="100%" justifyContent='space-between'>
            <Box onClick={() => navigate(`/${language}`)}>
                <Image
                    src="/public/muslim-wiki-nav-logo.svg"
                    alt="Muslim Wiki Navigation Bar Logo"
                    height={{ base: '3em', sm: '3.5em' }}
                    width='auto'
                />
            </Box>
            <Box id='navbar-autocomplete' w="40vw" p={2}>
                <Autocomplete
                    id="navigation-autocomplete"
                    key="navigation-autocomplete"
                    placeholder={t("searchNavbarPlaceholder")}
                    autocompleteType={AutocompleteType.Navbar}
                    hasButton={false}
                    handleSubmitSearch={handleSubmitSearch}
                />
            </Box>
            <Flex bg='transparent'>
                {isLarger600px && (
                    <>
                        <Box p={2}>
                            <NavigationBarLink>
                                {t("donate")}
                            </NavigationBarLink>
                        </Box>
                        <Box p={2}>
                            <NavigationBarLink onClick={() => navigate(`collaborate`, { replace: true })}>
                                {t("createAccount")}
                            </NavigationBarLink>
                        </Box>

                        <Box p={2}>
                            <NavigationBarLink onClick={() => navigate(`login`, { replace: true })}>
                                {t("login")}
                             </NavigationBarLink>
                        </Box>
                    </>
                )}

                <Box p={2}>
                    <Button variant="ghost" bg='transparent' p={0} fontSize="85%">
                        <FaEllipsis  />
                    </Button>
                </Box>
            </Flex>
        </Flex>
    );
});