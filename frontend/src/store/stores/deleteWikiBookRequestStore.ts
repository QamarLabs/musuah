import { makeAutoObservable } from 'mobx';
import { Pagination, PagingParams } from '../../models/common';
import agent from '../../api/agent';
import { ApproveDeleteWikiBookRequest, CreateDeleteWikiBookRequest, DenyDeleteWikiBookRequest } from '../../models/wikibook';
import { store } from '..';

export default class DeleteWikiBookRequestsStore {
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

    
    createDeleteWikiBookRequest = async (
        request: CreateDeleteWikiBookRequest,
    ) => {
        this.setLoadingUpsert(true);
        try {
            const token = store.authStore.userSessionToken;
            if (token)
                await agent.wikiBooks.createDeleteWikibookRequest(request, token!);
            else
                throw new Error("Must be logged in to request a change to an existing wikipage")

        } catch (err) {
            throw err;
        } finally {
            this.setLoadingUpsert(true);
        }
    }
    approveRequest = async (
        deleteWikibookRequestId: string,
        request: ApproveDeleteWikiBookRequest,
    ) => {
        this.setLoadingUpsert(true);
        try {
            const token = store.authStore.userSessionToken;
            if (token)
                await agent.wikiBooks.approveDeleteWikibookRequest(deleteWikibookRequestId, request, token!);
            else
                throw new Error("Must be logged in to request to approve an existing delete wikibook request")

        } catch (err) {
            throw err;
        } finally {
            this.setLoadingUpsert(true);
        }
    }
    denyRequest = async (
        deleteWikibookRequestId: string,
        request: DenyDeleteWikiBookRequest,
    ) => {
        this.setLoadingUpsert(true);
        try {
            const token = store.authStore.userSessionToken;
            if (token)
                await agent.wikiBooks.denyDeleteWikibookRequest(deleteWikibookRequestId, request, token!);
            else
                throw new Error("Must be logged in to request to deny an existing delete wikibook request")

        } catch (err) {
            throw err;
        } finally {
            this.setLoadingUpsert(true);
        }
    }
    removeDeleteWikiBookRequest = async (
        deleteWikiBookRequestId: string
    ) => {
        this.setLoadingUpsert(true);
        try {
            const token = store.authStore.userSessionToken;
            if (token)
                await agent.wikiBooks.removeDeleteWikibookRequest(deleteWikiBookRequestId, token!);
            else
                throw new Error("Must be logged in to request a change to an existing wikipage")

        } catch (err) {
            throw err;
        } finally {
            this.setLoadingUpsert(true);
        }
    }

}