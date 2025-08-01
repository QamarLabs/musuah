import { createContext, useContext } from 'react';
import SearchStore from './stores/searchStore';
import CommonStore from './stores/commonStore';
import WikiPageStore from './stores/wikiPageStore';
import AuthStore from './stores/authStore';
import AiAssistantStore from './stores/aiAssistantStore';
import SearchBooksStore from './stores/searchBooksStore';
import WikiBookStore from './stores/wikiBookStore';

interface Store {
    aiAssistantStore: AiAssistantStore;
    authStore: AuthStore;
    commonStore: CommonStore;
    searchStore: SearchStore;
    searchBooksStore: SearchBooksStore;
    wikiBookStore: WikiBookStore;
    wikiPageStore: WikiPageStore;
}

export const store: Store ={
    aiAssistantStore: new AiAssistantStore(),
    authStore: new AuthStore(),
    commonStore: new CommonStore(),
    searchStore: new SearchStore(),
    searchBooksStore: new SearchBooksStore(),
    wikiBookStore: new WikiBookStore(),
    wikiPageStore: new WikiPageStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}
