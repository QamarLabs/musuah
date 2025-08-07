
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Badge, Button, Loader, Text } from '@chakra-ui/react';
import { useCombobox, autocomplete } from '@szhsin/react-autocomplete';
import { RiCloseLargeLine, RiSearchLine } from "react-icons/ri";
import { QueriedAutocompleteOption } from '../models/search';
import { observer } from 'mobx-react-lite';
import { useStore } from '../store';
import { useNavigate } from 'react-router';
import { Flex } from '@wordpress/components';
import useGetQueryParams from '../hooks/useGetQueryParams';
import { AutocompleteType } from '../models/common';
import { useDebounce } from '../hooks/useDebounce';
import { useTranslation } from 'react-i18next';

type Props = {
  id: string;
  placeholder: string;
  autocompleteType: AutocompleteType;
  hasButton: boolean;
  handleSubmitSearch: (setOpen: Function) => (e: any) => Promise<void>;
}

const SearchAutocomplete = observer(({
  id,
  placeholder,
  autocompleteType,
  hasButton,
  handleSubmitSearch
}: React.PropsWithChildren<Props>) => {
  const { t } = useTranslation("common");
  const navigate = useNavigate();
  const currentInputRef = useRef<HTMLInputElement | null>(null);
  const { commonStore, searchStore, searchBooksStore } = useStore();
  const {
    language
  } = commonStore;

  const loadingAutocomplete = useMemo(() => {
    if (autocompleteType === AutocompleteType.Navbar) return commonStore.autoCompleteLoading;
    if (autocompleteType === AutocompleteType.SearchBooks) return searchBooksStore.autoCompleteLoading;
    return searchStore.autoCompleteLoading;
  }, [searchStore.autoCompleteLoading, searchBooksStore.autoCompleteLoading, commonStore.autoCompleteLoading]);

  const autocompleteSearchQry = useMemo(() => {
    if (autocompleteType === AutocompleteType.Navbar) return commonStore.navbarSearchQry;
    else if (autocompleteType === AutocompleteType.SearchBooks) return searchBooksStore.searchQry;
    return searchStore.searchQry;
  }, [
    autocompleteType, 
    searchStore.searchQry, 
    searchBooksStore.searchQry, 
    commonStore.navbarSearchQry,
  ]);

  const setAutocompleteSearchQry = useCallback((val: string) => {
    if (autocompleteType === AutocompleteType.Navbar)
      commonStore.setNavbarSearchQry(val);
    else if (autocompleteType === AutocompleteType.SearchBooks)
      searchBooksStore.setSearchQry(val);
    else
      searchStore.setSearchQry(val);
  }, []);

  const loadAutocomplete = useCallback(async (val: string) => {
    if (autocompleteType === AutocompleteType.Navbar)
      await commonStore.loadAutocompleteOptions(val);
    else if (autocompleteType === AutocompleteType.SearchBooks)
      await searchBooksStore.loadBookAutocompleteOptions(val);
    else
      await searchStore.loadAutocompleteOptions(val);
  }, []);
  const debouncedLoadAutocomplete = useDebounce(loadAutocomplete, 500);


  const autocompleteOptions = useMemo(() => {
    if (autocompleteType === AutocompleteType.Navbar) return commonStore.navbarAutocompleteOptions;
    else if (autocompleteType === AutocompleteType.SearchBooks) return searchBooksStore.autocompleteOptions;
    return searchStore.autocompleteOptions;
  }, [
    loadingAutocomplete,
    searchStore.searchQry,
    searchBooksStore.searchQry,
    commonStore.navbarSearchQry,
  ]);
  const clearAutoCompleteOptions = useMemo(() => {
    if (autocompleteType === AutocompleteType.Navbar) return commonStore.clearNavAutoCompleteRegistry;
    else if (autocompleteType === AutocompleteType.SearchBooks) return searchBooksStore.clearAutoCompleteOptions;
    return searchStore.clearAutoCompleteOptions;
  }, []);


  const [currentValue, setCurrentValue] = useState<string>(autocompleteSearchQry ?? '');
  // const [loading, setLoading] = useState<boolean>(false);
  const [selected, setSelected] = useState<QueriedAutocompleteOption>();
  const [currentItems, setCurrentItems] = useState<any[]>([]);
  const isSearchBookAutocomplete = useMemo(() => autocompleteType === AutocompleteType.SearchBooks, [autocompleteType]);

  useEffect(() => {
    setCurrentItems(autocompleteOptions);
  }, [loadingAutocomplete])

  useEffect(() => {
    if(autocompleteType === AutocompleteType.Search)
      setCurrentValue(searchStore.searchQry ?? '');
  }, [searchStore.searchQry]);

  useEffect(() => {
    if(currentInputRef)
      searchStore.setInputRef(currentInputRef);
  }, [currentInputRef.current]);

  const autocompleteOnChange: any = async (val: string) => {
    setCurrentValue(val);
    setAutocompleteSearchQry(val);
    if (val) {
      debouncedLoadAutocomplete(val);
    }

  }

  useGetQueryParams({
    key: 'title',
    currentValue: autocompleteSearchQry,
    setValue: autocompleteOnChange
  });

  const {
    // getLabelProps,
    getInputProps,
    getClearProps,
    getToggleProps,
    getListProps,
    getItemProps,
    open,
    setOpen,
    focusIndex,
    isInputEmpty
  } = useCombobox({
    items: currentItems,
    value: currentValue,
    onChange: autocompleteOnChange as any,
    selected,
    onSelectChange: (itm: QueriedAutocompleteOption | undefined) => {
      setSelected(itm);
      if (itm) {
        alert(JSON.stringify(itm))
        isSearchBookAutocomplete ? navigate(`/${language}/wikibooks/${itm.value}`, { replace: true }) : navigate(`/${language}/wikipages/${itm.value}`, { replace: true })
      }
    },
    getItemValue: (item: QueriedAutocompleteOption) => item.text,
    feature: autocomplete({
      select: true, // or false
      closeOnSelect: true,
      deselectOnClear: false,
      deselectOnChange: false,
      rovingText: true
    })
  });


  const keyDownOnEnter = useCallback(async (val: string) => {
    setOpen(false);
    if (autocompleteType === AutocompleteType.Navbar) {
      searchStore.setSearchQry(val);      
      navigate(`/${language}/search?title=${val}`);
    }
    if(autocompleteType === AutocompleteType.Search) {
      searchStore.setSearchQry(val);
      await searchStore.loadSearchWikiPages(val);
    } 
    if(autocompleteType === AutocompleteType.SearchBooks) {
      searchBooksStore.setSearchQry(val);
      await searchBooksStore.loadSearchWikiBooks(val);
    }
  }, []);

  const handleKeyDown = useCallback(async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && autocompleteSearchQry) {
      await keyDownOnEnter(autocompleteSearchQry)
    }

    if (event.key === 'Escape') {
      console.log('Escape key pressed');
      setOpen(false);
    }
  }, [autocompleteSearchQry]);


  return (
    <div className='w-100 p-0'>
      <div
        onClick={(e) => {
          e.preventDefault();
          setOpen(false);
        }}
        className='position-relative'>
        <input
          {...getInputProps()}
          placeholder={placeholder}
          value={currentValue}
          id={id}
          onKeyDown={handleKeyDown}

          ref={r => currentInputRef.current = r}
          className='w-100 p-2 bg-transparent text-dark mw-autocomplete'
        />
        {!isInputEmpty
          && (
            <button
              {...getClearProps()}
              onClick={() => {
                setCurrentValue('');
                setAutocompleteSearchQry('');
                clearAutoCompleteOptions();
              }}
              className={`position-absolute ${hasButton ? 'right-10' : 'right-0'} border-none h-100 bg-transparent`}
            >
              <RiCloseLargeLine style={{ backgroundColor: 'white', color: 'rgb(69, 69, 69)', padding: '0.25em', width: '3em', height: '1.25em' }} />
            </button>
          )}
        {hasButton && (
          <Button
              {...getToggleProps()}
              onClick={handleSubmitSearch(setOpen)}
              className='position-absolute w-10 bg-primary'
              loading={searchStore.searchLoading}
              style={{ right: 0 }}
              type="button"
          >
            <RiSearchLine />
          </Button>
        )}
      </div>

      <ul
        {...getListProps()}
        style={{
          display: open && currentValue ? 'block' : 'none',
          position: 'absolute',
          listStyle: 'none',
          color: '#000',
          background: '#fff',
          overflow: 'auto',
          maxHeight: 300,
          zIndex: 10,
          margin: 0,
          padding: 0
        }}
        className='autocompleteList'
      >
        {currentItems.length ? (
          currentItems.map((item: QueriedAutocompleteOption, index) => (
            <li
              style={{
                background: focusIndex === index ? '#ddd' : 'none',
                textDecoration: selected === item ? 'underline' : 'none',
              }}
              key={index}
              value={item.value}
              {...getItemProps({ item, index })}
              className='w-100'
            >
              <Flex direction="column" className='p-2 autocompleteItem mw-text mw-sm' >
                <Text mb={0}>{item.text}</Text>
                {isSearchBookAutocomplete && (
                  <Flex direction="column">
                    <Badge
                      mx="auto"
                      flex="unset"
                      colorPalette="green"
                      color="gray.900"
                      w="unset"
                      maxW="70%"
                      whiteSpace="break-spaces"
                    >
                      {item.primaryTopic}
                    </Badge>
                  </Flex>
                )}
              </Flex>
            </li>
          ))
        ) : loadingAutocomplete && !autocompleteOptions.length
          ? <Loader color='black' />
          : (
            <li>{t("noResults")}</li>
          )}
      </ul>
    </div>
  );
});

export default SearchAutocomplete;