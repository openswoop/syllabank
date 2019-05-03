import React from 'react';
import { InstantSearch, Configure, Highlight } from 'react-instantsearch/dom';
import { connectAutoComplete } from 'react-instantsearch/connectors';
import Downshift from 'downshift';

const RawAutoComplete = ({ refine, hits, onChange }) => (
  <Downshift
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
                <i className="fas fa-search icon" />
              </div>
            </div>
            {isOpen && (
              <div className="relative w-full">
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
                          fontWeight: selectedItem === item ? 'bold' : 'normal',
                        },
                      })}
                    >
                      <div><Highlight attribute="title" hit={item} tagName="mark" /></div>
                      <div className="text-grey"><Highlight attribute="course" hit={item} tagName="mark" /></div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
  </Downshift>
);

const AutoCompleteWithData = connectAutoComplete(RawAutoComplete);

const Search = ({ onAction }) => (
  <InstantSearch
    appId="Y91BS020ZT"
    apiKey="bf9a6fcbba6ea3e74a89e01bc75818ef"
    indexName="courses"
  >
    <Configure hitsPerPage={5} />
    <AutoCompleteWithData onChange={onAction} />
  </InstantSearch>
);

export default Search;
