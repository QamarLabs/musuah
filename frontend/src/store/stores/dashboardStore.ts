import { makeAutoObservable, runInAction } from 'mobx';
import { Pagination, PagingParams } from '../../models/common';
import { DeleteWikiPageRequestRecord, WikiPageRequestRecord } from '../../models/wikipage';
import { DeleteWikiBookRequest } from '../../models/wikibook';

export default class DashboardStore {
    constructor() {
        makeAutoObservable(this);
    }

    pagingParams: PagingParams = new PagingParams(1, 25);
    pagination: Pagination | undefined = undefined;
    loadingInitial: boolean = false;
    setPagingParams = (value: PagingParams) => {
        this.pagingParams = value;
    }
    setPagination = (pagination: Pagination) => {
        this.pagination = pagination;
    }
    currentWikiPageRequestRegistry = new Map<string, WikiPageRequestRecord>();
    approveWikiPageRequestRegistry = new Map<string, WikiPageRequestRecord>();
    deniedWikiPageRequestRegistry = new Map<string, WikiPageRequestRecord>();
    deleteWikiPageRequestRegistry = new Map<string, DeleteWikiPageRequestRecord>();
    deleteWikiBookRequestRegistry = new Map<string, DeleteWikiBookRequest>();


    get axiosParams(): URLSearchParams {
        const params = new URLSearchParams();
        params.append("page", this.pagingParams.pageNumber.toString());
        params.append("limit", this.pagingParams.pageSize.toString());

        return params;
    }

    

    private setLoadingInitial = (loading: boolean) => {
        this.loadingInitial = loading;
    }


}