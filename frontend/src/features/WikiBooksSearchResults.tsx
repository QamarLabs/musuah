import React from 'react';
import { FlexItem } from '@wordpress/components';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import Autocomplete from '../common/Autocomplete';
import { useStore } from '../store';
import { useNavigate } from 'react-router';
import { AutocompleteType } from '../models/common';
import { Span, Text } from '@chakra-ui/react';
import useLoadDataFromGetQueryParams from '../hooks/useLoadDataFromQueryParams';


export default observer(function WikiBookSearchResults() {
    const {
        t,
        // i18n 
    } = useTranslation("common");
    const navigate = useNavigate();
    const { commonStore, searchBooksStore } = useStore();
    const { language } = commonStore;
    const { searchQry, loadSearchWikiBooks, bookSearchResults } = searchBooksStore;

    const handleSubmitSearch = (setOpen: Function) => async (e: React.MouseEvent) => {
        e.preventDefault();

        if (searchQry) {
            loadSearchWikiBooks(searchQry)
                .then(searchedBooks => {
                    setOpen(false);
                    navigate(`/${language}/searchBooks?title=${searchQry}`);
                    console.log('searchedBooks', searchedBooks);
                })
        }
    };

    useLoadDataFromGetQueryParams({key: "title", loadData: loadSearchWikiBooks});

    return (
        <div className="layout-main-content-container">
            {/* Header with search bar */}
            <header className="search-header">
                <FlexItem id="searchBooks" className='autocompleteContainer'>
                    <Autocomplete
                        id="book-search-results-autocomplete"
                        key="book-search-results-autocomplete"
                        placeholder={t("searchPlaceholder")}
                        autocompleteType={AutocompleteType.SearchBooks}
                        handleSubmitSearch={handleSubmitSearch}
                        hasButton={true}
                    />
                </FlexItem>
            </header>

            <div className="main-content">

                {/* Main Content Area */}
                <main className="results-area">
                    {bookSearchResults && bookSearchResults.length > 0 ? (
                        <div className="results-list">
                            <h2>Search Results for "{searchQry}"</h2>
                            <ul>
                                {bookSearchResults.map((book) => (
                                    <li key={book._id} className="result-item">
                                        <h3
                                            className='cursor-pointer'
                                            onClick={() => {
                                                navigate(`/${language}/wikibooks/${book._id}`)
                                            }}
                                        >
                                            {book.displayName}
                                        </h3>
                                        <p>{book.description}</p>
                                        <Text>
                                            <Span>Author: </Span>
                                            {book.author}
                                        </Text>
                                        <Text>
                                            <Span>Publication Date: </Span>
                                            {book.publicationDate.toLocaleDateString()}
                                        </Text>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <div className="empty-state">
                            <p>Search books and studies from here.</p>
                        </div>
                    )}
                </main>


            </div>
        </div>
    );
});

