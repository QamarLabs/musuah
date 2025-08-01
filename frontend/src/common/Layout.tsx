import React, { useState, useEffect, useMemo } from "react";
import LeftSideNavigation, { LeftSideNavigationToggler } from "./LeftSideNavigation";
import RightSideNavigation, { RightSideNavigationToggler } from "./RightSideNavigation";
import { Flex } from "@wordpress/components";
import { useLocation } from "react-router";
import { useMediaQuery } from "@chakra-ui/react";
import NavigationBar from "./NavigationBar";

type Props = {}

const LayoutContainer = ({ children }: React.PropsWithChildren<any>) => {
    return (
        <Flex direction="column" style={{
            boxSizing: 'border-box',
            width: '100vw',
            maxWidth: '100%',
            position: 'fixed',
            minHeight: '100vh',
            overflowY: 'auto',
            top: 0,
            right: 0,
            backgroundColor: 'purple'
        }}>
            {children}
        </Flex>
    )
}

const LayoutNavbarContainer = ({ children }: React.PropsWithChildren<any>) => {
    return (
        <Flex align="flex-start" justify="space-between" style={{
            width: '100%',
            boxSizing: 'border-box'
        }}>
            {children}
        </Flex>
    );
}

export default function Layout({ children }: React.PropsWithChildren<Props>) {
    const { pathname } = useLocation();
    const [isLargerThan1024] = useMediaQuery(['(min-width: 1025px)']);
    const [leftNavOpen, setLeftNavOpen] = useState(false);
    const [rightNavOpen, setRightNavOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);


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
        /\/collaborate\b/i
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
                <Flex align="flex-start" justify="space-between" style={{ marginTop: '2rem' }}>
                    <div />
                    {children}
                    <div />
                </Flex>
            </LayoutContainer>
        );
    else if (showLayout)
        return (
            <LayoutContainer>
                <LayoutNavbarContainer>
                    <NavigationBar />
                </LayoutNavbarContainer>
                <Flex style={{ position: 'absolute', left: "2rem", top: '4rem', zIndex: 9999, width: '90vw' }}>
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
                </Flex>
                <Flex align="flex-start" justify="space-between" style={{ marginTop: '5rem' }}>
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
                </Flex>
            </LayoutContainer>
        );
    else
        return <>{children}</>;
}