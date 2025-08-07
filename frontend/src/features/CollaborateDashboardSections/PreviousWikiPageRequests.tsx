import { HStack } from "@chakra-ui/react";
import { WikiPageRequestRecord } from "../../models/wikipage";
import { DefaultRequestCard } from "../../common/Cards";
import { observer } from "mobx-react-lite";
import { WikiPageRequestCard } from "./DashboardCards";

type PreviousArticleRequestsProps = {
    wikipageRequests: WikiPageRequestRecord[];
    approved?: boolean;
    denied?: boolean;
}

export const ApprovedWikiPageRequests = observer(({
    wikipageRequests,
    // approved
}: PreviousArticleRequestsProps) => {
    // const onApprove = useCallback(async (e: any) => { }, []);
    // const onDeny = useCallback(async (e: any) => { }, []);

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
                            <WikiPageRequestCard
                                key={`${wpR.pageid}-${wpRIdx}`}
                                cardData={wpR}
                                approved={true}
                            />
                        )
                )
                : (
                    <DefaultRequestCard 
                        noItemsText="None of your wikipage change requests have been approved"
                        noItemsTitle="No approved change requests"
                    />
                )}
        </HStack>
    );
});

export const DeniedWikiPageRequests = observer(({
    wikipageRequests,
    // denied
}: PreviousArticleRequestsProps) => {
    // const onApprove = useCallback(async () => { }, []);
    // const onDeny = useCallback(async () => { }, []);

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
                    (wPR: WikiPageRequestRecord, wpRIdx: number) => 
                        <WikiPageRequestCard
                            key={`${wPR.pageid}_${wpRIdx}`}
                            cardData={wPR}
                            denied={true}
                        />
                ))
                : (
                    <DefaultRequestCard 
                        noItemsText="None of your wikipage change requests have been denied"
                        noItemsTitle="No denied change requests"
                    />
                )}
        </HStack>
    );
});