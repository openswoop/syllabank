import React, { useState, useEffect, useRef } from 'react';
import Router from 'next/router';
import { InstantSearch, Configure } from 'react-instantsearch/dom';
import { connectAutoComplete } from 'react-instantsearch/connectors';
import { BasicDoc, AutocompleteProvided } from 'react-instantsearch-core';
import { searchClient } from '../lib/search';
import { CourseSelector } from './CourseSelector';

// const SearchAutocomplete: React.FC<AutocompleteProps> = ({
//   refine, hits, onChange, showSpinner, initialValue, onNoResults,
// }) => (
//     <Downshift
//       id="search-autocomplete"
//       itemToString={(item): string => (item ? item.title : item)}
//       onChange={onChange}
//       initialInputValue={initialValue}
//       stateReducer={(state, changes): object => {
//         switch (changes.type) {
//           case Downshift.stateChangeTypes.changeInput:
//             return {
//               ...changes,
//               highlightedIndex: 0,
//             };
//           default:
//             return changes;
//         }
//       }}
//     >
//       {({
//         getInputProps,
//         getItemProps,
//         selectedItem,
//         highlightedIndex,
//         inputValue,
//         isOpen,
//         openMenu,
//         selectHighlightedItem,
//         selectItemAtIndex,
//         clearSelection,
//       }): JSX.Element => {
//         const bestEffortSubmit = (): void => {
//           // If there are no hits, call the no result handler
//           if (!hits.length) {
//             refine(null);
//             clearSelection();
//             onNoResults(inputValue);
//             return;
//           }

//           // Select the highlighted option or the first if none are highlighted
//           if (highlightedIndex === null) {
//             selectItemAtIndex(0);
//           } else {
//             selectHighlightedItem();
//           }
//         };

//         const resetInput = (): void => {
//           onChange(null);
//           refine(null);
//         };

//         return (
//           <div className="flex sm:-mx-4">
//             <div className="search-container">
//               <div className="relative w-full">
//                 <input
//                   {...getInputProps({
//                     className: classNames('search-box', {
//                       'rounded-b-none': isOpen && hits.length,
//                     }),
//                     placeholder: 'Search for a course',
//                     spellCheck: false,
//                     onChange: (e): void => refine(e.target.value),
//                     onFocus: (): void => openMenu(),
//                     onKeyDown: (event): void => {
//                       if (event.key === 'Enter') {
//                         bestEffortSubmit();
//                       } else if (event.key === 'Escape') {
//                         resetInput();
//                       }
//                     },
//                   })}
//                 />
//                 <div className="flex items-center absolute right-0 inset-y-0 px-5">
//                   <button type="button" onClick={bestEffortSubmit}>
//                     <SearchIcon className="text-gray-600 fill-current" style={{ width: 18, height: 18 }} alt="" />
//                   </button>
//                 </div>
//               </div>
//               {isOpen && !!hits.length && (
//                 <div className="relative w-full">
//                   <div className="search-drawer absolute w-full bg-white pt-5 pb-3 border-gray-300 border outline-none rounded-b shadow-lg">
//                     <div className="text-sm text-gray-600 pb-1 px-5">Courses</div>
//                     {hits.map((item: Hit<CourseDoc>, index: number) => (
//                       <div
//                         {...getItemProps({
//                           item,
//                           index,
//                           key: item.objectID,
//                           className: classNames('mx-2 rounded cursor-pointer', {
//                             'bg-gray-200': highlightedIndex === index,
//                             'font-medium': selectedItem && selectedItem.objectID === item.objectID,
//                           }),
//                         })}
//                       >
//                         <div className="flex justify-between px-3 py-3">
//                           <div><Highlight attribute="title" hit={item} tagName="mark" /></div>
//                           <div className="text-gray-500"><Highlight attribute="course" hit={item} tagName="mark" /></div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         );
//       }}
//     </Downshift>
//   );

export interface CourseDoc extends BasicDoc {
  course: string;
  title: string;
}

interface AutocompleteProps extends AutocompleteProvided<CourseDoc> {
  onChange: (course: CourseDoc) => void;
  onNoResults: (searchString: string) => void;
  showSpinner: boolean;
  initialValue: string;
}

// @ts-ignore
const Autocomplete = connectAutoComplete<AutocompleteProps, CourseDoc>(CourseSelector);

const Search: React.FC<any> = (props) => {
  const [course, setCourse] = useState(null);
  const isFirstRun = useRef(true);

  useEffect(() => {
    // Don't run on initial page load
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    if (course) {
      Router.push(`/?course=${course}`, `/course/${course}`);
    } else {
      Router.push('/', '/');
    }
  }, [course]);

  return (
    <InstantSearch searchClient={searchClient} indexName="courses">
      <Configure hitsPerPage={5} />
      <Autocomplete onSelection={(item): void => setCourse(item && item.course)} {...props} />
    </InstantSearch>
  );
};

export default Search;
