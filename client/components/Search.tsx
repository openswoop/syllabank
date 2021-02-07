import * as React from 'react';
import Router from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { InstantSearch, Configure } from 'react-instantsearch-dom';
import { searchClient } from '../lib/algolia';
import { CourseSelector } from './CourseSelector';
import { RootState } from '../redux/store';
import { inputValueChanged, searchStateChanged } from '../redux/searchSlice';

export const Search: React.FC = () => {
  const dispatch = useDispatch();
  const { inputValue, searchState, resultsState } = useSelector((state: RootState) => state.search);

  const goToCourse = (course: string | undefined): void => {
    if (course) {
      Router.push(`/?course=${course}`, `/course/${course}`);
    } else {
      Router.push('/');
    }
  };

  const onSearchStateChange = (change: string): void => {
    dispatch(searchStateChanged(change));
  };

  const onInputValueChange = (change: string | undefined): void => {
    dispatch(inputValueChanged(change));
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
