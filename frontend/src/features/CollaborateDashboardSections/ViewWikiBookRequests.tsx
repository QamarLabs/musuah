import { HStack } from "@chakra-ui/react";
import { ApproveDenyCard, DefaultRequestCard } from "../../common/Cards";
import { useCallback } from "react";
import { observer } from "mobx-react-lite";
import { DeleteWikiBookRequest } from "../../models/wikibook";
import { DeleteWikiBookRequestCard } from "./DashboardCards";

type ViewDeleteWikiBookRequestsProps = {
    wikibookRequests: DeleteWikiBookRequest[];
    isAdmin: boolean;
}

export const ViewDeleteWikiBookRequests = observer(({
    wikibookRequests,
    isAdmin
}: ViewDeleteWikiBookRequestsProps) => {
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
            {wikibookRequests && wikibookRequests.length ?
                (wikibookRequests.map(
                    (wBR: DeleteWikiBookRequest, wpRIdx: number) => 
                        isAdmin ? (
                            <ApproveDenyCard
                                title={wBR.title!}
                                onApprove={onApprove}
                                onDeny={onDeny}
                                key={`${wBR._id}-${wpRIdx}`}
                            />
                        ) : (
                            <DeleteWikiBookRequestCard
                                key={wBR._id}
                                cardData={wBR}
                            />
                        )
                ))
                : (
                    <DefaultRequestCard 
                        noItemsText="You have no delete wikibook requests."
                        noItemsTitle="No delete requests"
                    />
                )}
        </HStack>
    );
});