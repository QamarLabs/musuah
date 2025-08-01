import { makeAutoObservable, runInAction } from 'mobx';
import { Pagination, PagingParams } from '../../models/common';
import { QueriedAutocompleteOption, WikiBookSearchResult } from '../../models/search';
import agent from '../../api/agent';

export default class SearchBooksStore {
    constructor() {
        makeAutoObservable(this);
    }

    pagingParams: PagingParams = new PagingParams(1, 25);
    autocompletePagingParams: PagingParams = new PagingParams(1, 10);

    autocompletePagination: Pagination | undefined = undefined;
    pagination: Pagination | undefined = undefined;

    searchQry: string | undefined = undefined;
    setPagingParams = (value: PagingParams) => {
        this.pagingParams = value;
    }
    setSearchQry = (val: string) => {
        this.searchQry = val ?? "";
    }
    setPagination = (pagination: Pagination) => {
        this.pagination = pagination;
    }
    setAutocompletePagination = (pagination: Pagination) => {
        this.autocompletePagination = pagination;
    }
    
    searchLoading = false;
    autoCompleteLoading = false;
    searchedWikiBooksRegistry = new Map<string, WikiBookSearchResult>();
    queriedAutocompleteOptions = new Map<number, QueriedAutocompleteOption>();

    get bookSearchResults() {
        return Array.from(this.searchedWikiBooksRegistry.values());
    }
    get autocompleteOptions() {
        return Array.from(this.queriedAutocompleteOptions.values());
    }

    get axiosParams(): URLSearchParams {
        const params = new URLSearchParams();
        params.append("page", this.pagingParams.pageNumber.toString());
        params.append("limit", this.pagingParams.pageSize.toString());

        return params;
    }
    get autocompleteAxiosParams(): URLSearchParams {
        const params = new URLSearchParams();
        params.append("page", this.autocompletePagingParams.pageNumber.toString());
        params.append("limit", this.autocompletePagingParams.pageSize.toString());

        return params;
    }
    private setSearchLoading = (loading: boolean) => {
        this.searchLoading = loading;
    }
    private setAutoCompleteLoading = (loading: boolean) => {
        this.autoCompleteLoading = loading;
    }
    private setSearchedWikiBook = (value: WikiBookSearchResult) => {
        this.searchedWikiBooksRegistry.set(value._id, value);
    }
    private setQueriedAutocompleteOption = (option: QueriedAutocompleteOption) => {
        this.queriedAutocompleteOptions.set(option.value, option);
    }
    clearAutoCompleteOptions = () => {
        this.queriedAutocompleteOptions.clear();
    }
    clearSearch = () => {
        this.searchedWikiBooksRegistry.clear();
    }

    loadSearchWikiBooks = async (qry: string) => {
        this.setSearchLoading(true);
        this.setSearchQry(qry);
        try {
            const params = this.axiosParams;
            params.append('qry', qry);
            const { results } = await agent.search.searchBooks(params);

            this.clearSearch();
            console.log('results:', results)
            results.data.forEach(sr => this.setSearchedWikiBook(sr));
            runInAction(() => {
                this.setPagination(results.pagination);
            });
            
        } finally {
            this.setSearchLoading(false);
        }
    }
    loadBookAutocompleteOptions = async (qry: string) => {
        this.setAutoCompleteLoading(true);
        this.setSearchQry(qry);
        try {
            const params = this.autocompleteAxiosParams;
            params.append('qry', qry);
            const { results } = await agent.search.bookAutocompleteSearch(params);

            this.clearAutoCompleteOptions();
            results.data.forEach(aC => this.setQueriedAutocompleteOption(aC));  

            runInAction(() => {
                this.setAutocompletePagination(results.pagination);
            });
            
            // return data;
        } finally {
            this.setAutoCompleteLoading(false);
        }
    }
}