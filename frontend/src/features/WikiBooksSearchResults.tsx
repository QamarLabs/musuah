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
                        <div className="results-list mw-text">
                            <h2>{t("searchResultsFor")} "{searchQry}"</h2>
                            <ul>
                                {bookSearchResults.map((book) => (
                                    <li key={book._id} className="result-item">
                                        <Text
                                            fontSize="100%"
                                            className=' mw-link'
                                            cursor='pointer'
                                            color='blue.400'
                                            onClick={() => {
                                                navigate(`/${language}/wikibooks/${book._id}`, { replace: true })
                                            }}
                                            _hover={{
                                                textDecoration: 'underline'
                                            }}
                                        >
                                            {book.displayName}
                                        </Text>
                                        <p>{book.description}</p>
                                        <Text>
                                            <Span>{t("author")} </Span>
                                            {book.author}
                                        </Text>
                                        <Text>
                                            <Span>{t("publicationDate")} </Span>
                                            {new Date(book.publicationDate).toLocaleDateString()}
                                        </Text>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <div className="empty-state">
                            <p>{t("searchBooksAndStudiesFromHere")}</p>
                        </div>
                    )}
                </main>


            </div>
        </div>
    );
});

