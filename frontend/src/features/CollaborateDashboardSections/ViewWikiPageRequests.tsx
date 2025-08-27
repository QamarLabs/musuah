import { HStack } from "@chakra-ui/react";
import { DeleteWikiPageRequestRecord, WikiPageRequestRecord } from "../../models/wikipage";
import { ApproveDenyCard, DefaultRequestCard } from "../../common/Cards";
import { useCallback } from "react";
import { observer } from "mobx-react-lite";
import { DeleteWikiPageRequestCard, WikiPageRequestCard } from "./DashboardCards";
import { useStore } from "../../store";
import { useNavigate } from "react-router";

type ViewArticleRequestsProps = {
    wikipageRequests: WikiPageRequestRecord[];
    isAdmin: boolean;
}

export const ViewWikiPageRequests = observer(({
    wikipageRequests,
    isAdmin
}: ViewArticleRequestsProps) => {
    const navigate = useNavigate();
    const { commonStore, mutateDashboardStore } = useStore();
    const { language } = commonStore;
    const { loadingUpsertId, approveWikiPageRequest, denyWikiPageRequest } = mutateDashboardStore;
    const onApprove = useCallback(
        async ( pageid: number | string, id: string, reason: string) => {
            await approveWikiPageRequest(pageid, {
                id,
                reasonToApprove: reason
            });
        }, 
    []);

    const onDeny = useCallback(
        async ( pageid: number | string, id: string, reason: string) => {
            await denyWikiPageRequest(pageid, {
                id,
                reasonToDeny: reason
            });
        }, 
    []);
    
    const onNavigate = useCallback((pageid: any) => (e: any) => {
        e.preventDefault();
         navigate(`/${language}/wikipages/${pageid}`)
    }, []);

    return (
        <HStack 
            w="full" 
            flex={{
                base: '90%',
                md: '48%',
                lg: '32%',
                xl: '24%'
            }} 
            wrap="wrap"
        >
            {wikipageRequests && wikipageRequests.length ?
                (wikipageRequests.map(
                    (wpR: WikiPageRequestRecord, wpRIdx: number) => 
                        isAdmin ? (
                            <ApproveDenyCard
                                id={wpR._id}
                                title={wpR.oldTitle}
                                pageid={wpR.pageid}
                                submittedBy={JSON.stringify(wpR.contributors)}
                                dateSubmitted={wpR.timestamp}
                                onApprove={onApprove}
                                onDeny={onDeny}
                                onNavigate={onNavigate}
                                isSubmitting={wpR.pageid.toString() === loadingUpsertId}
                                key={`${wpR.pageid}-${wpRIdx}`}
                            />
                        ) : (
                            <WikiPageRequestCard
                                key={wpR._id}
                                cardData={wpR}
                            />
                        )
                ))
                : (
                    <DefaultRequestCard 
                        noItemsText="You have no wikipage change requests."
                        noItemsTitle="No change requests"
                    />
                )}
        </HStack>
    );
});

type ViewDeleteWikiPageRequestsProps = {
    wikipageRequests: DeleteWikiPageRequestRecord[];
    isAdmin: boolean;
}

export const ViewDeleteWikiPageRequests = observer(({
    wikipageRequests,
    isAdmin
}: ViewDeleteWikiPageRequestsProps) => {
    const navigate = useNavigate();
    const { commonStore, mutateDashboardStore } = useStore();
    const { language } = commonStore;
    const { loadingUpsertId, approveDeleteWikiPageRequest, denyDeleteWikiPageRequest } = mutateDashboardStore;

    const onApprove = useCallback(
        async ( pageid: number | string, id: string, reason: string) => {
            await approveDeleteWikiPageRequest(pageid, {
                id,
                reasonToApproveDelete: reason
            });
        }, 
    []);

    const onDeny = useCallback(
        async ( pageid: number | string, id: string, reason: string) => {
            await denyDeleteWikiPageRequest(pageid, {
                id,
                reasonToDenyDelete: reason
            });
        }, 
    []);
    
    const onNavigate = useCallback((pageid: any) => (e: any) => {
        e.preventDefault();
         navigate(`/${language}/wikipages/${pageid}`)
    }, []);

    return (
        <HStack 
            w="full" 
            flex={{
                base: '90%',
                md: '48%',
                lg: '32%',
                xl: '24%'
            }} 
            wrap="wrap"
        >
            {wikipageRequests && wikipageRequests.length ?
                (wikipageRequests.map(
                    (wPR: DeleteWikiPageRequestRecord, wpRIdx: number) => 
                        isAdmin ? (
                            <ApproveDenyCard
                                id={wPR._id}
                                title={wPR.title!}
                                pageid={wPR.pageid}
                                submittedBy={wPR.submitByUserId}
                                dateSubmitted={wPR.timestamp}
                                onApprove={onApprove}
                                onDeny={onDeny}
                                onNavigate={onNavigate}
                                key={`${wPR.pageid}-${wpRIdx}`}
                                isSubmitting={wPR.pageid.toString() === loadingUpsertId}
                            />
                        ) : (
                            <DeleteWikiPageRequestCard
                                key={wPR._id}
                                cardData={wPR}
                            />
                        )
                ))
                : (
                    <DefaultRequestCard 
                        noItemsText="You have no delete wikipage requests."
                        noItemsTitle="No delete requests"
                    />
                )}
        </HStack>
    );
});