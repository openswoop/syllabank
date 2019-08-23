import React from 'react';
import posed, { PoseGroup } from 'react-pose';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDropbox } from '@fortawesome/free-brands-svg-icons';
import Container from './Container';
import SearchResults from './SearchResults';

const FadeInOut = posed.div({
  enter: { y: 0, opacity: 1 },
  exit: {
    y: 20,
    opacity: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
});

const ResultsEmpty = ({ query }) => (
  <FadeInOut>
    <Container>
      <div className="flex sm:-mx-4 tracking-wide">
        <div className="sm:w-3/5 sm:mx-auto sm:px-4 pt-10 text-center">
          <div className="text-gray-800 text-xl pb-3">
            No results found for <span className="italic">{query}</span>
          </div>
          <div className="w-4/6 mx-auto text-gray-600 font-light">
            <p>
              The course you&apos;re looking for likely doesn&apos;t have any syllabi yet.
              Wanna help? Consider
              <a
                href="https://www.dropbox.com/request/pRilFsqBYiekwb9hXZYO"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#007be8' }}
              >
                <FontAwesomeIcon icon={faDropbox} size="lg" className="icon mx-2" />uploading your syllabi
              </a> <span className="tracking-normal">(☞ﾟ∀ﾟ)☞</span>
            </p>
          </div>
        </div>
      </div>
    </Container>
  </FadeInOut>
);

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

const Content = ({ isVisible, results, emptyMessage }) => {
  let content = null;
  if (isVisible) {
    if (emptyMessage) {
      content = (
        <FadeInOut key="no-results">
          <ResultsEmpty query={emptyMessage} />
        </FadeInOut>
      );
    } else if (results.length > 0) {
      content = (
        <FadeInOut key="results">
          <ResultsBar numResults={results.length} />
          <ResultsBody results={results} />
        </FadeInOut>
      );
    }
  }

  return (
    <PoseGroup>
      {content}
    </PoseGroup>
  );
};

export default Content;
