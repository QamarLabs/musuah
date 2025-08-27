import { makeAutoObservable } from 'mobx';
import { Pagination, PagingParams } from '../../models/common';
import agent from '../../api/agent';
import { store } from '..';
import { ApproveDeleteWikiPageRequest, CreateDeleteWikiPageRequest, DenyDeleteWikiPageRequest } from '../../models/wikipage';

export default class DeleteWikiPageRequestsStore {
    constructor() {
        makeAutoObservable(this);
    }

    pagingParams: PagingParams = new PagingParams(1, 25);
    pagination: Pagination | undefined = undefined;

    setPagingParams = (value: PagingParams) => {
        this.pagingParams = value;
    }
    setPagination = (pagination: Pagination) => {
        this.pagination = pagination;
    }

    loadingInitial: boolean = false;
    loadingUpsert: boolean = false;
    setLoadingUpsert = (val: boolean) => {
        this.loadingUpsert = val;
    }
    get axiosParams(): URLSearchParams {
        const params = new URLSearchParams();
        params.append("page", this.pagingParams.pageNumber.toString());
        params.append("limit", this.pagingParams.pageSize.toString());

        return params;
    }

    createDeleteWikiPageRequest = async (
        request: CreateDeleteWikiPageRequest,
    ) => {
        this.setLoadingUpsert(true);
        try {
            const token = store.authStore.userSessionToken;
            if (token)
                await agent.wikiPages.createDeleteWikiPageRequest(request, token!);
            else
                throw new Error("Must be logged in to request a change to an existing wikipage")

        } catch (err) {
            throw err;
        } finally {
            this.setLoadingUpsert(false);
        }
    }
    approveRequest = async (
        deleteWikipageRequestId: string,
        request: ApproveDeleteWikiPageRequest,
    ) => {
        this.setLoadingUpsert(true);
        try {
            const token = store.authStore.userSessionToken;
            if (token)
                await agent.wikiPages.approveDeleteWikiPageRequest(deleteWikipageRequestId, request, token!);
            else
                throw new Error("Must be logged in to request to approve an existing delete wikipage request")

        } catch (err) {
            throw err;
        } finally {
            this.setLoadingUpsert(false);
        }
    }
    denyRequest = async (
        deleteWikipageRequestId: string,
        request: DenyDeleteWikiPageRequest,
    ) => {
        this.setLoadingUpsert(true);
        try {
            const token = store.authStore.userSessionToken;
            if (token)
                await agent.wikiPages.denyDeleteWikiPageRequest(deleteWikipageRequestId, request, token!);
            else
                throw new Error("Must be logged in to request to deny an existing delete wikipage request")

        } catch (err) {
            throw err;
        } finally {
            this.setLoadingUpsert(false);
        }
    }
    removeDeleteWikiPageRequest = async (
        deleteWikiPageRequestId: string
    ) => {
        this.setLoadingUpsert(true);
        try {
            const token = store.authStore.userSessionToken;
            if (token)
                await agent.wikiPages.removeDeleteWikiPageRequest(deleteWikiPageRequestId, token!);
            else
                throw new Error("Must be logged in to request a change to an existing wikipage")

        } catch (err) {
            throw err;
        } finally {
            this.setLoadingUpsert(false);
        }
    }

}