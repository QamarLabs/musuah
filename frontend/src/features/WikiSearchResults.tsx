import React
// { useState, useEffect, useMemo } 
from 'react';
import { FlexItem } from '@wordpress/components';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import Autocomplete from '../common/Autocomplete';
import { useStore } from '../store';
import { useNavigate } from 'react-router';
import { AutocompleteType } from '../models/common';

// interface SearchResultsProps {
//     initialQuery?: string;
// }


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

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate search results
        if (searchQry) {
            loadSearchWikiPages(searchQry)
                .then(searchedItems => {
                    navigate(`/${language}/search?title=${searchQry}`);
                    console.log('searchResults', searchedItems);
                })
        }
    };


    return (
        <div className="layout-main-content-container">
            {/* Header with search bar */}
            <header className="search-header">
                <form onSubmit={handleSearch} className="search-form">
                    <FlexItem className='autocompleteContainer'>
                        <Autocomplete
                            placeholder={t("searchPlaceholder")}
                            autocompleteType={AutocompleteType.Search}
                            buttonType="submit"
                            hasButton={true}
                        />
                    </FlexItem>
                </form>

            </header>

            <div className="main-content">

                {/* Main Content Area */}
                <main className="results-area">
                    {searchResults && searchResults.length > 0 ? (
                        <div className="results-list">
                            <h2>Search Results for "{searchQry}"</h2>
                            <ul>
                                {searchResults.map((itm) => (
                                    <li key={itm.id} className="result-item">
                                        <h3
                                            className='cursor-pointer'
                                            onClick={() => {
                                                navigate(`/${language}/wikipages/${itm.pageid}`)
                                            }}
                                        >{itm.title}</h3>
                                        <p>{itm.summary}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <div className="empty-state">
                            <p>Search articles from here.</p>
                        </div>
                    )}
                </main>


            </div>
        </div>
    );
});

