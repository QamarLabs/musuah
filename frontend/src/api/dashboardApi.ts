import axios from "axios";
// import { PaginatedResult } from "../models/common";
import { axiosResponseBody, getAuthorizationHeader } from "./agent";
import { DashboardRecentDeleteRequests, DashboardRecentWikiPageRequests, DashboardResponse } from "../models/dashboard";

export const dashboardApi = {
    getWikiPageRequests: (token: string) => 
        axios.get<DashboardResponse<DashboardRecentWikiPageRequests>>(`/dashboard/wikipagerequests`,  getAuthorizationHeader(token)).then(axiosResponseBody),
    getDeleteRequests: (token: string) => 
        axios.get<DashboardResponse<DashboardRecentDeleteRequests>>(`/dashboard/deleterequests`, getAuthorizationHeader(token)).then(axiosResponseBody),
    getRecentActivityLogs: (token: string) => 
        axios.get<DashboardResponse<any>>(`/dashboard/recentactivitylogs`, getAuthorizationHeader(token)).then(axiosResponseBody),
};