import { makeAutoObservable } from 'mobx';
import { Pagination, PagingParams } from '../../models/common';
import agent from '../../api/agent';
import { UpsertWikiPageRequest } from '../../models/wikipage';
import { store } from '..';

export default class WikiPageRequestsStore {
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

    createWikiPageRequest = async (
        request: UpsertWikiPageRequest,
      ) => {
        this.setLoadingUpsert(true);
        try {
            const token = store.authStore.userSessionToken;
            if(token)
                await agent.wikiPages.createWikiPageRequest(request, token!);
            else
                throw new Error("Must be logged in to request a change to an existing wikipage")

        } catch(err) {
            throw err;
        } finally {
            this.setLoadingUpsert(true);
        }
    }
    updateWikiPageRequest = async (
        wikipageRequestId: string,
        request: UpsertWikiPageRequest,
      ) => {
        this.setLoadingUpsert(true);
        try {
            const token = store.authStore.userSessionToken;
            if(token)
                await agent.wikiPages.updateWikiPageRequest(wikipageRequestId, request, token!);
            else
                throw new Error("Must be logged in to request a change to an existing wikipage")

        } catch(err) {
            throw err;
        } finally {
            this.setLoadingUpsert(true);
        }
    }
    deleteWikiPageRequest = async (
        wikipageRequestId: string
      ) => {
        this.setLoadingUpsert(true);
        try {
            const token = store.authStore.userSessionToken;
            if(token)
                await agent.wikiPages.deleteWikiPageRequest(wikipageRequestId, token!);
            else
                throw new Error("Must be logged in to request a change to an existing wikipage")

        } catch(err) {
            throw err;
        } finally {
            this.setLoadingUpsert(true);
        }
    }
}