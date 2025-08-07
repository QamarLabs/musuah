import axios from "axios";
// import { PaginatedResult } from "../models/common";
import { axiosResponseBody, getAuthorizationHeader } from "./agent";
import { ApproveDeleteWikiBookRequest, CreateDeleteWikiBookRequest, DeleteWikiBookRequest, DenyDeleteWikiBookRequest, WikiBookRecord } from "../models/wikibook";

export const wikiBooksApi = {
    getWikiBook: (bookId: string) => 
        axios.get<WikiBookRecord>(`/wikibooks/${bookId}`, {}).then(axiosResponseBody),
    getWikiBookDeleteRequest: (bookId: string, token: string) => 
        axios.get<DeleteWikiBookRequest | undefined>(`/deletewikibookrequests/${bookId}`, getAuthorizationHeader(token)).then(axiosResponseBody),
    createDeleteWikibookRequest: (values: CreateDeleteWikiBookRequest, token: string) => 
        axios.post(`/deletewikibookrequests`, { values }, getAuthorizationHeader(token)).then(axiosResponseBody),
    approveDeleteWikibookRequest: (deleteWikibookRequestId: string, values: ApproveDeleteWikiBookRequest, token: string) => 
        axios.put(`/deletewikibookrequests/approve/${deleteWikibookRequestId}`, { values }, getAuthorizationHeader(token)).then(axiosResponseBody),
    denyDeleteWikibookRequest: (deleteWikibookRequestId: string, values: DenyDeleteWikiBookRequest, token: string) => 
        axios.put(`/deletewikibookrequests/deny/${deleteWikibookRequestId}`, { values }, getAuthorizationHeader(token)).then(axiosResponseBody),
    removeDeleteWikibookRequest: (deleteWikibookRequestId: string, token: string) => 
        axios.delete(`/deletewikibookrequests/${deleteWikibookRequestId}`, getAuthorizationHeader(token)).then(axiosResponseBody),
}