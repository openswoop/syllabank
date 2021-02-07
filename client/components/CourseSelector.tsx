import * as React from 'react';
import classNames from 'classnames';
import { useCombobox } from 'downshift';
import { Highlight, connectAutoComplete } from 'react-instantsearch-dom';
import { AutocompleteProvided } from 'react-instantsearch-core';
import { CourseDoc } from '../types/Course';
import SearchIcon from '../svgs/search.svg';

type Props = AutocompleteProvided<CourseDoc> & {
  inputValue: string;
  refine: (input: string) => void;
  onSelection: (course: CourseDoc | undefined) => void;
  onInputValueChange: (inputValue: string | undefined) => void;
};

export const CourseSelector = connectAutoComplete<Props, CourseDoc>(
  ({ hits, refine, onSelection, inputValue, onInputValueChange }) => {
    const {
      isOpen,
      selectedItem,
      highlightedIndex,
      getComboboxProps,
      getMenuProps,
      getInputProps,
      getItemProps,
      openMenu,
      selectItem,
    } = useCombobox({
      inputValue,
      items: hits,
      itemToString: (item) => item?.title ?? '',
      onSelectedItemChange: (changes) => {
        onSelection(changes.selectedItem ?? undefined);
        onInputValueChange(changes.inputValue);
      },
      stateReducer: (state, { type, changes }) => {
        switch (type) {
          // UX: preselect the first item while typing
          case useCombobox.stateChangeTypes.InputChange:
            return {
              ...changes,
              highlightedIndex: 0,
            };
          // UX: keep the preselected item when the mouse leaves
          case useCombobox.stateChangeTypes.MenuMouseLeave:
            return {
              ...changes,
              highlightedIndex: state.highlightedIndex,
            };
          // Bug: close menu when selectItem() is called
          case useCombobox.stateChangeTypes.FunctionSelectItem:
            return {
              ...changes,
              isOpen: false,
            };
          default:
            return changes;
        }
      },
    });

    return (
      <div className="flex lg:-mx-4">
        <div className="w-full flex flex-col items-center -mb-8 z-10 sm:px-4 lg:w-4/5 lg:mx-auto xl:w-3/5">
          <div className="relative w-full" {...getComboboxProps()}>
            <input
              className={classNames('search-box', {
                'rounded-b-none': isOpen && hits.length,
              })}
              placeholder="Search for a course"
              spellCheck="false"
              onClick={openMenu}
              {...getInputProps({
                // https://github.com/downshift-js/downshift/issues/1108
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  onInputValueChange(e.target.value);
                  refine(e.target.value);
                },
              })}
            />
            <div className="flex items-center absolute right-0 inset-y-0 px-5">
              <button
                type="button"
                onClick={(): void => hits[highlightedIndex] && selectItem(hits[highlightedIndex])}
              >
                <SearchIcon
                  className="text-gray-600 fill-current"
                  style={{ width: 18, height: 18 }}
                />
              </button>
            </div>
          </div>
          <div className="relative w-full" {...getMenuProps()}>
            {isOpen && (
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
                        {...getItemProps({
                          item,
                          index,
                        })}
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
            )}
          </div>
        </div>
      </div>
    );
  },
);
