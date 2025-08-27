import { Box, HStack, LoaderOverlay, Portal, Text, VStack } from "@chakra-ui/react";
import { useStore } from "../store";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Divider } from "@chakra-ui/layout";
import { CommonWikiPageTextContainer } from "../common/ResponsiveContainer";
import { ViewDeleteWikiPageRequests, ViewWikiPageRequests } from "./CollaborateDashboardSections/ViewWikiPageRequests";
import { ApprovedWikiPageRequests, DeniedWikiPageRequests } from "./CollaborateDashboardSections/PreviousWikiPageRequests";
import { ViewDeleteWikiBookRequests } from "./CollaborateDashboardSections/ViewWikiBookRequests";
import { useTranslation } from "react-i18next";
import LoadingSkeleton from "../common/LoadingSkeleton";
import { MWIconButton } from "../common/Buttons";
import { LuUser, LuView } from "react-icons/lu";
import { CollaborateDashboardTitle } from "./CollaborateDashboardSections/DashboardTitle";
import AdminDashboardView from "./CollaborateDashboardSections/AdminDashboardView";


function CollaborateDashboard() {
    const {
        t,
    } = useTranslation(["dashboard", "form"]);
    const { authStore, dashboardStore, mutateDashboardStore } = useStore();
    const { isCouncilMember, checkAsync } = authStore;
    const {
        clearWikiPageRequests,
        clearDeletedWikiRequests,
        loadingInitial,
        loadingDeleteRequests,
        loadDashboard,
        currentWikiPageRequests,
        approveWikiPageRequests,
        deniedWikiPageRequests,
        recentDeleteWikiPageRequests,
        approvedDeleteWikiPageRequests,
        deniedDeleteWikiPageRequests,
        recentDeleteWikiBookRequests,
        approvedDeleteWikiBookRequests,
        deniedDeleteWikiBookRequests,
    } = dashboardStore;
    const {
        clearMutateDashboardRegistries,
        loadMutateDashboard,
        loadingInitial:loadingCMDashboard
    } = mutateDashboardStore;
    const [mounted, setMounted] = useState<boolean>(false);
    const [showCounciMemberView, setShowCouncilMemberView] = useState<boolean>(false);



    useEffect(() => {
        async function check() {
            try {
                checkAsync()
                    .then((cm: boolean) => {
                        if(cm)
                            return loadMutateDashboard();
                    });
            } catch (error) {
                console.log(error);
            }
        }

        check();

        return () => {
            clearMutateDashboardRegistries();
        }
    }, [isCouncilMember])

    useEffect(() => {
        async function getDashboardData() {
            try {
                await loadDashboard();
                setMounted(true);
            } catch (error) {
                console.log("ERROR Loading Dashboard Data:", error);
            }
        }

        getDashboardData();

        return () => {
            setMounted(false);
            clearWikiPageRequests();
            clearDeletedWikiRequests();
        }
    }, []);

    if (!mounted)
        return <LoadingSkeleton />

    return (
        <CommonWikiPageTextContainer
            width={{ base: '92.5vw', lg: "80vw" }}
            height="100%"
            position="relative"
            px={{ base: '2rem', xl: 'unset' }}
            justify='start'
            zIndex={0}
        >
            {isCouncilMember && (
                <HStack position={{ base: 'relative', md: 'absolute'}} top='0' right='0'>
                    <MWIconButton onClick={() => setShowCouncilMemberView(!showCounciMemberView)}>
                        {showCounciMemberView
                            ? (
                                <>
                                    {t("buttons.normalView", { ns: "form" })}
                                    <LuUser />
                                </>
                            )
                            : (
                                <>
                                    {t("buttons.councilMemberView", { ns: "form" })}
                                    <LuView />
                                </>
                            )}
                    </MWIconButton>
                </HStack>
            )}
            <VStack textAlign='left' className='mw-text' w='100%' justifyContent="start" pb={{ base: "30vh", md: "20vh" }}>
                <Box>
                    <h2 className='mw-text'>{t("welcome")}</h2>
                </Box>

                {showCounciMemberView && isCouncilMember ? !loadingCMDashboard 
                    ? <AdminDashboardView /> 
                    : <Box zIndex={100} position='fixed' top='9rem' left='0' minH='80vh' minW='100vw' bg='white'> <LoadingSkeleton /></Box>  : null}

                <CollaborateDashboardTitle>{t("recentWikiPageRequests")}</CollaborateDashboardTitle>
                {loadingInitial
                    ? null
                    : (
                        <ViewWikiPageRequests wikipageRequests={currentWikiPageRequests} isAdmin={false} />
                    )}
                <Divider />
                <CollaborateDashboardTitle>{t("deniedWikiPageRequests")}</CollaborateDashboardTitle>
                {loadingInitial
                    ? null
                    : (
                        <DeniedWikiPageRequests wikipageRequests={deniedWikiPageRequests} denied={true} />
                    )}
                <Divider />
                <CollaborateDashboardTitle>{t("approvedWikiPageRequests")}</CollaborateDashboardTitle>
                {loadingInitial
                    ? null
                    : (
                        <ApprovedWikiPageRequests wikipageRequests={approveWikiPageRequests} approved={true} />
                    )}
                <Divider />
                {loadingDeleteRequests ? (
                    <LoadingSkeleton position='relative' />
                ) : (
                    <>
                        <CollaborateDashboardTitle>{t("deleteWikiPageRequests")}</CollaborateDashboardTitle>
                        <ViewDeleteWikiPageRequests wikipageRequests={recentDeleteWikiPageRequests} isAdmin={false} />
                        <CollaborateDashboardTitle>{t("deleteWikiPageRequestsApproved")}</CollaborateDashboardTitle>
                        <ViewDeleteWikiPageRequests wikipageRequests={approvedDeleteWikiPageRequests} isAdmin={false} />
                        <CollaborateDashboardTitle>{t("deleteWikiPageRequestsDenied")}</CollaborateDashboardTitle>
                        <ViewDeleteWikiPageRequests wikipageRequests={deniedDeleteWikiPageRequests} isAdmin={false} />
                        <Divider />
                        
                        <CollaborateDashboardTitle>{t("deleteWikiBookRequests")}</CollaborateDashboardTitle>
                        <ViewDeleteWikiBookRequests wikibookRequests={recentDeleteWikiBookRequests} isAdmin={false} />
                        <CollaborateDashboardTitle>{t("deleteWikiBookRequestsApproved")}</CollaborateDashboardTitle>
                        <ViewDeleteWikiBookRequests wikibookRequests={approvedDeleteWikiBookRequests} isAdmin={false} />
                        <CollaborateDashboardTitle>{t("deleteWikiBookRequestsDenied")}</CollaborateDashboardTitle>
                        <ViewDeleteWikiBookRequests wikibookRequests={deniedDeleteWikiBookRequests} isAdmin={false} />
                                
                        <Divider />
                    </>
                )}
            </VStack>
        </CommonWikiPageTextContainer>
    );
}


export default observer(CollaborateDashboard)