import { Box, Text, VStack } from "@chakra-ui/react";
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

const CollaborateDashboardTitle = ({ children }: React.PropsWithChildren<any>) => {
    return (
        <Text fontSize="125%" fontWeight={"bold"} w='full'>
            {children}
        </Text>
    );
}

function CollaborateDashboard() {
      const {
        t,
      } = useTranslation("dashboard");
    const { dashboardStore } = useStore();
    const {
        loadingInitial,
        loadingDeleteRequests,
        loadDashboard,
        currentWikiPageRequests,
        approveWikiPageRequests,
        deniedWikiPageRequests,
        deleteWikiPageRequests,
        deleteWikiBookRequests,
    } = dashboardStore;
    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => {
        async function getDashboardData() {
            try {
                await loadDashboard();
                setMounted(true);
            } catch(error) {
                console.log("ERROR Loading Dashboard Data:", error);
            }
        }

        getDashboardData();

        return () => {
            setMounted(false);
        }
    }, []);


    if (!mounted)
        return <LoadingSkeleton />

    return (
        <CommonWikiPageTextContainer 
            width={{ base: '92.5vw', lg: "80vw"}} 
            height="100%"
            position="relative" 
            px={{ base: '2rem', xl: 'unset' }} 
            justify='start'
            zIndex={0}
        >
            <VStack textAlign='left' className='mw-text' w='100%' justifyContent="start" pb={{ base: "30vh", md: "20vh"}}>
                <Box>
                    <h2 className='mw-text'>{t("welcome")}</h2>
                </Box>
                <CollaborateDashboardTitle>{t("currentWikiPageRequests")}</CollaborateDashboardTitle>
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
                <CollaborateDashboardTitle>{t("deleteWikiPageRequests")}</CollaborateDashboardTitle>
                {loadingDeleteRequests
                    ? null
                    : (
                        <ViewDeleteWikiPageRequests wikipageRequests={deleteWikiPageRequests} isAdmin={false} />
                    )}
                <Divider />
                <CollaborateDashboardTitle>{t("deleteWikiBookRequests")}</CollaborateDashboardTitle>
                {loadingDeleteRequests
                    ? null
                    : (
                        <ViewDeleteWikiBookRequests wikibookRequests={deleteWikiBookRequests} isAdmin={false} />
                    )}
            </VStack>
        </CommonWikiPageTextContainer>
    );
}


export default observer(CollaborateDashboard)