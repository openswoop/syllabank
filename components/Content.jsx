import React from 'react';
import Container from './Container';
import SearchResults from './SearchResults';

const ResultsBar = ({ numResults }) => (
  <Container>
    <div className="hidden sm:block flex -mx-4">
      <div className="w-3/5 ml-auto mr-auto px-8 py-4">
        <div className="flex items-center">
          <span className="text-gray-600 font-light">Showing {numResults} results</span>
          <div className="ml-auto hidden">
            <i className="fas fa-bars text-blue-800 mr-2" />
            <i className="fas fa-th text-gray-500" />
          </div>
        </div>
      </div>
    </div>
  </Container>
);

const ResultsBody = ({ results }) => (
  <Container>
    <div className="flex sm:-mx-4">
      <div className="sm:w-3/5 sm:mx-auto sm:px-4">
        <div className="flex flex-col sm:rounded text-sm shadow-md p-4 mb-6">
          <SearchResults results={results} />
        </div>
      </div>
    </div>
  </Container>
);

const Content = ({ results }) => (
  <div>
    <ResultsBar numResults={results.length} />
    <ResultsBody results={results} />
  </div>
);

export default Content;
