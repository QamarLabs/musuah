import { makeAutoObservable, runInAction } from 'mobx';
import { QueriedAutocompleteOption } from '../../models/search';
import { Pagination, PagingParams } from '../../models/common';
import agent from '../../api/agent';
import { CapturePaymentInfo, SetupCustomerPaymentInfo, SubmitCustomerPaymentInfo } from '../../models/payment';
import { paymentApi } from '../../api/paymentApi';

export default class CommonStore {
    constructor() {
        makeAutoObservable(this);
    }

    error: Error | undefined = undefined;
    token: string | undefined = undefined; 
    
    setToken = (val: string | undefined) => {
        this.token = val;
    };
    autoCompleteLoading: boolean = false;
    autocompletePagingParams: PagingParams = new PagingParams(1, 10);
    autocompletePagination: Pagination | undefined = undefined;
    navbarAutocompleteRegistry = new Map<number, QueriedAutocompleteOption>();
    navbarSearchQry: string | undefined = undefined;

    language: "ar" | "al" | "ba" | "cn" | "de" | "en" | "es" | "fa" | "fr" | "hi" | "jp" | "ru" | "tr" | "ur"  = "en";
    ipAddress: string | undefined = undefined;
    paymentCustomerId: string | undefined = undefined;
    paymentCustomerSessionSecret: string | undefined = undefined;
    setPaymentCustomerId = (val: string | undefined) => {
        this.paymentCustomerId = val;
    }
    setPaymentCustomerSessionSecret = (val: string | undefined) => {
        this.paymentCustomerSessionSecret = val;
    }
    paymentClientSecret: string | undefined = undefined;
    setPaymentClientSecret = (val: string | undefined) => {
        this.paymentClientSecret = val;
    }
    initializing: boolean = false;
    setInitializing = (val: boolean) => {
        this.initializing = val;
    }
    capturingDonation: boolean = false;
    setCaptureDonation = (val: boolean) => {
        this.capturingDonation = val;
    }
    donating: boolean = false;
    setDonating = (val: boolean) => {
        this.donating = val;
    }
    private setAutoCompleteLoading = (loading: boolean) => {
        this.autoCompleteLoading = loading;
    }
    private setNavbarAutocompleteOption = (option: QueriedAutocompleteOption) => {
        this.navbarAutocompleteRegistry.set(option.value, option);
    }
    clearNavAutoCompleteRegistry = () => {
        this.navbarAutocompleteRegistry.clear();
    }
    setNavbarSearchQry = (val: string) => {
        this.navbarSearchQry = val ?? "";
    }
    setAutocompletePagingParams = (value: PagingParams) => {
        this.autocompletePagingParams = value;
    }
    setAutocompletePagination = (pagination: Pagination) => {
        this.autocompletePagination = pagination;
    }
    get navbarAutocompleteOptions() {
        return Array.from(this.navbarAutocompleteRegistry.values());
    }
    setIpAddress = (ipAddress: string) => {
        this.ipAddress = ipAddress;
    }

    setError = (value: Error | undefined) => {
        this.error = value;
    }

    setLanguage = (val: "ar" | "al" | "ba" | "cn" | "de" | "en" | "es" | "fa" | "fr" | "hi" | "jp" | "ru" | "tr" | "ur") => {
        this.language = val;
    }
    get autocompleteAxiosParams(): URLSearchParams {
        const params = new URLSearchParams();
        params.append("page", this.autocompletePagingParams.pageNumber.toString());
        params.append("limit", this.autocompletePagingParams.pageSize.toString());

        return params;
    }

    initializeDonation = async (values: SetupCustomerPaymentInfo) => {
        this.setInitializing(false);
        let sessionResponse: any | undefined = undefined;
        try {
            sessionResponse = await paymentApi.initializeSession(values);
            console.log("SESSION RESPONSE:", sessionResponse)
        } catch(err) {
            console.log("Error submitting donation", err);
        } finally {
            this.setInitializing(false);
            return sessionResponse;
        }

    }
    donatePayment = async(values: SubmitCustomerPaymentInfo) => {
        this.setDonating(true)
        try {

            return await paymentApi.submitPayment(values);

        } catch (err) {

        } finally {
            this.setDonating(false)
        }
    }
    capturePayment = async (values: CapturePaymentInfo) => {
        this.setCaptureDonation(true)
        try {
            console.log('values:', values);
            return await paymentApi.capturePayment(values);

        } catch (err) {

        } finally {
            this.setCaptureDonation(false)
        }
    }

    loadAutocompleteOptions = async (qry: string) => { 
        this.setAutoCompleteLoading(true);
        this.setNavbarSearchQry(qry);
        try {
            const params = this.autocompleteAxiosParams;
            params.append('qry', qry);
            const { results } = await agent.search.autocompleteSearch(params);

            this.clearNavAutoCompleteRegistry();
            results.data.forEach(aC => this.setNavbarAutocompleteOption(aC));  

            runInAction(() => {
                this.setAutocompletePagination(results.pagination);
            });
            
            // return data;
        } finally {
            this.setAutoCompleteLoading(false);
        }
    }
}