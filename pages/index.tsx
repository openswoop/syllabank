import React from 'react';
import PropTypes from 'prop-types';
import posed, { PoseGroup } from 'react-pose';
import Router, { withRouter } from 'next/router';
import { WithRouterProps } from 'next/dist/client/with-router';
import { Response } from 'algoliasearch';
import Header from '../components/Header';
import Content from '../components/Content';
import { CourseDoc } from '../components/Search';
import { loadFirebase } from '../lib/db';
import { searchClient } from '../lib/search';
import redirect from '../lib/redirect';
import '../css/styles.css';

const Results = posed.div({
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

interface CourseSnapshot extends firebase.firestore.DocumentData {
  id: string;
  course: string;
  days: string;
  last_name: string;
  term: number;
  time_begin: string;
  time_end: string;
  online?: boolean;
  year: number;
}

interface Course {
  id: string;
  course: string;
  days: string;
  last_name: string;
  term: string;
  time_begin?: string;
  time_end?: string;
  online?: boolean;
  year: number;
}

interface InitialProps {
  results?: Course[];
  initialValue?: string;
}

type Props = InitialProps & WithRouterProps;

interface State {
  loading: boolean;
}

class Index extends React.Component<Props, State> {
  public static propTypes = {
    results: PropTypes.arrayOf(PropTypes.any),
    initialValue: PropTypes.string,
  }

  public static defaultProps = {
    results: [],
    initialValue: '',
  }

  private static toTermName = (termNumber: number): string => {
    if (termNumber === 10) return 'Spring';
    if (termNumber === 50) return 'Summer';
    if (termNumber === 80) return 'Fall';
    return undefined;
  }

  private static getData = async (course: string): Promise<Course[]> => {
    const firebase = await loadFirebase();
    const db = firebase.firestore();
    return db.collection('courses')
      .where('course', '==', course)
      .orderBy('year', 'desc')
      .orderBy('term', 'desc')
      .orderBy('last_name')
      .limit(100)
      .get()
      .then(res => res.docs.map(doc => Object.assign({ id: doc.id }, doc.data()) as CourseSnapshot))
      .then(data => data.map((row): Course => ({ ...row, term: Index.toTermName(row.term) })));
  }

  public constructor(props: Readonly<Props>) {
    super(props);

    this.state = {
      loading: false,
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
    const initialItem = await index.search({ query: course })
      .then((resp: Response<CourseDoc>) => resp.hits.find(hit => hit.course === course));

    // Redirect if invalid course
    if (!initialItem) {
      redirect(res, '/');
      return {};
    }

    const results = await Index.getData(course);
    const initialValue = initialItem.title;
    return { results, initialValue };
  }

  public componentDidMount = (): void => {
    Router.beforePopState(({ as }) => {
      // Force SSR refresh when navigating back/forward in history
      window.location.href = as;
      return false;
    });
  }

  public componentDidUpdate = (prevProps: Props): void => {
    const { results } = this.props;

    if (results !== prevProps.results) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ loading: false });
    }
  }

  public onChange = (selection: CourseDoc): void => {
    this.setState({ loading: true });
    if (selection) {
      const course = selection.course.toUpperCase();
      Router.push(`/?course=${course}`, `/course/${course}`);
    } else {
      Router.push('/', '/');
    }
  }

  public render(): JSX.Element {
    const { loading } = this.state;
    const { results, initialValue } = this.props;
    return (
      <div className="font-sans leading-tight">
        <Header
          showSpinner={loading}
          initialValue={initialValue}
          onChange={this.onChange}
        />
        <PoseGroup>
          {results.length > 0 && !loading && (
            <Results key="content">
              <Content results={results} />
            </Results>
          )}
        </PoseGroup>
      </div>
    );
  }
}

export default withRouter(Index);
