import { Flex, Box, Image, Button } from '@chakra-ui/react';
import { FaEllipsis  } from 'react-icons/fa6';
import Autocomplete from './Autocomplete';
import { useTranslation } from 'react-i18next';
import { AutocompleteType } from '../models/common';
import { useNavigate } from 'react-router';
import { observer } from 'mobx-react-lite';
import { useStore } from '../store';

export default observer(function NavigationBar() {
    const {
        t,
        // i18n 
    } = useTranslation("common");
    const { commonStore } = useStore();
    const { language } = commonStore;
    const navigate = useNavigate();

    return (
        <Flex bg='transparent' h="4em" w="100%" justifyContent='space-between'>
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
                    placeholder={t("searchNavbarPlaceholder")}
                    autocompleteType={AutocompleteType.Navbar}
                    hasButton={false}
                />
            </Box>
            <Flex bg='transparent'>
                <Box p={2}>
                    <Button as='a' variant="ghost" bg='transparent' p={0} fontSize="85%">
                        {t("donate")}
                    </Button>
                </Box>
                <Box p={2}>
                    <Button as='a' variant="ghost" bg='transparent' p={0} fontSize="85%">
                        {t("createAccount")}
                    </Button>
                </Box>

                <Box p={2}>
                    <Button as='a' variant="ghost" bg='transparent' p={0} fontSize="85%">
                        {t("login")}
                    </Button>
                </Box>

                <Box p={2}>
                    <Button variant="ghost" bg='transparent' p={0} fontSize="85%">
                        <FaEllipsis  />
                    </Button>
                </Box>
            </Flex>
        </Flex>
    );
});