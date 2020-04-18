import * as React from 'react';
import classNames from 'classnames';
import { useCombobox } from 'downshift';
import { Highlight } from 'react-instantsearch/dom';
import { BasicDoc, AutocompleteProvided, connectAutoComplete } from 'react-instantsearch-core';
import SearchIcon from '../svgs/search.svg';

type Course = BasicDoc & {
  course: string;
  title: string;
};

type Props = AutocompleteProvided<Course> & {
  refine: (input: string) => void;
  onSelection: (course: Course) => void;
};

export const CourseSelector = connectAutoComplete<Props, Course>(
  ({ hits, refine, onSelection }) => {
    const {
      isOpen,
      selectedItem,
      highlightedIndex,
      getInputProps,
      getItemProps,
      getMenuProps,
      openMenu,
      selectItem,
    } = useCombobox({
      items: hits,
      itemToString: (item) => item?.title ?? '',
      onInputValueChange: (changes) => refine(changes.inputValue),
      onSelectedItemChange: (changes) => onSelection(changes.selectedItem),
      stateReducer: (state, actionAndChanges) => {
        switch (actionAndChanges.type) {
          case useCombobox.stateChangeTypes.InputChange:
            return {
              ...actionAndChanges.changes,
              highlightedIndex: 0,
            };
          default:
            return actionAndChanges.changes;
        }
      },
    });

    return (
      <div className="flex sm:-mx-4">
        <div className="search-container">
          <div className="relative w-full">
            <input
              className={classNames('search-box', {
                'rounded-b-none': isOpen && hits.length,
              })}
              placeholder="Search for a course"
              spellCheck="false"
              onFocus={openMenu}
              {...getInputProps()}
            />
            <div className="flex items-center absolute right-0 inset-y-0 px-5">
              <button type="button" onClick={(): void => selectItem(hits[highlightedIndex])}>
                <SearchIcon
                  className="text-gray-600 fill-current"
                  style={{ width: 18, height: 18 }}
                  alt=""
                />
              </button>
            </div>
          </div>
          {isOpen && (
            <div
              className="relative w-full"
              {...getMenuProps({ onMouseDown: (e) => e.stopPropagation() })}
            >
              <div className="search-drawer absolute w-full bg-white pt-5 pb-3 border-gray-300 border outline-none rounded-b shadow-lg">
                {hits.length ? (
                  <>
                    <div className="text-sm text-gray-600 pb-1 px-5">Courses</div>
                    {hits.map((item, index) => (
                      <div
                        className={classNames('mx-2 rounded cursor-pointer', {
                          'bg-gray-200': highlightedIndex === index,
                          'font-medium': selectedItem && selectedItem.objectID === item.objectID,
                        })}
                        key={item.objectID}
                        {...getItemProps({ item, index })}
                      >
                        <div className="flex justify-between px-3 py-3">
                          <div>
                            <Highlight attribute="title" hit={item} tagName="mark" />
                          </div>
                          <div className="text-gray-500">
                            <Highlight attribute="course" hit={item} tagName="mark" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <div className="text-center px-5 pb-2 tracking-wide">
                    <div className="text-gray-800 pb-1">
                      No matching courses found{' '}
                      <span role="img" aria-label="cry">
                        😢
                      </span>
                    </div>
                    <div className="text-gray-600 font-light italic">
                      <p>Consider uploading your syllabi to help us add more courses!</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  },
);