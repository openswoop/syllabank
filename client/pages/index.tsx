import * as React from 'react';
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
  const { courseResults, loading } = useSelector((state: RootState) => state.courses);

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
