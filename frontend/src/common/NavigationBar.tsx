import { Flex, Box, Image, Button, useMediaQuery, ButtonProps, Popover, Portal, VStack } from '@chakra-ui/react';
import { FaEllipsis  } from 'react-icons/fa6';
import Autocomplete from './Autocomplete';
import { useTranslation } from 'react-i18next';
import { AutocompleteType } from '../models/common';
import { useNavigate } from 'react-router';
import { observer } from 'mobx-react-lite';
import { useStore } from '../store';
import React, { useCallback, useState } from 'react';
import DonationDialog from '../common/DonationDialog';
import { MWOptimizedImage } from './Image';
import { router } from '../router';

export const NavigationBarLink = ({ children, onClick , ...props }: React.PropsWithChildren<ButtonProps>) => {
    return (
        <Button as='a' variant="ghost" bg='transparent' p={0} fontSize="85%" onClick={onClick} {...props}>
            {children}
        </Button>
    );
}

type AuthRelatedLinksProps = {
    authToken: string;
    logout: () => Promise<void>;
    setOpenBubbleMenu?: (val: boolean) => void;
}
const AuthRelatedLinks = React.memo(({
    authToken,
    logout,
    setOpenBubbleMenu
}: AuthRelatedLinksProps) => {
    const {
        t,
    } = useTranslation("common");
    const navigate = useNavigate();
    return (
        <>
            <Box p={2}>
                <DonationDialog 
                    onClick={() => {
                        if(setOpenBubbleMenu)
                            setOpenBubbleMenu(true);
                    }} 
                />
            </Box>
            {
                authToken ? (
                    <>
                    <Box p={2}>
                        <NavigationBarLink onClick={logout}>
                            {t("logout")}
                            </NavigationBarLink>
                    </Box>
                    </>
                )
                : (
                <>
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
            
        </>
    );
})

export default observer(function NavigationBar() {
    const {
        t,
        // i18n 
    } = useTranslation("common");
    const [isLarger600px] = useMediaQuery(['(min-width: 600px)']);
    const [openBubbleMenu, setOpenBubbleMenu] = useState<boolean>(false);
    const { authStore, commonStore, searchStore } = useStore();
    const { loadSearchWikiPages } = searchStore;
    const { language, navbarSearchQry } = commonStore;
    const { userSession, userSessionToken, logout } = authStore;
    const navigate = useNavigate();
    const handleSubmitSearch = (setOpen: Function) => async (e: React.MouseEvent) => {
        e.preventDefault();
        if (navbarSearchQry) {
            await loadSearchWikiPages(navbarSearchQry);
            navigate(`/${language}/search?title=${navbarSearchQry}`);

        }
        setOpen(false);
    }

    const logoutUser = useCallback(async () => {
        await logout();
        navigate(`/${language}`);
    }, [userSession]);

    return (
        <Flex h="4em" w="100%" justifyContent='space-between'>
            <Box onClick={() => navigate(`/${language}`)}>
                <Image
                    src="/nav-logo.svg"
                    alt="mūsūʿah Navigation Bar Logo"
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
                    <AuthRelatedLinks 
                        authToken={userSessionToken ?? ''}
                        logout={logoutUser}
                    />
                )}

                <Box p={2}>
                    <Popover.Root
                        open={openBubbleMenu}
                        onOpenChange={() => setOpenBubbleMenu(!openBubbleMenu)}
                    >
                        <Popover.Trigger asChild>
                            <Button variant="ghost" bg='transparent' p={0} fontSize="85%">
                                <FaEllipsis  />
                            </Button>
                        </Popover.Trigger>
                        <Portal>
                            <Popover.Positioner>
                            <Popover.Content  w="100%" height="400px">
                                <Popover.Arrow />
                                <Popover.Body w="17.5em">
                                    <VStack>
                                        {(!isLarger600px) && (
                                            <AuthRelatedLinks
                                                authToken={userSessionToken ?? ''}
                                                logout={logoutUser}
                                                setOpenBubbleMenu={() => setOpenBubbleMenu(false)}
                                            />
                                        )}
                                        <Box fontSize="125%" p={2}>
                                            <NavigationBarLink onClick={() => navigate(`privacyPolicy`, { replace: true })}>
                                                {t("privacyPolicy")}
                                            </NavigationBarLink>
                                        </Box>                             
                                    </VStack>
                                </Popover.Body>
                            </Popover.Content>
                            </Popover.Positioner>
                        </Portal>
                    </Popover.Root>
                </Box>

                {userSessionToken && userSession?._id && (
                    <Box p={1}>
                        <MWOptimizedImage 
                            src={userSession.profilePicture}
                            alt={userSession.firstName}
                            onClick={() => router.navigate(`/${language}/youraccount`, { replace: true })}
                        />
                    </Box>
                )}
            </Flex>
        </Flex>
    );
});