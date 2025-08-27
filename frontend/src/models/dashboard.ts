import { DeleteWikiBookRequest } from "./wikibook";
import { DeleteWikiPageRequestRecord, WikiPageRequestRecord } from "./wikipage"

export interface DashboardCheckResponse {
    cM: boolean;
    status: number;
}

export interface DashboardResponse<T> {
    results: T;
    status: number;
}

export interface DashboardRecentWikiPageRequests {
    pendingRequests: WikiPageRequestRecord[];
    approvedRequests: WikiPageRequestRecord[];
    deniedRequests: WikiPageRequestRecord[];
    recentRequests: WikiPageRequestRecord[];
}

export interface DashboardRecentDeleteRequests {
    recentDeleteWikiPageRequests: DeleteWikiPageRequestRecord[];
    approvedDeleteWikiPageRequests: DeleteWikiPageRequestRecord[];
    deniedDeleteWikiPageRequests: DeleteWikiPageRequestRecord[];
    recentDeleteWikiBookRequests: DeleteWikiBookRequest[];
    approvedWikiBookRequests: DeleteWikiBookRequest[];
    deniedWikiBookRequests: DeleteWikiBookRequest[];
}

export interface MutateDashboardRecentRequestsResponse {
    wikipageRequestsToMutate: WikiPageRequestRecord[];
    deleteWikipageRequestsToMutate: DeleteWikiPageRequestRecord[];
    deleteWikibookRequestsToMutate: DeleteWikiBookRequest[];
}
