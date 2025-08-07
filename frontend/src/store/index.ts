import { createContext, useContext } from 'react';
import SearchStore from './stores/searchStore';
import CommonStore from './stores/commonStore';
import WikiPageStore from './stores/wikiPageStore';
import AuthStore from './stores/authStore';
import AiAssistantStore from './stores/aiAssistantStore';
import SearchBooksStore from './stores/searchBooksStore';
import WikiBookStore from './stores/wikiBookStore';
import DashboardStore from './stores/dashboardStore';
import WikiPageRequestsStore from './stores/wikipageRequestStore';
import DeleteWikiBookRequestsStore from './stores/deleteWikiBookRequestStore';
import DeleteWikiPageRequestsStore from './stores/deleteWikipageRequestStore';

interface Store {
    aiAssistantStore: AiAssistantStore;
    authStore: AuthStore;
    commonStore: CommonStore;
    dashboardStore: DashboardStore;
    deleteWikiBookRequestStore: DeleteWikiBookRequestsStore;
    deleteWikiPageRequestStore: DeleteWikiPageRequestsStore;
    searchStore: SearchStore;
    searchBooksStore: SearchBooksStore;
    wikiBookStore: WikiBookStore;
    wikiPageStore: WikiPageStore;
    wikiPageRequestStore: WikiPageRequestsStore;
}

export const store: Store ={
    aiAssistantStore: new AiAssistantStore(),
    authStore: new AuthStore(),
    commonStore: new CommonStore(),
    dashboardStore: new DashboardStore(),
    deleteWikiBookRequestStore: new DeleteWikiBookRequestsStore(),
    deleteWikiPageRequestStore: new DeleteWikiPageRequestsStore(),
    searchStore: new SearchStore(),
    searchBooksStore: new SearchBooksStore(),
    wikiBookStore: new WikiBookStore(),
    wikiPageStore: new WikiPageStore(),
    wikiPageRequestStore: new WikiPageRequestsStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}
