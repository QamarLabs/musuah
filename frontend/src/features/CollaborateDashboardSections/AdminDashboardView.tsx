import { Divider } from "@chakra-ui/layout";
import { CollaborateDashboardTitle } from "./DashboardTitle";
import { ViewDeleteWikiPageRequests, ViewWikiPageRequests } from "./ViewWikiPageRequests";
import { observer } from "mobx-react-lite";
import { useStore } from "../../store";
import { ViewDeleteWikiBookRequests } from "./ViewWikiBookRequests";
import { useTranslation } from "react-i18next";

export default observer(() => {
    const {
        t,
    } = useTranslation("dashboard");
    const { mutateDashboardStore } = useStore();
    const {
        loadingInitial,
        wikipageRequestsToMutate,
        deleteWikiPageRequestsToMutate,
        deleteWikiBookRequestsToMutate,
    } = mutateDashboardStore;

    return (
        <>
            <CollaborateDashboardTitle>{t("wikiPageRequestsToApproveOrDeny")}</CollaborateDashboardTitle>
            {loadingInitial
                ? null
                : (
                    <ViewWikiPageRequests wikipageRequests={wikipageRequestsToMutate} isAdmin={true} />
                )}
            <Divider />
            <CollaborateDashboardTitle>{t("deleteWikiPageRequestsToApproveOrDeny")}</CollaborateDashboardTitle>
            {loadingInitial
                ? null
                : (
                    <ViewDeleteWikiPageRequests wikipageRequests={deleteWikiPageRequestsToMutate} isAdmin={true} />
                )}
            <Divider />
            <CollaborateDashboardTitle>{t("deleteWikiBookRequestsToApproveOrDeny")}</CollaborateDashboardTitle>
            {loadingInitial
                ? null
                : (
                    <ViewDeleteWikiBookRequests wikibookRequests={deleteWikiBookRequestsToMutate} isAdmin={true} />
                )}

        </>
    );
});