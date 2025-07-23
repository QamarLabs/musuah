
import { useMemo, useState } from 'react';
import { Button } from '@chakra-ui/react';
import { useCombobox, autocomplete } from '@szhsin/react-autocomplete';
import { RiCloseLargeLine, RiSearchLine } from "react-icons/ri";
import { QueriedAutocompleteOption } from '../models/search';
import { observer } from 'mobx-react-lite';
import { useStore } from '../store';
import { useNavigate } from 'react-router';
import { Flex } from '@wordpress/components';
import useGetQueryParams from '../hooks/useGetQueryParams';
import { AutocompleteType } from '../models/common';

type Props = {
  placeholder: string;
  buttonType?: string;
  autocompleteType: AutocompleteType;
  hasButton: boolean;
  // options: QueriedAutocompleteOption[];
  // onChange: Function;
  // onClear: Function;
  // onKeyDown: Function;
  // value: string;
}

const SearchArticleAutocomplete = observer(({
  placeholder,
  buttonType,
  autocompleteType,
  hasButton
}: React.PropsWithChildren<Props>) => {
  const navigate = useNavigate();
  const { commonStore, searchStore } = useStore();
  const { 
    language 
  } = commonStore;

  // const loadingAutocomplete = useMemo(() => {
  //   if(autocompleteType === AutocompleteType.Navbar) return commonStore.autoCompleteLoading;
  //   return searchStore.autoCompleteLoading;
  // }, [searchStore.autoCompleteLoading, commonStore.autoCompleteLoading]);

  const autocompleteSearchQry = useMemo(() => {
    if(autocompleteType === AutocompleteType.Navbar) return commonStore.navbarSearchQry;
    return searchStore.searchQry;
  }, [searchStore.searchQry, commonStore.navbarSearchQry]);  
  const setAutocompleteSearchQry = useMemo(() => {
    if(autocompleteType === AutocompleteType.Navbar) return commonStore.setNavbarSearchQry;
    return searchStore.setSearchQry;
  }, []);
  const loadAutocomplete = useMemo(() => {
    if(autocompleteType === AutocompleteType.Navbar) return commonStore.loadAutocompleteOptions;
    return searchStore.loadAutocompleteOptions;
  }, []);
  const autocompleteOptions = useMemo(() => {
    if(autocompleteType === AutocompleteType.Navbar) return commonStore.navbarAutocompleteOptions;
    return searchStore.autocompleteOptions;
  }, [searchStore.loadAutocompleteOptions,  commonStore.loadAutocompleteOptions, searchStore.searchQry, commonStore.navbarSearchQry]); 
  const clearAutoCompleteOptions = useMemo(() => {
    if(autocompleteType === AutocompleteType.Navbar) return commonStore.clearNavAutoCompleteRegistry;
    return searchStore.clearAutoCompleteOptions;
  }, []);


  const [currentValue, setCurrentValue] = useState<string>(autocompleteSearchQry ?? '');
  // const [loading, setLoading] = useState<boolean>(false);
  const [selected, setSelected] = useState<QueriedAutocompleteOption>();
  const [currentItems] = useState<any[]>([]);

  // useEffect(() => {
  //   setCurrentItems(autocompleteOptions);
  // }, [autocompleteOptions])

  const autocompleteOnChange: any = async (val: string) => {
    setCurrentValue(val);
    if (val) {
      debugger;
      setAutocompleteSearchQry(val);
      await loadAutocomplete(val);
    }

    console.log('autocompleteOptions:', autocompleteOptions)
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
    value: autocompleteSearchQry,
    onChange: autocompleteOnChange as any,
    selected,
    onSelectChange: (itm: QueriedAutocompleteOption | undefined) =>  {
      setSelected(itm);
      if(itm)
        navigate(`/${language}/wikipages/${itm.value}`)
    },
    getItemValue: (item: QueriedAutocompleteOption) => item.text,
    feature: autocomplete({
      // The `select` option controls autocomplete in free or select mode
      select: true, // or false
      deselectOnClear: true,
      deselectOnChange: false,
      rovingText: true
      // Other options: rovingText, deselectOnClear, deselectOnChange, closeOnSelect
    })
  });

  return (
    <div className='w-100 p-0'>
      <div className='position-relative'>
        <input
          placeholder={placeholder}
          value={currentValue}
          {...getInputProps()}
          onKeyDown={async (event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key === 'Enter') {
              if (autocompleteSearchQry) {
                await loadAutocomplete(autocompleteSearchQry);
                if(autocompleteType === AutocompleteType.Search)
                  navigate(`/${language}/search?title=${autocompleteSearchQry}`);
              }
              console.log('Enter key pressed');

              // Handle form submission or other action
              // TODO: Navigate to the Search Results Page
            }

            if (event.key === 'Escape') {
              console.log('Escape key pressed');
              setOpen(false);
            }
          }}
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
          <>
          {buttonType == 'submit'
            ? (
              <Button
                {...getToggleProps()}
                className='position-absolute w-10 bg-primary'
                loading={searchStore.searchLoading}
                style={{ right: 0 }}
                type={buttonType}
              >
                <RiSearchLine />
              </Button>
            )
            : (
              <Button
                {...getToggleProps()}
                onClick={async () => {
                  if (autocompleteSearchQry) {
                    await loadAutocomplete(autocompleteSearchQry);
                    if(autocompleteType === AutocompleteType.Search)
                      navigate(`/${language}/search?title=${autocompleteSearchQry}`);
                  }
                }}
                className='position-absolute w-10 bg-primary'
                loading={searchStore.searchLoading}
                style={{ right: 0 }}
                type="button"
              >
                <RiSearchLine />
              </Button>
            )}
          </>
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
          margin: 0,
          padding: 0
        }}
        className='autocompleteList'
      >
        {autocompleteOptions.length ? (
          autocompleteOptions.map((item: QueriedAutocompleteOption, index) => (
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
              <Flex direction="row" className='p-2 autocompleteItem' >
                {item.text}
              </Flex>
            </li>
          ))
        ) : (
          <li>No results</li>
        )}
      </ul>
    </div>
  );
});

export default SearchArticleAutocomplete;