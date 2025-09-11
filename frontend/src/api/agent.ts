import axios, { AxiosResponse, AxiosError } from 'axios';
import { PaginatedResult } from '../models/common';
import i18n from '../i18n';
import { router } from '../router';
import { searchApi } from './searchApi';
import { wikiBooksApi } from './wikibooksApi';
import { wikipagesApi } from './wikipagesApi';
import { authApi } from './authApi';
import { aiAssistantApi } from './aiAssistantApi';
import { dashboardApi } from './dashboardApi';

export const axiosResponseBody = (res: AxiosResponse) => res.data;

axios.defaults.baseURL = import.meta.env.VITE_API_URL_NESTJS;

axios.interceptors.response.use(
  async (response) => {
    const pagination = response.headers["pagination"];
    if (pagination) {
      response.data = new PaginatedResult(
        response.data,
        JSON.parse(pagination)
      );
      return response as AxiosResponse<PaginatedResult<any>>;
    }
    return response;
  },
  (error: AxiosError) => {
    const myResponse = error.response as AxiosResponse;
    const modalStateErrors = [];
    if (!myResponse?.status) {
      modalStateErrors.push(i18n.t(error.message, { ns: "errors" }));
      return Promise.reject(modalStateErrors);
    }

    switch (myResponse.status) {
      case 400:
        if (
          myResponse.config.method === "get" &&
          myResponse.data.errors.hasOwnProperty("id")
        ) {
          router.navigate("/not-found");
        }
        if (myResponse.data.errors) {
          for (const key in myResponse.data.errors) {
            if (myResponse.data.errors[key]) {
              modalStateErrors.push(
                i18n.t(myResponse.data.errors[key], { ns: "errors" })
              );
            }
          }
          throw modalStateErrors.flat();
        } else {
          modalStateErrors.push(i18n.t(myResponse.data, { ns: "errors" }));
          throw modalStateErrors.flat();
        }
      case 401:
        if (myResponse.data === "invalid_token") {
          console.log("Expired Session");
        } else {
          throw myResponse.data.message;
        }
        break;
      case 403:
        console.log("Oops, something went wrong")
        break;
      case 404:
        router.navigate("/not-found");
        break;
      case 413:
        modalStateErrors.push(i18n.t(myResponse.data.message, { ns: "errors" }));
        throw modalStateErrors.flat();
      case 418:
        console.log("Oops, something went wrong")
        break;
      case 500:
        console.log("Oops, something went wrong")
        router.navigate("/server-error");
        break;
      default:
        router.navigate("/server-error");
        break;
    }

    return Promise.reject(error);
  }
);

const agent = {
  aiAssistant: aiAssistantApi,
  auth: authApi,
  dashboard: dashboardApi,
  search: searchApi,
  wikiBooks: wikiBooksApi,
  wikiPages: wikipagesApi
};

export const getAuthorizationHeader = (token: string) => ({
      headers: {
          Authorization: `Bearer ${token}`
      }
  })

export default agent;