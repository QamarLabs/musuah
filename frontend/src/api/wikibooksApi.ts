import axios from "axios";
// import { PaginatedResult } from "../models/common";
import { axiosResponseBody } from "./agent";
import { WikiBookRecord } from "../models/wikibook";

export const wikiBooksApi = {
    getWikiBook: (bookId: string) => 
        axios.get<WikiBookRecord>(`/wikibooks/${bookId}`, {}).then(axiosResponseBody)
}