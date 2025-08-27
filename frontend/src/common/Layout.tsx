import React, { useState, useEffect, useMemo, useRef } from "react";
import LeftSideNavigation, { LeftSideNavigationToggler } from "./LeftSideNavigation";
import RightSideNavigation, { RightSideNavigationToggler } from "./RightSideNavigation";
import { useLocation } from "react-router";

import { HStack, Stack, useMediaQuery } from "@chakra-ui/react";
import NavigationBar from "./NavigationBar";
import { store } from "../store";
import Footer from "./Footer";

type Props = {}

const LayoutContainer = ({ children }: React.PropsWithChildren<any>) => {
    return (
        <Stack direction="column" style={{
            boxSizing: 'border-box',
            width: '100vw',
            maxWidth: '100%',
            position: 'fixed',
            minHeight: '100vh',
            height: '100%',
            overflowY: 'auto',
            top: 0,
            right: 0,
            // backgroundColor: 'purple'
        }}>
            {children}
        </Stack>
    )
}

const LayoutNavbarContainer = ({ children }: React.PropsWithChildren<any>) => {
    return (
        <HStack align="flex-start" justify="space-between" style={{
            width: '100%',
            boxSizing: 'border-box'
        }}>
            {children}
        </HStack>
    );
}

const LayoutFooterContainer = ({ children }: React.PropsWithChildren<any>) => {
    return (
        <HStack 
            align="flex-start" 
            justify="space-between" 
            style={{
                width: '100%',
                boxSizing: 'border-box',
                position: 'fixed',
                bottom: 0
            }}
        >
            {children}
        </HStack>
    );
}

export default function Layout({ children }: React.PropsWithChildren<Props>) {
    const { pathname } = useLocation();
    const [isLargerThan1024] = useMediaQuery(['(min-width: 1025px)']);
    const [leftNavOpen, setLeftNavOpen] = useState(false);
    const [rightNavOpen, setRightNavOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);
    const renderCount = useRef<number>(0)
    useEffect(() => {
        async function checkSession() {
            await store.authStore.initializeFromStorage();
            renderCount.current += 1;
            console.log("current rendercount from init session:", renderCount.current)
        }

        if(!store.authStore.authUserToken)
            checkSession()
    }, [store.authStore.authUserToken, pathname])

    const toggleLeftNav = () => {
        setLeftNavOpen(!leftNavOpen);
        if (rightNavOpen) setRightNavOpen(false);
    };

    const toggleRightNav = () => {
        setRightNavOpen(!rightNavOpen);
        if (leftNavOpen) setLeftNavOpen(false);
    };
    console.log("isTablet:", isTablet);
    const routesToShowLayout = useMemo(() => [
        /search/i,
        /articles/i,
        /\/search\b/i,
        /\/articles\b/i,
        /wikipages/i,
        /\/wikipages\b/i,
        /searchBooks/i,
        /\/searchBooks\b/i,
        /wikibooks/i,
        /\/wikibooks\b/i,
    ], [])

    const routesToShowNavbar = useMemo(() => [
        /search/i,
        /articles/i,
        /\/search\b/i,
        /\/articles\b/i,
        /wikipages/i,
        /\/wikipages\b/i,
        /collaborate/i,
        /\/collaborate\b/i,
        /login/i,
        /\/login\b/i,
        /dashboard/i,
        /\/dashboard\b/i,
        /youraccount/i,
        /\/youraccount\b/i
    ], [])

    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1203);
            setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const showLayout = useMemo(() => routesToShowLayout.some(r => r.test(pathname)), [pathname]);
    const showNavbar = useMemo(() => routesToShowNavbar.some(r => r.test(pathname)), [pathname]);
    // alert("isLargerThan768 " + isLargerThan768)
    if (showNavbar && !showLayout)
        return (
            <LayoutContainer>
                <LayoutNavbarContainer>
                    <NavigationBar />
                </LayoutNavbarContainer>
                <HStack overflowY="auto" align="flex-start" justify="space-between" style={{ marginTop: '2rem' }}>
                    <div />
                    {children}
                    <div />
                </HStack>
                <LayoutFooterContainer>
                    <Footer />
                </LayoutFooterContainer>
            </LayoutContainer>
        );
    else if (showLayout)
        return (
            <LayoutContainer>
                <LayoutNavbarContainer>
                    <NavigationBar />
                </LayoutNavbarContainer>
                <HStack justify="space-between" position='absolute' left='2rem' top='4rem' zIndex={9999} width='90vw'>
                    {!isLargerThan1024 && (
                        <>
                            <LeftSideNavigationToggler
                                isMobile={!isLargerThan1024}
                                toggleLeftNav={toggleLeftNav}
                                leftNavOpen={leftNavOpen}
                                toggleRightNav={toggleRightNav}
                                rightNavOpen={rightNavOpen}
                            />
                            <RightSideNavigationToggler
                                isMobile={!isLargerThan1024}
                                toggleLeftNav={toggleLeftNav}
                                leftNavOpen={leftNavOpen}
                                toggleRightNav={toggleRightNav}
                                rightNavOpen={rightNavOpen}
                            />
                        </>
                    )}
                    {/* {!isLargerThan768 && <RightSideNavigationToggler isMobile={!isLargerThan768} toggleRightNav={toggleRightNav} />} */}
                </HStack>
                <HStack overflowY="auto" align="flex-start" justify="space-between" mt={{ base: "5rem", md: "1rem"}}>
                    {isLargerThan1024 && (
                        <LeftSideNavigation
                            isMobile={isMobile}
                            leftNavOpen={leftNavOpen}
                            rightNavOpen={rightNavOpen}
                            toggleLeftNav={toggleLeftNav}
                        />
                    )}
                    {children}
                    {isLargerThan1024 && (
                        <RightSideNavigation
                            isMobile={isMobile}
                            leftNavOpen={leftNavOpen}
                            rightNavOpen={rightNavOpen}
                            toggleRightNav={toggleRightNav}
                        />
                    )}
                </HStack>
                <LayoutFooterContainer>
                    <Footer />
                </LayoutFooterContainer>
            </LayoutContainer>
        );
    else
        return <>{children}</>;
}