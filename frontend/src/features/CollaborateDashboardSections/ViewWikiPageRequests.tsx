import { HStack, Loader } from "@chakra-ui/react";
import { WikiPageRequestRecord } from "../../models/wikipage";
import { ApproveDenyCard, ViewRequestCard } from "../../common/Cards";
import { useCallback } from "react";
import { RequestType } from "../../models/common";
import { observer } from "mobx-react-lite";

type ViewArticleRequestsProps = {
    wikipageRequests: WikiPageRequestRecord[];
    isAdmin: boolean;
}

function ViewWikiPageRequests({
    wikipageRequests,
    isAdmin
}: ViewArticleRequestsProps) {
    const onApprove = useCallback(async (e: any) => { }, []);
    const onDeny = useCallback(async (e: any) => { }, []);

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
                    (wpR: WikiPageRequestRecord, wpRIdx: number) => isAdmin ? (
                        <ApproveDenyCard
                            title={wpR.oldTitle}
                            onApprove={onApprove}
                            onDeny={onDeny}
                            key={`${wpR.pageid}-${wpRIdx}`}
                        />
                    ) : (
                        <ViewRequestCard
                            cardData={wpR}
                            requestType={RequestType.Wikipage}
                        />
                    )
                ))
                : (
                    <Loader color="black" />
                )}
        </HStack>
    );
}
export default observer(ViewWikiPageRequests);