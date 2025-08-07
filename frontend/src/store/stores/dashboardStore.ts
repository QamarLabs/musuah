import { makeAutoObservable, runInAction } from 'mobx';
import { Pagination, PagingParams } from '../../models/common';
import { DeleteWikiPageRequestRecord, WikiPageRequestRecord } from '../../models/wikipage';
import { DeleteWikiBookRequest } from '../../models/wikibook';
import agent from '../../api/agent';
import { store } from '..';

export default class DashboardStore {
    constructor() {
        makeAutoObservable(this);
    }

    pagingParams: PagingParams = new PagingParams(1, 25);
    pagination: Pagination | undefined = undefined;
    loadingInitial: boolean = false;
    loadingDeleteRequests: boolean = false;
    setPagingParams = (value: PagingParams) => {
        this.pagingParams = value;
    }
    setPagination = (pagination: Pagination) => {
        this.pagination = pagination;
    }
    currentWikiPageRequestRegistry = new Map<string, WikiPageRequestRecord>();
    pendingWikiPageRequestRegistry = new Map<string, WikiPageRequestRecord>();
    approveWikiPageRequestRegistry = new Map<string, WikiPageRequestRecord>();
    deniedWikiPageRequestRegistry = new Map<string, WikiPageRequestRecord>();
    deleteWikiPageRequestRegistry = new Map<string, DeleteWikiPageRequestRecord>();
    deleteWikiBookRequestRegistry = new Map<string, DeleteWikiBookRequest>();
    recentActivityLogsRegistry = new Map<string, any>();
    setCurrentWikiPageRequest = (itm: WikiPageRequestRecord) => {
        this.currentWikiPageRequestRegistry.set(itm._id, itm);
    }
    setPendingWikiPageRequest = (itm: WikiPageRequestRecord) => {
        this.pendingWikiPageRequestRegistry.set(itm._id, itm);
    }
    setApproveWikiPageRequest = (itm: WikiPageRequestRecord) => {
        this.approveWikiPageRequestRegistry.set(itm._id, itm);
    }
    setDeniedWikiPageRequest = (itm: WikiPageRequestRecord) => {
        this.deniedWikiPageRequestRegistry.set(itm._id, itm);
    }
    setDeleteWikiPageRequest = (itm: DeleteWikiPageRequestRecord) => {
        this.deleteWikiPageRequestRegistry.set(itm._id, itm);
    }
    setDeleteWikiBookRequest = (itm: DeleteWikiBookRequest) => {
        this.deleteWikiBookRequestRegistry.set(itm._id, itm);
    }
    setRecentActivityLogItem = (itm: any) => {
        this.recentActivityLogsRegistry.set(itm._id, itm);
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
    private setLoadingDeleteRequests = (loading: boolean) => {
        this.loadingDeleteRequests = loading;
    }

    private clearWikiPageRequests = () => {
        this.currentWikiPageRequestRegistry.clear();
        this.approveWikiPageRequestRegistry.clear();
        this.deniedWikiPageRequestRegistry.clear();
    }
    private clearDeletedWikiRequests = () => {
        this.deleteWikiPageRequestRegistry.clear();
        this.deleteWikiBookRequestRegistry.clear();
    }

    loadDashboard = async () => {
        this.setLoadingInitial(true);
        try {
            if(!store.authStore.authUserToken)
                throw new Error("Need to be logged in to check dashboard");

            this.clearWikiPageRequests();
            await this.loadDashboardWikiRequests();
            
            runInAction(async () => {
                await this.loadDeletedDashboardRequests();
            });

            runInAction(async () => {
                await this.loadActivityLogs();
            })
        } catch(err) {

        } finally {
            this.setLoadingInitial(false);
        }
    }
    loadDashboardWikiRequests = async () => {
        try {
            this.clearWikiPageRequests();

            const { 
                results
            } = await agent.dashboard.getWikiPageRequests(store.authStore.authUserToken!);

            results.pendingRequests.forEach((itm: WikiPageRequestRecord) => this.setPendingWikiPageRequest(itm));
            results.approvedRequests.forEach((itm: WikiPageRequestRecord) => this.setApproveWikiPageRequest(itm));
            results.deniedRequests.forEach((itm: WikiPageRequestRecord) => this.setDeniedWikiPageRequest(itm));
            results.recentRequests.forEach((itm: WikiPageRequestRecord) => this.setCurrentWikiPageRequest(itm));

        } catch(err) { 
            console.log('Get dashboard wikipage requests error!:', err);
        } finally {
        }
    }

    loadDeletedDashboardRequests = async () => {
        this.setLoadingDeleteRequests(true);
        try {
            this.clearDeletedWikiRequests();

            const { 
                results
            } = await agent.dashboard.getDeleteRequests(store.authStore.authUserToken!);

            results.deleteWikiPageRequests.forEach((itm: DeleteWikiPageRequestRecord) => this.setDeleteWikiPageRequest(itm));
            results.deleteWikiBookRequests.forEach((itm: DeleteWikiBookRequest) => this.setDeleteWikiBookRequest(itm));

            runInAction(() => {
                
            })
        } catch(err) {

        } finally {
            this.setLoadingDeleteRequests(false);
        }
    }

    loadActivityLogs = async () => {
        try {
            this.recentActivityLogsRegistry.clear();

            const { 
                results
            } = await agent.dashboard.getRecentActivityLogs(store.authStore.authUserToken!);

            results.forEach((itm: any) => this.setRecentActivityLogItem(itm));
        } finally {

        }
    }

    get currentWikiPageRequests(){
        return Array.from(this.currentWikiPageRequestRegistry.values());
    }
    get pendingWikiPageRequests(){
        return Array.from(this.pendingWikiPageRequestRegistry.values());
    }
    get approveWikiPageRequests(){
        return Array.from(this.approveWikiPageRequestRegistry.values());
    }
    get deniedWikiPageRequests(){
        return Array.from(this.deniedWikiPageRequestRegistry.values());
    }

    get deleteWikiPageRequests(){
        return Array.from(this.deleteWikiPageRequestRegistry.values());
    }
    get deleteWikiBookRequests(){
        return Array.from(this.deleteWikiBookRequestRegistry.values());
    }
    get recentActivityLog(){
        return Array.from(this.recentActivityLogsRegistry.values());
    }
}
