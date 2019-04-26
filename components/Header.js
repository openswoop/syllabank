import Container from './Container.js'
import Search from './Search.js'
import React from "react";

const Nav = () => {
  return (
    <div className="flex justify-between">
      <div className="logo-container">
        <span className="logo">UNF</span>
        <span className="app-title">Syllabus Bank</span>
      </div>
      <div className="action-container">
        {/*<a href="#" className="action-btn">*/}
        {/*  <i className="icon fas fa-cloud-upload-alt text-green" /> Add syllabus*/}
        {/*</a>*/}
      </div>
    </div>
  )
};

const Title = () => {
  return (
    <div className="flex -mx-4">
      <div className="tagline-container">
        <span className="tagline-title">Search Syllabi</span>
      </div>
    </div>
  )
};

const Header = (props) => {
  return (
    <nav className="header">
      <Container>
        <Nav />
        <Title />
        <Search onAction={props.onAction}/>
      </Container>
    </nav>
  )
};

export default Header;