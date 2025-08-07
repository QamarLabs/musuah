import { HStack } from "@chakra-ui/react";
import { DeleteWikiPageRequestRecord, WikiPageRequestRecord } from "../../models/wikipage";
import { ApproveDenyCard, DefaultRequestCard } from "../../common/Cards";
import { useCallback } from "react";
import { observer } from "mobx-react-lite";
import { DeleteWikiPageRequestCard, WikiPageRequestCard } from "./DashboardCards";

type ViewArticleRequestsProps = {
    wikipageRequests: WikiPageRequestRecord[];
    isAdmin: boolean;
}

export const ViewWikiPageRequests = observer(({
    wikipageRequests,
    isAdmin
}: ViewArticleRequestsProps) => {
    const onApprove = useCallback(async () => { }, []);
    const onDeny = useCallback(async () => { }, []);

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
                                title={wpR.oldTitle}
                                onApprove={onApprove}
                                onDeny={onDeny}
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
    const onApprove = useCallback(async () => { }, []);
    const onDeny = useCallback(async () => { }, []);

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
                                title={wPR.title!}
                                onApprove={onApprove}
                                onDeny={onDeny}
                                key={`${wPR.pageid}-${wpRIdx}`}
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