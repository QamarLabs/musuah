import { makeAutoObservable, runInAction } from 'mobx';
import { Pagination, PagingParams } from '../../models/common';
import { ApproveDeleteWikiPageRequest, ApproveWikiPageRequest, DeleteWikiPageRequestRecord, DenyDeleteWikiPageRequest, DenyWikiPageRequest, WikiPageRequestRecord } from '../../models/wikipage';
import { ApproveDeleteWikiBookRequest, DeleteWikiBookRequest, DenyDeleteWikiBookRequest } from '../../models/wikibook';
import agent from '../../api/agent';
import { store } from '..';

export default class MutateDashboardStore {
    constructor() {
        makeAutoObservable(this);
    }

    pagingParams: PagingParams = new PagingParams(1, 25);
    pagination: Pagination | undefined = undefined;
    loadingInitial: boolean = false;
    loadingUpsertId: string | undefined = undefined;
    loadingDeleteRequests: boolean = false;
    setLoadingUpsertId = (val: string | undefined) => {
        this.loadingUpsertId = val;
    }
    setPagingParams = (value: PagingParams) => {
        this.pagingParams = value;
    }
    setPagination = (pagination: Pagination) => {
        this.pagination = pagination;
    }
    wikiPageRequestsToMutateRegistry = new Map<string, WikiPageRequestRecord>();
    deleteWikiPageRequestsToMutateRegistry = new Map<string, DeleteWikiPageRequestRecord>();
    deleteWikiBookRequestsToMutateRegistry = new Map<string, DeleteWikiBookRequest>();

    setWikiPageRequestToMutate = (itm: WikiPageRequestRecord) => {
        this.wikiPageRequestsToMutateRegistry.set(itm._id, itm);
    }
    setDeleteWikiPageRequestToMutate = (itm: DeleteWikiPageRequestRecord) => {
        this.deleteWikiPageRequestsToMutateRegistry.set(itm._id, itm);
    }
    setDeleteWikiBookRequestToMutate = (itm: DeleteWikiBookRequest) => {
        this.deleteWikiBookRequestsToMutateRegistry.set(itm._id, itm);
    }

    get axiosParams(): URLSearchParams {
        const params = new URLSearchParams();
        params.append("page", this.pagingParams.pageNumber.toString());
        params.append("limit", this.pagingParams.pageSize.toString());

        return params;
    }

    private setLoadingInitial = (loading: boolean) => {
        this.loadingInitial = loading;
    }
    private clearRequestsToMutate = () => {
        this.wikiPageRequestsToMutateRegistry.clear();
        this.deleteWikiPageRequestsToMutateRegistry.clear();
        this.deleteWikiBookRequestsToMutateRegistry.clear();
    }

    loadMutateDashboard = async () => {
        this.setLoadingInitial(true);
        try {
            if(!store.authStore.authUserToken)
                throw new Error("Need to be logged in to check dashboard");

            this.clearRequestsToMutate();

            const { 
                results
            } = await agent.dashboard.getRecentRequestsToMutate(store.authStore.authUserToken!);

            results.wikipageRequestsToMutate.forEach((itm: WikiPageRequestRecord) => this.setWikiPageRequestToMutate(itm));
            results.deleteWikipageRequestsToMutate.forEach((itm: DeleteWikiPageRequestRecord) => this.setDeleteWikiPageRequestToMutate(itm));
            results.deleteWikibookRequestsToMutate.forEach((itm: DeleteWikiBookRequest) => this.setDeleteWikiBookRequestToMutate(itm));
            
        } catch(err) {

        } finally {
            this.setLoadingInitial(false);
        }
    }

    approveWikiPageRequest = async (pageid: string | number, values: ApproveWikiPageRequest) => {
        this.setLoadingUpsertId(`${pageid}`);
        try {
            if(!store.authStore.userSessionToken) return;

            await agent.dashboard.approveWikiPageRequest(values.id, store.authStore.userSessionToken, values);

            runInAction(async () => await this.loadMutateDashboard());
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            this.setLoadingUpsertId(undefined);
        }
    }
    denyWikiPageRequest = async (pageid: string | number, values: DenyWikiPageRequest) => {
        this.setLoadingUpsertId(`${pageid}`);
        try {
            if(!store.authStore.userSessionToken) return;

            await agent.dashboard.denyWikiPageRequest(values.id, store.authStore.userSessionToken, values);

            runInAction(async () => await this.loadMutateDashboard());
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            this.setLoadingUpsertId(undefined);
        }
    }

    approveDeleteWikiPageRequest = async (pageid: string | number, values: ApproveDeleteWikiPageRequest) => {
        this.setLoadingUpsertId(`${pageid}`);
        try {
            if(!store.authStore.userSessionToken) return;

            await agent.dashboard.approveDeleteWikiPageRequest(values.id, store.authStore.userSessionToken, values);

            runInAction(async () => await this.loadMutateDashboard());
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            this.setLoadingUpsertId(undefined);
        }
    }
    denyDeleteWikiPageRequest = async (pageid: string | number, values: DenyDeleteWikiPageRequest) => {
        this.setLoadingUpsertId(`${pageid}`);
        try {
            if(!store.authStore.userSessionToken) return;

            await agent.dashboard.denyDeleteWikiPageRequest(values.id, store.authStore.userSessionToken, values);

            runInAction(async () => await this.loadMutateDashboard());
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            this.setLoadingUpsertId(undefined);
        }
    }

    approveDeleteWikiBookRequest = async (bookId: string | number, values: ApproveDeleteWikiBookRequest) => {
        this.setLoadingUpsertId(`${bookId}`);
        try {
            if(!store.authStore.userSessionToken) return;

            await agent.dashboard.approveDeleteWikiBookRequest(values.id, store.authStore.userSessionToken, values);

            runInAction(async () => await this.loadMutateDashboard());
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            this.setLoadingUpsertId(undefined);
        }
    }
    denyDeleteWikiBookRequest = async (bookId: string | number, values: DenyDeleteWikiBookRequest) => {
        this.setLoadingUpsertId(`${bookId}`);
        try {
            if(!store.authStore.userSessionToken) return;

            await agent.dashboard.denyDeleteWikiBookRequest(values.id, store.authStore.userSessionToken, values);

            runInAction(async () => await this.loadMutateDashboard());
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            this.setLoadingUpsertId(undefined);
        }
    }


    clearMutateDashboardRegistries = () => {
        this.wikiPageRequestsToMutateRegistry.clear();
        this.deleteWikiPageRequestsToMutateRegistry.clear();
        this.deleteWikiBookRequestsToMutateRegistry.clear();
    }

    get wikipageRequestsToMutate(){
        return Array.from(this.wikiPageRequestsToMutateRegistry.values());
    }
    get deleteWikiPageRequestsToMutate(){
        return Array.from(this.deleteWikiPageRequestsToMutateRegistry.values());
    }
    get deleteWikiBookRequestsToMutate(){
        return Array.from(this.deleteWikiBookRequestsToMutateRegistry.values());
    }
}
