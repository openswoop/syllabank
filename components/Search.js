import Downshift from "downshift";

import React from 'react'
import {render} from 'react-dom'
import {InstantSearch, Highlight} from 'react-instantsearch/dom'
import {connectAutoComplete} from 'react-instantsearch/connectors'
import Autocomplete from 'downshift'
import Container from "./Container";

function RawAutoComplete({refine, hits, onChange}) {
  console.log(hits);
  return (
    <Autocomplete
      itemToString={i => (i ? i.course : i)}
      // onChange={onChange}
    >
      {({
          getInputProps,
          getItemProps,
          selectedItem,
          highlightedIndex,
          isOpen,
        }) =>

        <div className="flex -mx-4">
          <div className="search-container">
            <div className="relative w-full">
              <input className="search-box" type="text" placeholder="Search for courses..."

                     onKeyPress={onChange}
              />
              {/*{...getInputProps({*/}
              {/*  onChange(e) {*/}
              {/*    refine(e.target.value)*/}
              {/*  },*/}
              {/*})}*/}
              <div className="search-icon-container">
                <a href="#"><i className="fas fa-search icon"/></a>
              </div>
            </div>
            {/*{isOpen &&*/}
            {/*  <div>*/}
            {/*    {hits.map((item, index) =>*/}
            {/*      <div*/}
            {/*        key={item.course}*/}
            {/*        {...getItemProps({*/}
            {/*          item,*/}
            {/*          index,*/}
            {/*          style: {*/}
            {/*            backgroundColor:*/}
            {/*              highlightedIndex === index ? 'gray' : 'white',*/}
            {/*            fontWeight: selectedItem === item ? 'bold' : 'normal',*/}
            {/*          },*/}
            {/*        })}*/}
            {/*      >*/}
            {/*        <Highlight attributeName="course" hit={item} tagName="mark"/>*/}
            {/*      </div>,*/}
            {/*    )}*/}
            {/*  </div>}*/}
          </div>
        </div>}
      }
    </Autocomplete>
  )
}

const AutoCompleteWithData = connectAutoComplete(RawAutoComplete);

const Search = (props) => {
  return (
    <InstantSearch
      appId="QR9F7U3G04"
      apiKey="b5572260c38f556f6eedbab448cff5cf"
      indexName="syllabank"
    >
      <AutoCompleteWithData onChange={props.onAction}/>
    </InstantSearch>
  )
};

// const Search = (props) => {
//   return (
//     <div className="relative w-full">
//         <input className="search-box" type="text" placeholder="Search for courses..." onKeyPress={props.onAction}/>
//         <div className="search-icon-container">
//           <a href="#"><i className="fas fa-search icon"/></a>
//         </div>
//     </div>
//   )
// };

export default Search;