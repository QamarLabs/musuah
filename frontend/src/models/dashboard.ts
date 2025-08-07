import { DeleteWikiBookRequest } from "./wikibook";
import { DeleteWikiPageRequestRecord, WikiPageRequestRecord } from "./wikipage"

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
    deleteWikiPageRequests: DeleteWikiPageRequestRecord[];
    deleteWikiBookRequests: DeleteWikiBookRequest[];
}
