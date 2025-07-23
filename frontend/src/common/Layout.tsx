import { useState, useEffect, useMemo } from "react";
import LeftSideNavigation, { LeftSideNavigationToggler } from "./LeftSideNavigation";
import RightSideNavigation, { RightSideNavigationToggler } from "./RightSideNavigation";
import { Flex } from "@wordpress/components";
import { useLocation } from "react-router";
import { useMediaQuery } from "@chakra-ui/react";
import NavigationBar from "./NavigationBar";

type Props = {}

export default function Layout({ children }: React.PropsWithChildren<Props>) {
    const { pathname } = useLocation();
    const [isLargerThan768] = useMediaQuery(['(min-width: 769px)']);
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
        /\/wikipages\b/i
    ], [])

    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // alert("isLargerThan768 " + isLargerThan768)
    if (routesToShowLayout.some(r => r.test(pathname)))
        return (

            <Flex direction="column">
                <NavigationBar />
                <Flex style={{ position: 'absolute', top: '7.5em', zIndex: 9999, width: '90vw' }}>
                    {!isLargerThan768 && (
                        <>
                            <LeftSideNavigationToggler
                                isMobile={!isLargerThan768}
                                toggleLeftNav={toggleLeftNav}
                                leftNavOpen={leftNavOpen}
                                toggleRightNav={toggleRightNav}
                                rightNavOpen={rightNavOpen}
                            />
                            <RightSideNavigationToggler
                                isMobile={!isLargerThan768}
                                toggleLeftNav={toggleLeftNav}
                                leftNavOpen={leftNavOpen}
                                toggleRightNav={toggleRightNav}
                                rightNavOpen={rightNavOpen}
                            />
                        </>
                    )}
                    {/* {!isLargerThan768 && <RightSideNavigationToggler isMobile={!isLargerThan768} toggleRightNav={toggleRightNav} />} */}
                </Flex>
                <Flex align="flex-start" justify="space-between" style={{ marginTop: '12.5vh' }}>
                    {isLargerThan768 && (
                            <LeftSideNavigation
                                isMobile={isMobile}
                                leftNavOpen={leftNavOpen}
                                rightNavOpen={rightNavOpen}
                                toggleLeftNav={toggleLeftNav}
                            />
                    )}
                    {children}
                    {isLargerThan768 && (
                            <RightSideNavigation
                                isMobile={isMobile}
                                leftNavOpen={leftNavOpen}
                                rightNavOpen={rightNavOpen}
                                toggleRightNav={toggleRightNav}
                            />
                    )}
                </Flex>
            </Flex>
        );
    else
        return <>{children}</>;
}