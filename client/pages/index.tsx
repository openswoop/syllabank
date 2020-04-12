import * as React from 'react';
import Router, { withRouter } from 'next/router';
import { WithRouterProps } from 'next/dist/client/with-router';
import { Response } from 'algoliasearch';
import { Header } from '../components/Header';
import { Content } from '../components/Content';
import { Course } from '../types/Course';
import { loadFirebase } from '../lib/db';
import { searchClient } from '../lib/search';
import redirect from '../lib/redirect';

type CourseSnapshot = Omit<Course, 'term'> &
  firebase.firestore.DocumentData & {
    term: number;
  };

interface InitialProps {
  results?: Course[];
  initialValue?: string;
}

type Props = InitialProps & WithRouterProps;

type State = {
  loading: boolean;
  emptyMessage: string;
};

class Index extends React.Component<Props, State> {
  // eslint-disable-next-line react/static-property-placement
  static defaultProps = {
    results: [],
    initialValue: '',
  };

  private static toTermName = (termNumber: number): string => {
    if (termNumber === 10) return 'Spring';
    if (termNumber === 50) return 'Summer';
    if (termNumber === 80) return 'Fall';
    return undefined;
  };

  private static getData = async (course: string): Promise<Course[]> => {
    const firebase = await loadFirebase();
    const db = firebase.firestore();
    return db
      .collection('courses')
      .where('course', '==', course)
      .orderBy('year', 'desc')
      .orderBy('term', 'desc')
      .orderBy('last_name')
      .limit(100)
      .get()
      .then((res) => res.docs.map((doc) => ({ id: doc.id, ...doc.data() } as CourseSnapshot)))
      .then((data) => data.map((row): Course => ({ ...row, term: Index.toTermName(row.term) })));
  };

  public constructor(props: Readonly<Props>) {
    super(props);

    this.state = {
      loading: false,
      emptyMessage: null,
    };
  }

  public static getInitialProps = async ({ res, query }): Promise<InitialProps> => {
    const { course } = query;

    // Display nothing if no course
    if (!course) {
      return {};
    }

    // Get the course title for the initial search box value
    const index = searchClient.initIndex('courses');
    const initialItem = await index
      .search({ query: course })
      .then((resp: Response<any>) => resp.hits.find((hit) => hit.course === course));

    // Redirect if invalid course
    if (!initialItem) {
      redirect(res, '/');
      return {};
    }

    const results = await Index.getData(course);
    const initialValue = initialItem.title;
    return { results, initialValue };
  };

  public componentDidMount = (): void => {
    Router.events.on('routeChangeStart', () => {
      this.setState({ loading: true, emptyMessage: null });
    });

    Router.beforePopState(({ as }) => {
      // Force SSR refresh when navigating back/forward in history
      window.location.href = as;
      return false;
    });
  };

  public componentDidUpdate = (prevProps: Props): void => {
    const { results } = this.props;

    if (results !== prevProps.results) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ loading: false });
    }
  };

  public onNoResults = (query: string): void => {
    this.setState({ loading: false, emptyMessage: query });
  };

  public render(): JSX.Element {
    const { loading, emptyMessage } = this.state;
    const { results } = this.props;

    return (
      <div className="font-sans leading-tight">
        <Header />
        <Content isVisible={!loading} results={results} emptyMessage={emptyMessage} />
      </div>
    );
  }
}

export default withRouter(Index);
