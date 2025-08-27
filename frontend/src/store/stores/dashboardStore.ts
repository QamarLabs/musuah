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

    recentDeleteWikiPageRequestRegistry = new Map<string, DeleteWikiPageRequestRecord>();
    approvedDeleteWikiPageRequestRegistry = new Map<string, DeleteWikiPageRequestRecord>();
    deniedDeleteWikiPageRequestRegistry = new Map<string, DeleteWikiPageRequestRecord>();
    recentDeleteWikiBookRequestRegistry = new Map<string, DeleteWikiBookRequest>();
    approvedDeleteWikiBookRequestRegistry = new Map<string, DeleteWikiBookRequest>();
    deniedDeleteWikiBookRequestRegistry = new Map<string, DeleteWikiBookRequest>();

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

    setRecentDeleteWikiPageRequest = (itm: DeleteWikiPageRequestRecord) => {
        this.recentDeleteWikiPageRequestRegistry.set(itm._id, itm);
    }
    setApprovedDeleteWikiPageRequest = (itm: DeleteWikiPageRequestRecord) => {
        this.approvedDeleteWikiPageRequestRegistry.set(itm._id, itm);
    }
    setDeniedDeleteWikiPageRequest = (itm: DeleteWikiPageRequestRecord) => {
        this.deniedDeleteWikiPageRequestRegistry.set(itm._id, itm);
    }

    setRecentDeleteWikiBookRequest = (itm: DeleteWikiBookRequest) => {
        this.recentDeleteWikiBookRequestRegistry.set(itm._id, itm);
    }
    setApproveDeleteWikiBookRequest = (itm: DeleteWikiBookRequest) => {
        this.approvedDeleteWikiBookRequestRegistry.set(itm._id, itm);
    }
    setDeniedDeleteWikiBookRequest = (itm: DeleteWikiBookRequest) => {
        this.deniedDeleteWikiBookRequestRegistry.set(itm._id, itm);
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

    clearWikiPageRequests = () => {
        this.currentWikiPageRequestRegistry.clear();
        this.approveWikiPageRequestRegistry.clear();
        this.deniedWikiPageRequestRegistry.clear();
    }
    clearDeletedWikiRequests = () => {
        this.recentDeleteWikiPageRequestRegistry.clear();
        this.approvedDeleteWikiPageRequestRegistry.clear();
        this.deniedDeleteWikiPageRequestRegistry.clear();

        this.recentDeleteWikiBookRequestRegistry.clear();
        this.approvedDeleteWikiBookRequestRegistry.clear();
        this.deniedDeleteWikiBookRequestRegistry.clear();
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

            results.recentDeleteWikiPageRequests.forEach((itm: DeleteWikiPageRequestRecord) => this.setRecentDeleteWikiPageRequest(itm));
            results.approvedDeleteWikiPageRequests.forEach((itm: DeleteWikiPageRequestRecord) => this.setApprovedDeleteWikiPageRequest(itm));
            results.deniedDeleteWikiPageRequests.forEach((itm: DeleteWikiPageRequestRecord) => this.setDeniedDeleteWikiPageRequest(itm));


            results.recentDeleteWikiBookRequests.forEach((itm: DeleteWikiBookRequest) => this.setRecentDeleteWikiBookRequest(itm));
            results.approvedWikiBookRequests.forEach((itm: DeleteWikiBookRequest) => this.setApproveDeleteWikiBookRequest(itm));
            results.deniedWikiBookRequests.forEach((itm: DeleteWikiBookRequest) => this.setDeniedDeleteWikiBookRequest(itm));


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

    get recentDeleteWikiPageRequests(){
        return Array.from(this.recentDeleteWikiPageRequestRegistry.values());
    }
    get approvedDeleteWikiPageRequests(){
        return Array.from(this.approvedDeleteWikiPageRequestRegistry.values());
    }
    get deniedDeleteWikiPageRequests(){
        return Array.from(this.deniedDeleteWikiPageRequestRegistry.values());
    }


    get recentDeleteWikiBookRequests(){
        return Array.from(this.recentDeleteWikiBookRequestRegistry.values());
    }
    get approvedDeleteWikiBookRequests(){
        return Array.from(this.approvedDeleteWikiBookRequestRegistry.values());
    }
    get deniedDeleteWikiBookRequests(){
        return Array.from(this.deniedDeleteWikiBookRequestRegistry.values());
    }
    get recentActivityLog(){
        return Array.from(this.recentActivityLogsRegistry.values());
    }
}
