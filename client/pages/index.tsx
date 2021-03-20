import * as React from 'react';
import { NextPage, NextPageContext } from 'next';
import Head from 'next/head';
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

type Props = {
  courseId: string | undefined;
};

const Index: NextPage<Props> = ({ courseId }) => {
  const { course, loading } = useSelector((state: RootState) => state.courses);

  return (
    <div>
      <Head>
        <title>Syllabank{courseId && ` - ${courseId}`}</title>
      </Head>
      <div className="font-sans leading-tight">
        <Header />
        <Content isVisible={!loading} course={course} />
      </div>
    </div>
  );
};

Index.getInitialProps = async ({ store: { dispatch }, query }: Context): Promise<Props> => {
  const { course } = query;
  const courseId = course as string | undefined;

  await dispatch(fetchCourseById(courseId));
  await dispatch(hydrateSearch(courseId));

  return { courseId };
};

export default Index;
