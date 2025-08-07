import React from 'react';
import { FlexItem } from '@wordpress/components';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { Text } from '@chakra-ui/react';
import Autocomplete from '../common/Autocomplete';
import { useStore } from '../store';
import { useNavigate } from 'react-router';
import { AutocompleteType } from '../models/common';
import useLoadDataFromGetQueryParams from '../hooks/useLoadDataFromQueryParams';

export default observer(function WikiSearchResults() {
    const {
        t,
        // i18n 
    } = useTranslation("common");
    const navigate = useNavigate();
    const { commonStore, searchStore } = useStore();
    const { language } = commonStore;
    const { searchQry, searchResults, loadSearchWikiPages } = searchStore;
    

    // const [query, setQuery] = useState(initialQuery);
    // const [results, setResults] = useState<string[]>([]);

    
    const handleSubmitSearch = (setOpen: Function) => async (e: React.MouseEvent) => {
        e.preventDefault();
        // Simulate search results
        if (searchQry) {
            loadSearchWikiPages(searchQry)
                .then(() => {
                    setOpen(false);
                    window.location.search = `/search?title=${searchQry}`;
                })
        }
    };

    useLoadDataFromGetQueryParams({key: "title", loadData: loadSearchWikiPages});

    return (
        <div className="layout-main-content-container">
            {/* Header with search bar */}
            <header className="search-header">
                <FlexItem className='autocompleteContainer'>
                    <Autocomplete
                        id='search-results-autocomplete'
                        key="search-results-autocomplete"
                        placeholder={t("searchPlaceholder")}
                        autocompleteType={AutocompleteType.Search}
                        handleSubmitSearch={handleSubmitSearch}
                        hasButton={true}
                    />
                </FlexItem>
            </header>

            <div className="main-content">

                {/* Main Content Area */}
                <main className="results-area mw-text">
                    {searchResults && searchResults.length > 0 ? (
                        <div className="results-list">
                            <h2>{t("searchResultsFor")} "{searchQry}"</h2>
                            <ul>
                                {searchResults.map((itm) => (
                                    <li key={itm.id} className="result-item">
                                        <Text
                                            fontSize="100%"
                                            className=' mw-link'
                                            cursor='pointer'
                                            color='blue.400'
                                            onClick={() => {
                                                navigate(`/${language}/wikipages/${itm.pageid}`)
                                            }}
                                            _hover={{
                                                textDecoration: 'underline'
                                            }}
                                        >
                                            {itm.title}
                                        </Text>
                                        <p>{itm.summary}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <div className="empty-state">
                            <p>{t("searchPagesFromHere")}</p>
                        </div>
                    )}
                </main>


            </div>
        </div>
    );
});

