import React from 'react';
import PropTypes from 'prop-types';
import posed, { PoseGroup } from 'react-pose';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { InstantSearch, Configure, Highlight } from 'react-instantsearch/dom';
import { connectAutoComplete } from 'react-instantsearch/connectors';
import { BasicDoc, Hit, AutocompleteProvided } from 'react-instantsearch-core';
import Downshift from 'downshift';

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
  refine, hits, onChange, showSpinner, initialValue,
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
        isOpen,
        openMenu,
        selectHighlightedItem,
        selectItemAtIndex,
      }): JSX.Element => (
          <div className="flex -mx-4">
            <div className="search-container">
              <div className="relative w-full">
                <input
                  {...getInputProps({
                    className: 'search-box',
                    placeholder: 'Search for courses...',
                    spellCheck: false,
                    onChange: (e): void => refine(e.target.value),
                    onFocus: (): void => openMenu(),
                  })}
                />
                <div className="search-icon-container">
                  {showSpinner
                    ? <FontAwesomeIcon icon={faSpinner} className="text-grey-dark text-lg" spin />
                    : (
                      <button type="button" onClick={(): void => (highlightedIndex === null ? selectItemAtIndex(0) : selectHighlightedItem())}>
                        <FontAwesomeIcon icon={faSearch} className="text-xl" />
                      </button>
                    )
                  }
                </div>
              </div>
              <PoseGroup>
                {isOpen && (
                  <Drawer key="drawer" className="relative w-full">
                    <div className="search-drawer absolute w-full bg-white mt-2 pt-5 pb-3 shadow-lg">
                      <div className="font-light text-sm text-grey-darker pb-2 px-4">Courses</div>
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
                          <div className="text-grey"><Highlight attribute="course" hit={item} tagName="mark" /></div>
                        </div>
                      ))}
                    </div>
                  </Drawer>
                )}
              </PoseGroup>
            </div>
          </div>
        )}
    </Downshift>
  );

export interface CourseDoc extends BasicDoc {
  course: string;
  title: string;
}

interface AutocompleteProps extends AutocompleteProvided<CourseDoc> {
  onChange: (course: string) => void;
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
    appId="Y91BS020ZT"
    apiKey="bf9a6fcbba6ea3e74a89e01bc75818ef"
    indexName="courses"
  >
    <Configure hitsPerPage={5} />
    <AlgoliaSearch {...props} />
  </InstantSearch>
);

export default Search;
