import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import { NextPage, NextPageContext } from 'next';
import { useSelector } from 'react-redux';
import { Header } from '../components/Header';
import { Content } from '../components/Content';
import { fetchCourseById } from '../redux/coursesSlice';
import { AppDispatch, RootState } from '../redux/store';
import { hydrateSearch } from '../redux/searchSlice';

type Context = NextPageContext & {
  store: {
    dispatch: AppDispatch;
  };
};

const Index: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const { courseResults } = useSelector((state: RootState) => state.courses);

  useEffect(() => {
    Router.events.on('routeChangeStart', () => {
      setLoading(true);
    });

    Router.beforePopState(({ as }) => {
      // Force SSR refresh when navigating back/forward in history
      window.location.href = as;
      return false;
    });
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [courseResults]);

  return (
    <div className="font-sans leading-tight">
      <Header />
      <Content isVisible={!loading} results={courseResults} />
    </div>
  );
};

Index.getInitialProps = async ({ store: { dispatch }, query }: Context): Promise<{}> => {
  const { course } = query;
  const courseId = course as string;

  await dispatch(fetchCourseById(courseId));
  await dispatch(hydrateSearch(courseId));

  return {};
};

export default Index;
