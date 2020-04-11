import React from 'react';
import Dropbox from '../svgs/dropbox.svg';
import Container from './Container';
import Search from './Search.tsx';

const Nav = () => (
  <div className="flex justify-between">
    <div className="logo-container">
      <span className="logo"><a href="/">UNF</a></span>
      <span className="app-title"><a className="not-italic" href="/">Syllabus Bank</a> <span>(Beta)</span></span>
    </div>
    <div className="action-container">
      <a href="https://www.dropbox.com/request/pRilFsqBYiekwb9hXZYO" className="action-btn" target="_blank" rel="noopener noreferrer">
        <Dropbox className="inline fill-current mr-1" style={{ width: 16, height: 16, color: '#007be8' }} alt="" /> <span className="hidden sm:inline">Send syllabus</span>
      </a>
    </div>
  </div>
);

const Title = () => (
  <div className="tagline-container">
    <span className="tagline-title">Search Syllabi</span>
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
