import * as React from 'react';
import Router from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { InstantSearch, Configure } from 'react-instantsearch-dom';
import { searchClient } from '../lib/search';
import { CourseSelector } from './CourseSelector';
import { RootState } from '../redux/store';
import { updateInputValue, updateSearchState } from '../redux/searchSlice';

export const Search: React.FC = () => {
  const dispatch = useDispatch();
  const { inputValue, searchState, resultsState } = useSelector((state: RootState) => state.search);

  const goToCourse = (course: string): void => {
    if (course) {
      Router.push(`/?course=${course}`, `/course/${course}`);
    } else {
      Router.push('/');
    }
  };

  const onSearchStateChange = (change: string): void => {
    dispatch(updateSearchState(change));
  };

  const onInputValueChange = (change: string): void => {
    dispatch(updateInputValue(change));
  };

  return (
    <InstantSearch
      searchState={searchState}
      resultsState={resultsState}
      onSearchStateChange={onSearchStateChange}
      searchClient={searchClient}
      indexName="courses"
    >
      <Configure hitsPerPage={5} />
      <CourseSelector
        inputValue={inputValue}
        onInputValueChange={onInputValueChange}
        onSelection={(item): void => goToCourse(item && item.course)}
      />
    </InstantSearch>
  );
};
