import { HStack } from "@chakra-ui/react";
import { ApproveDenyCard, DefaultRequestCard } from "../../common/Cards";
import { useCallback } from "react";
import { observer } from "mobx-react-lite";
import { DeleteWikiBookRequest } from "../../models/wikibook";
import { DeleteWikiBookRequestCard } from "./DashboardCards";
import { useNavigate } from "react-router";
import { useStore } from "../../store";

type ViewDeleteWikiBookRequestsProps = {
    wikibookRequests: DeleteWikiBookRequest[];
    isAdmin: boolean;
}

export const ViewDeleteWikiBookRequests = observer(({
    wikibookRequests,
    isAdmin
}: ViewDeleteWikiBookRequestsProps) => {
    const { commonStore, mutateDashboardStore } = useStore();
    const { language } = commonStore;
    const { loadingUpsertId, approveDeleteWikiBookRequest, denyDeleteWikiBookRequest } = mutateDashboardStore;
    const navigate = useNavigate();

    const onApprove = useCallback(
        async ( bookId: number | string, id: string, reason: string) => {
            await approveDeleteWikiBookRequest(bookId, {
                id,
                reasonToApproveDelete: reason
            });
        }, 
    []);

    const onDeny = useCallback(
        async ( bookId: number | string, id: string, reason: string) => {
            await denyDeleteWikiBookRequest(bookId, {
                id,
                reasonToDenyDelete: reason
            });
        }, 
    []);
    
    const onNavigate = useCallback((bookId: any) => (e: any) => {
        e.preventDefault();
         navigate(`/${language}/wikibooks/${bookId}`, { replace: true });
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
            {wikibookRequests && wikibookRequests.length ?
                (wikibookRequests.map(
                    (wBR: DeleteWikiBookRequest, wpRIdx: number) => 
                        isAdmin ? (
                            <ApproveDenyCard
                                id={wBR._id}
                                bookId={wBR.bookId}
                                title={wBR.title!}
                                submittedBy={wBR.judgedByUserName}
                                dateSubmitted={wBR.timestamp}
                                onApprove={onApprove}
                                onDeny={onDeny}
                                onNavigate={onNavigate}
                                key={`${wBR._id}-${wpRIdx}`}
                                isSubmitting={loadingUpsertId === wBR.bookId}
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