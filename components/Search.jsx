import React from 'react';
import posed, { PoseGroup } from 'react-pose';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { InstantSearch, Configure, Highlight } from 'react-instantsearch/dom';
import { connectAutoComplete } from 'react-instantsearch/connectors';
import Downshift from 'downshift';

const Drawer = posed.div({
  enter: { y: 0, opacity: 1 },
  exit: { y: 10, opacity: 0, transition: { duration: 200 } },
});

const SearchAutocomplete = ({ refine, hits, onChange, showSpinner }) => (
  <Downshift
    id="search-autocomplete"
    itemToString={i => (i ? i.title : i)}
    onChange={onChange}
  >
    {({
      getInputProps,
      getItemProps,
      selectedItem,
      highlightedIndex,
      isOpen,
      openMenu,
    }) => (
        <div className="flex -mx-4">
          <div className="search-container">
            <div className="relative w-full">
              <input
                {...getInputProps({
                  className: 'search-box',
                  placeholder: 'Search for courses...',
                  spellCheck: false,
                  onChange(e) {
                    refine(e.target.value);
                  },
                  onFocus: openMenu,
                })}
              />
              <div className="search-icon-container">
                {showSpinner
                  ? <FontAwesomeIcon icon={faSpinner} className="text-grey-dark" spin />
                  : <FontAwesomeIcon icon={faSearch} />
                }
              </div>
            </div>
            <PoseGroup>
              {isOpen && (
                <Drawer key="drawer" className="relative w-full">
                  <div className="search-drawer absolute w-full bg-white mt-2 pt-5 pb-3 shadow-lg">
                    <div className="font-light text-sm text-grey-darker pb-2 px-4">Courses</div>
                    {hits.map((item, index) => (
                      <div
                        {...getItemProps({
                          item,
                          index,
                          key: item.objectID,
                          className: 'flex justify-between py-3 px-4',
                          style: {
                            backgroundColor:
                              highlightedIndex === index ? '#f1f1f1' : 'white',
                            fontWeight: selectedItem && selectedItem.objectID === item.objectID ? '500' : 'normal',
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


const AlgoliaSearch = connectAutoComplete(SearchAutocomplete);

const Search = ({ onAction, showSpinner }) => (
  <InstantSearch
    appId="Y91BS020ZT"
    apiKey="bf9a6fcbba6ea3e74a89e01bc75818ef"
    indexName="courses"
  >
    <Configure hitsPerPage={5} />
    <AlgoliaSearch onChange={onAction} showSpinner={showSpinner} />
  </InstantSearch>
);

export default Search;
