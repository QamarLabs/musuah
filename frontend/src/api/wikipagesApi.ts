import axios from "axios";
// import { PaginatedResult } from "../models/common";
import { axiosResponseBody, getAuthorizationHeader } from "./agent";
import { ApproveDeleteWikiPageRequest, CreateDeleteWikiPageRequest, DeleteWikiPageRequestRecord, DenyDeleteWikiPageRequest, UpsertWikiPageRequest, WikiPageRecord, WikiPageRequestRecord } from "../models/wikipage";

export const wikipagesApi = {
    getWikiPage: (pageId: string) => 
        axios.get<WikiPageRecord>(`/wikipages/${pageId}`, {}).then(axiosResponseBody),
    getWikiPageRequest: (pageId: string, token: string) => 
        axios.get<WikiPageRequestRecord | undefined>(`/wikipagerequests/${pageId}`, getAuthorizationHeader(token)).then(axiosResponseBody),
    getDeleteWikiPageRequest: (pageId: string, token: string) => 
        axios.get<DeleteWikiPageRequestRecord | undefined>(`/deletewikipagerequests/${pageId}`, getAuthorizationHeader(token)).then(axiosResponseBody),
    createWikiPageRequest: (values: UpsertWikiPageRequest, token: string) => 
        axios.post(`/wikipagerequests`, { values }, getAuthorizationHeader(token)).then(axiosResponseBody),
    updateWikiPageRequest: (wikipageRequestId: string, values: UpsertWikiPageRequest, token: string) => 
        axios.put(`/wikipagerequests/${wikipageRequestId}`, { values }, getAuthorizationHeader(token)).then(axiosResponseBody),
    deleteWikiPageRequest: (wikipageRequestId: string, token: string) => 
        axios.delete(`/wikipagerequests/${wikipageRequestId}`, getAuthorizationHeader(token)).then(axiosResponseBody),
    createDeleteWikiPageRequest: (values: CreateDeleteWikiPageRequest, token: string) => 
        axios.post(`/deletewikipagerequests`, { values }, getAuthorizationHeader(token)).then(axiosResponseBody),
    approveDeleteWikiPageRequest: (deleteWikipageRequestId: string, values: ApproveDeleteWikiPageRequest, token: string) => 
        axios.put(`/deletewikipagerequests/approve/${deleteWikipageRequestId}`, { values }, getAuthorizationHeader(token)).then(axiosResponseBody),
    denyDeleteWikiPageRequest: (deleteWikipageRequestId: string, values: DenyDeleteWikiPageRequest, token: string) => 
        axios.put(`/wikipagerequests/deny/${deleteWikipageRequestId}`, { values }, getAuthorizationHeader(token)).then(axiosResponseBody),
    removeDeleteWikiPageRequest: (deleteWikipageRequestId: string, token: string) => 
        axios.delete(`/wikipagerequests/${deleteWikipageRequestId}`, getAuthorizationHeader(token)).then(axiosResponseBody),
}