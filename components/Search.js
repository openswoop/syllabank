const Search = (props) => {
  return (
    <div className="relative w-full">
      <input className="search-box" type="text" placeholder="Search for courses..." />
      <div className="search-icon-container">
        <a href="#"><i className="fas fa-search icon"></i></a>
      </div>
    </div>
  )
}

export default Search;