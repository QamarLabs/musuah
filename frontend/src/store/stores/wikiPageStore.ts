import { makeAutoObservable, runInAction } from 'mobx';
import { Pagination, PagingParams } from '../../models/common';
import agent from '../../api/agent';
import { WikiPageRecord } from '../../models/wikipage';

export default class WikiPageStore {
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
    currentWikiPage: WikiPageRecord | undefined = undefined;
    setCurrentWikiPage = (value: WikiPageRecord | undefined) => {
        this.currentWikiPage = value;
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

    
    loadWikiPage = async (pageId: string) => {
        this.setLoadingInitial(true);
        try {

            const wikipage: WikiPageRecord = await agent.wikiPages.getWikiPage(pageId);

            console.log('wikipage:', JSON.stringify(wikipage));
            runInAction(() => {
                this.setCurrentWikiPage(wikipage)
            })
            
            return wikipage;
        } finally {
            this.setLoadingInitial(false);
        }
    }

    clearWikiPage = () => {
        this.currentWikiPage = undefined;
    }
}