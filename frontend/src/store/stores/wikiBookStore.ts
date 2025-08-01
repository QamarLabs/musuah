import { makeAutoObservable, runInAction } from 'mobx';
import { Pagination, PagingParams } from '../../models/common';
import agent from '../../api/agent';
import { WikiBookRecord } from '../../models/wikibook';

export default class WikiBookStore {
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
    currentWikiBook: WikiBookRecord | undefined = undefined;
    setCurrentWikiBook = (value: WikiBookRecord | undefined) => {
        this.currentWikiBook = value;
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


    loadWikiBook = async (bookId: string) => {
        this.setLoadingInitial(true);
        try {

            const wikibook: WikiBookRecord = await agent.wikiBooks.getWikiBook(bookId);

            console.log('wikiBook', wikibook);

            runInAction(() => {
                this.setCurrentWikiBook(wikibook);
            })

            return wikibook;
        } finally {
            this.setLoadingInitial(false);
        }
    }


    clearWikiBook = () => {
        this.currentWikiBook = undefined;
    }
}