import React from 'react'
import { InstantSearch } from 'react-instantsearch/dom'
import { connectAutoComplete } from 'react-instantsearch/connectors'
import Autocomplete from 'downshift'

function RawAutoComplete({ refine, hits, onChange }) {
  console.log(hits);

  const courses = [
    ['COT3100', 'Computational Structures'],
    ['IDC2000', 'Beauty and Joy of Computing'],
    ['CIS4930', 'Competitive Programming'],
    ['COP2220', 'Programming 1'],
    ['COP3404', 'System Software'],
  ]

  const professors = [
    ['Asaithambi', 'Asai', 'Computing'],
    ['Eggen', 'Roger', 'Computing'],
    ['Schuller', 'Walt', 'Computing'],
    ['Sense', 'Make', 'Computing'],
  ]

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
                <a href="#"><i className="fas fa-search icon" /></a>
              </div>
            </div>
            <div className="relative w-full">
              <div className="absolute w-full bg-white mt-2 py-5 px-4 shadow-lg">
                <div class="flex -mx-3">
                  <div className="w-1/2 px-3">
                    <div class="font-light text-sm text-grey-darker pb-2 italic">Courses</div>
                    {courses.map(course => (
                      <div className="flex justify-between py-3">
                        <div>{course[1]}</div>
                        <div className="text-grey">{course[0]}</div>
                      </div>
                    ))}
                  </div>
                  <div class="w-1/2 px-3">
                    <div class="font-light text-sm text-grey-darker pb-2 italic">Professors</div>
                    {professors.map(professor => (
                      <div className="flex justify-between py-3">
                        <div>{professor[0]}, {professor[1]}</div>
                        <div className="text-grey">{professor[2]}</div>
                      </div>
                    ))}
                  </div>
                </div>
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
      <AutoCompleteWithData onChange={props.onAction} />
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