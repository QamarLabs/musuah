import { makeAutoObservable, runInAction } from 'mobx';
import { Pagination, PagingParams } from '../../models/common';
import { QueriedAutocompleteOption, WikiPageSearchResult } from '../../models/search';
import agent from '../../api/agent';
import React from 'react';
export default class SearchStore {
    constructor() {
        makeAutoObservable(this,{
            inputRef: false, // mark as non-observable
        });
    }

    pagingParams: PagingParams = new PagingParams(1, 10);
    autocompletePagingParams: PagingParams = new PagingParams(1, 10);

    autocompletePagination: Pagination | undefined = undefined;
    pagination: Pagination | undefined = undefined;

    searchQry: string | undefined = undefined;
    inputRef: React.RefObject<HTMLInputElement | null> | null = null;
    setInputRef(ref: React.RefObject<HTMLInputElement | null> | null) {
        this.inputRef = ref;
    }
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
    searchedWikiPages = new Map<number, WikiPageSearchResult>();
    queriedAutocompleteOptions = new Map<number, QueriedAutocompleteOption>();

    get searchResults() {
        return Array.from(this.searchedWikiPages.values());
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
    private setSearchedWikiPage = (value: WikiPageSearchResult) => {
        this.searchedWikiPages.set(value.pageid, value);
    }
    private setQueriedAutocompleteOption = (option: QueriedAutocompleteOption) => {
        this.queriedAutocompleteOptions.set(option.value, option);
    }
    clearAutoCompleteOptions = () => {
        this.queriedAutocompleteOptions.clear();
    }
    clearSearch = () => {
        this.searchedWikiPages.clear();
    }

    loadSearchWikiPages = async (qry: string) => {
        this.setSearchLoading(true);
        this.setSearchQry(qry);
        try {
            this.clearSearch();
            const params = this.axiosParams;
            params.append('qry', qry);
            const { results } = await agent.search.search(params);

            console.log('results:', results)
            results.data.forEach(sr => this.setSearchedWikiPage(sr));
            runInAction(() => {
                this.setPagination(results.pagination);
            });
            
        } finally {
            this.setSearchLoading(false);
        }
    }
    loadAutocompleteOptions = async (qry: string) => {
        this.setAutoCompleteLoading(true);
        this.setSearchQry(qry);
        try {
            this.clearAutoCompleteOptions();
            const params = this.autocompleteAxiosParams;
            params.append('qry', qry);

            const { results } = await agent.search.autocompleteSearch(params);

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