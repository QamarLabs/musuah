import axios from "axios";
// import { PaginatedResult } from "../models/common";
import { axiosResponseBody, getAuthorizationHeader } from "./agent";
import { DashboardCheckResponse, DashboardRecentDeleteRequests, DashboardRecentWikiPageRequests, DashboardResponse, MutateDashboardRecentRequestsResponse, } from "../models/dashboard";
import { ApproveDeleteWikiPageRequest, ApproveWikiPageRequest, DenyDeleteWikiPageRequest, DenyWikiPageRequest } from "../models/wikipage";
import { ApproveDeleteWikiBookRequest, DenyDeleteWikiBookRequest } from "../models/wikibook";

export const dashboardApi = {
    check: (token: string) =>
        axios.get<DashboardCheckResponse>(`/dashboard/check`,  getAuthorizationHeader(token)).then(axiosResponseBody),
    getWikiPageRequests: (token: string) => 
        axios.get<DashboardResponse<DashboardRecentWikiPageRequests>>(`/dashboard/wikipagerequests`,  getAuthorizationHeader(token)).then(axiosResponseBody),
    getDeleteRequests: (token: string): Promise<DashboardResponse<DashboardRecentDeleteRequests>> => 
        axios.get<DashboardResponse<DashboardRecentDeleteRequests>>(`/dashboard/deleterequests`, getAuthorizationHeader(token)).then(axiosResponseBody),
    getRecentActivityLogs: (token: string) => 
        axios.get<DashboardResponse<any>>(`/dashboard/recentactivitylogs`, getAuthorizationHeader(token)).then(axiosResponseBody),
    getRecentRequestsToMutate: (token: string): Promise<DashboardResponse<MutateDashboardRecentRequestsResponse>> => 
        axios.get<DashboardResponse<MutateDashboardRecentRequestsResponse>>(`/dashboard/mutate/recentrequests`,  getAuthorizationHeader(token)).then(axiosResponseBody),
    
    approveWikiPageRequest: (id: string, token: string, values: ApproveWikiPageRequest) => axios.patch(`/wikipagerequests/approve/${id}`, { values }, getAuthorizationHeader(token)).then(axiosResponseBody),
    denyWikiPageRequest: (id: string, token: string, values: DenyWikiPageRequest) => axios.patch(`/wikipagerequests/deny/${id}`, { values }, getAuthorizationHeader(token)).then(axiosResponseBody),
    approveDeleteWikiPageRequest: (id: string, token: string, values: ApproveDeleteWikiPageRequest) => axios.patch(`/deletewikipagerequests/approve/${id}`, { values }, getAuthorizationHeader(token)).then(axiosResponseBody),
    denyDeleteWikiPageRequest: (id: string, token: string, values: DenyDeleteWikiPageRequest) => axios.patch(`/deletewikipagerequests/deny/${id}`, { values }, getAuthorizationHeader(token)).then(axiosResponseBody),
    approveDeleteWikiBookRequest: (id: string, token: string, values: ApproveDeleteWikiBookRequest) => axios.patch(`/deletewikibookrequests/approve/${id}`, { values }, getAuthorizationHeader(token)).then(axiosResponseBody),
    denyDeleteWikiBookRequest: (id: string, token: string, values: DenyDeleteWikiBookRequest) => axios.patch(`/deletewikibookrequests/deny/${id}`, { values }, getAuthorizationHeader(token)).then(axiosResponseBody),
};