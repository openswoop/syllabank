import React from 'react';
import Container from './Container';
import Search from './Search';

const Nav = () => (
  <div className="flex justify-between">
    <div className="logo-container">
      <span className="logo">UNF</span>
      <span className="app-title">Syllabus Bank</span>
      <span className="bg-white opacity-25 shadow-sm text-blue-800 px-5 py-1 rounded-full ml-3 text-xs font-bold">Dev Build</span>
    </div>
    <div className="action-container">
      {/* <a href="#" className="action-btn"> */}
      {/*   <i className="icon fas fa-cloud-upload-alt text-green" /> Add syllabus */}
      {/* </a> */}
    </div>
  </div>
);

const Title = () => (
  <div className="flex -mx-4">
    <div className="tagline-container">
      <span className="tagline-title">Search Syllabi</span>
    </div>
  </div>
);

const Header = props => (
  <nav className="header">
    <Container>
      <Nav />
      <Title />
      <Search {...props} />
    </Container>
  </nav>
);

export default Header;
