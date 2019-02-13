import React from 'react';

const Header = (props) => {
  return (
    <nav className="bg-blue-dark mb-10">
      <div className="container mx-auto">
        <div className="flex -mx-4">
          <div className="w-1/5 px-4 py-5">
            <div className="flex items-center text-white font-sans-round">
              <span className="mr-3 text-3xl">UNF</span>
              <span className="text-lg italic font-thin">Syllabus Bank</span>
            </div>
          </div>
          <div className="w-3/5 flex mt-24 mb-4 px-4 items-center">
            <span className="font-thin text-5xl text-blue italic lowercase">Search Syllabi</span>
          </div>
          <div className="w-1/5 px-4 py-5">
            <div className="mt-2">
              <a href="#" className="float-right bg-white rounded px-4 py-2 font-sans-round text-xs text-grey-darkest no-underline shadow-lg hover:bg-grey-lighter">
                <i className="fas fa-cloud-upload-alt text-green mr-1"></i>
                Add syllabus
            </a>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto">
        <div className="flex -mx-4">
          <div className="w-3/5 flex ml-auto mr-auto px-4 items-center">
            <div className="relative w-full -mb-8">
              <input className="appearance-none w-full py-5 pl-4 pr-12 rounded shadow-lg" type="text" placeholder="Search for courses..." />
              <div className="flex items-center absolute pin-r pin-y px-5">
                <a href="#" className="no-underline text-black"><i className="fas fa-search text-xl"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header;