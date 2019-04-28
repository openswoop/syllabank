import React from 'react'
import { InstantSearch, Configure, Highlight } from 'react-instantsearch/dom'
import { connectAutoComplete } from 'react-instantsearch/connectors'
import Downshift from 'downshift'

function RawAutoComplete({ refine, hits, onChange }) {
  console.log(hits)

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
    <Downshift
      itemToString={i => (i ? i.course : i)}
    onChange={onChange}
    >
      {({
        getInputProps,
        getItemProps,
        selectedItem,
        highlightedIndex,
        isOpen,
        openMenu,
      }) =>
        <div className="flex -mx-4">
          <div className="search-container">
            <div className="relative w-full">
              <input className="search-box" type="text" placeholder="Search for courses..."
                {...getInputProps({
                  onChange(e) {
                    refine(e.target.value)
                  },
                  onFocus: openMenu
                })}
              />
              <div className="search-icon-container">
                <a href="#"><i className="fas fa-search icon" /></a>
              </div>
            </div>
            {isOpen && <div className="relative w-full">
              <div className="absolute w-full bg-white mt-2 pt-5 pb-3 shadow-lg">
                <div class="flex -mx-3">
                  <div className="w-1/2 px-3">
                    <div class="font-light text-sm text-grey-darker pb-2 px-4">Courses</div>
                    {hits.map((item, index) => (
                      <div key={item.objectID} className="flex justify-between py-3 px-4"
                        {...getItemProps({
                          item,
                          index,
                          style: {
                            backgroundColor:
                              highlightedIndex === index ? '#f1f1f1' : 'white',
                            fontWeight: selectedItem === item ? 'bold' : 'normal',
                          },
                        })}
                      >
                        <div>Computational Structures</div>
                        <div className="text-grey">{item.course}</div>
                        {/* <Highlight attributeName="course" hit={item} tagName="mark" /> */}
                      </div>
                    ))}
                    {/* {courses.map(course => (
                      <div className="flex justify-between py-3">
                        <div>{course[1]}</div>
                        <div className="text-grey">{course[0]}</div>
                      </div>
                    ))} */}
                  </div>
                  <div class="w-1/2 px-3">
                    <div class="font-light text-sm text-grey-darker pb-2 px-4">Professors</div>
                    {professors.map(professor => (
                      <div className="flex justify-between py-3 px-4">
                        <div>{professor[0]}, {professor[1]}</div>
                        <div className="text-grey">{professor[2]}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>}
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
    </Downshift>
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
      <Configure
        hitsPerPage={5}
      />
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