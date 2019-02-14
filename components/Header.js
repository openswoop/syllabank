import React from 'react';
import '../css/styles.css';

const Title = (props) => {
  return (
    <div className="flex -mx-4">
      <div className="tagline-container">
        <span className="tagline-title">Search Syllabi</span>
      </div>
    </div>
  )
}

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

const Nav = (props) => {
  return (
    <div className="flex justify-between">
      <div className="logo-container">
        <span className="logo">UNF</span>
        <span className="app-title">Syllabus Bank</span>
      </div>
      <div className="action-container">
        <a href="#" className="action-btn">
          <i className="icon fas fa-cloud-upload-alt text-green" /> Add syllabus
        </a>
      </div>
    </div>
  )
}

const Container = ({ children }) => (
  <div className="container mx-auto">{children}</div>
)

const Header = (props) => {
  return (
    <nav className="header">
      <Container>
        <Nav />
        <Title />
        <div className="flex -mx-4">
          <div className="search-container">
            <Search />
          </div>
        </div>
      </Container>
    </nav>
  )
}

export default Header;