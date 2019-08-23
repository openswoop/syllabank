import React from 'react';
import PropTypes from 'prop-types';
import posed, { PoseGroup } from 'react-pose';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { InstantSearch, Configure, Highlight } from 'react-instantsearch/dom';
import { connectAutoComplete } from 'react-instantsearch/connectors';
import { BasicDoc, Hit, AutocompleteProvided } from 'react-instantsearch-core';
import Downshift from 'downshift';
import { searchClient } from '../lib/search';

const Drawer = posed.div({
  enter: {
    y: 0,
    opacity: 1,
    transition: {
      opacity: { duration: 0 },
      default: { duration: 200 },
    },
  },
  exit: {
    y: 10,
    opacity: 0,
    transition: { duration: 100 },
  },
});

const SearchAutocomplete: React.FC<AutocompleteProps> = ({
  refine, hits, onChange, showSpinner, initialValue, onNoResults,
}) => (
    <Downshift
      id="search-autocomplete"
      itemToString={(item): string => (item ? item.title : item)}
      onChange={onChange}
      initialInputValue={initialValue}
    >
      {({
        getInputProps,
        getItemProps,
        selectedItem,
        highlightedIndex,
        inputValue,
        isOpen,
        openMenu,
        selectHighlightedItem,
        selectItemAtIndex,
        clearSelection,
      }): JSX.Element => {
        const bestEffortSubmit = (): void => {
          // If there are no hits, call the no result handler
          if (!hits.length) {
            refine(null);
            clearSelection();
            onNoResults(inputValue);
            return;
          }

          // Select the highlighted option or the first if none are highlighted
          if (highlightedIndex === null) {
            selectItemAtIndex(0);
          } else {
            selectHighlightedItem();
          }
        };

        const resetInput = (): void => {
          onChange(null);
          refine(null);
        };

        return (
          <div className="flex sm:-mx-4">
            <div className="search-container">
              <div className="relative w-full">
                <input
                  {...getInputProps({
                    className: 'search-box',
                    placeholder: 'Search for courses...',
                    spellCheck: false,
                    onChange: (e): void => refine(e.target.value),
                    onFocus: (): void => openMenu(),
                    onKeyDown: (event): void => {
                      if (event.key === 'Enter') {
                        bestEffortSubmit();
                      } else if (event.key === 'Escape') {
                        resetInput();
                      }
                    },
                  })}
                />
                <div className="search-icon-container">
                  {showSpinner
                    ? <FontAwesomeIcon icon={faSpinner} className="text-gray-600 text-lg" spin />
                    : (
                      <button type="button" onClick={bestEffortSubmit}>
                        <FontAwesomeIcon icon={faSearch} className="text-xl" />
                      </button>
                    )
                  }
                </div>
              </div>
              <PoseGroup>
                {isOpen && hits.length && (
                  <Drawer key="drawer" className="relative w-full">
                    <div className="search-drawer absolute w-full bg-white mt-2 pt-5 pb-3 shadow-lg">
                      <div className="font-light text-sm text-gray-700 pb-2 px-4">Courses</div>
                      {hits.map((item: Hit<CourseDoc>, index: number) => (
                        <div
                          {...getItemProps({
                            item,
                            index,
                            key: item.objectID,
                            className: 'flex justify-between py-3 px-4',
                            style: {
                              backgroundColor: highlightedIndex === index ? '#f1f1f1' : 'white',
                              fontWeight: selectedItem && selectedItem.objectID === item.objectID ? 500 : 'normal',
                            },
                          })}
                        >
                          <div><Highlight attribute="title" hit={item} tagName="mark" /></div>
                          <div className="text-gray-500"><Highlight attribute="course" hit={item} tagName="mark" /></div>
                        </div>
                      ))}
                    </div>
                  </Drawer>
                )}
              </PoseGroup>
            </div>
          </div>
        );
      }}
    </Downshift>
  );

export interface CourseDoc extends BasicDoc {
  course: string;
  title: string;
}

interface AutocompleteProps extends AutocompleteProvided<CourseDoc> {
  onChange: (course: string) => void;
  onNoResults: (searchString: string) => void;
  showSpinner: boolean;
  initialValue: string;
}

SearchAutocomplete.propTypes = {
  refine: PropTypes.func.isRequired,
  hits: PropTypes.arrayOf(PropTypes.exact({
    course: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    objectID: PropTypes.string.isRequired,
    _highlightResult: PropTypes.any,
  })).isRequired,
  onChange: PropTypes.func.isRequired,
  onNoResults: PropTypes.func.isRequired,
  showSpinner: PropTypes.bool,
  initialValue: PropTypes.string,
};

SearchAutocomplete.defaultProps = {
  showSpinner: false,
  initialValue: '',
};

const AlgoliaSearch = connectAutoComplete(SearchAutocomplete);

const Search: React.FC = props => (
  <InstantSearch
    searchClient={searchClient}
    indexName="courses"
  >
    <Configure hitsPerPage={5} />
    <AlgoliaSearch {...props} />
  </InstantSearch>
);

export default Search;
