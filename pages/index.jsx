import React, { Component } from 'react';
import posed, { PoseGroup } from 'react-pose';
import Router, { withRouter } from 'next/router';
import algoliasearch from 'algoliasearch/lite';
import Header from '../components/Header';
import Content from '../components/Content';
import { loadFirebase } from '../lib/db';
import '../css/styles.css';
import redirect from '../lib/redirect';

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

class Index extends Component {
  static toTermName = (termNumber) => {
    if (termNumber === 10) return 'Spring';
    if (termNumber === 50) return 'Summer';
    if (termNumber === 80) return 'Fall';
    return undefined;
  }

  static getData = async (course) => {
    const firebase = await loadFirebase();
    const db = firebase.firestore();
    return db.collection('courses')
      .where('course', '==', course)
      .orderBy('year', 'desc')
      .orderBy('term', 'desc')
      .orderBy('last_name')
      .limit(10)
      .get()
      .then((snapshot) => {
        const records = [];
        snapshot.forEach((doc) => {
          records.push(Object.assign({
            id: doc.id,
          }, doc.data()));
        });
        return records;
      })
      .then(data => data.map(row => ({ ...row, term: Index.toTermName(row.term) })));
  }

  constructor(props) {
    super(props);

    this.state = {
      results: props.results || [],
      loading: false,
    };
  }

  static getInitialProps = async ({ res, query }) => {
    const course = query.id;

    if (!course) {
      return {};
    }

    // Get the course title for the initial search box value
    const client = algoliasearch('Y91BS020ZT', 'bf9a6fcbba6ea3e74a89e01bc75818ef');
    const index = client.initIndex('courses');
    const initialItem = await index.search({ query: course })
      .then(response => response.hits.find(hit => hit.course === course));

    // Redirect if invalid course
    if (!initialItem) {
      redirect(res, '/');
      return {};
    }

    const results = await Index.getData(course);
    const initialValue = initialItem.title;
    return { results, initialValue };
  }

  componentDidUpdate = (prevProps) => {
    const { router } = this.props;

    const course = router.query.course;
    const prevCourse = prevProps.router.query.course;

    // verify props have changed to avoid an infinite loop
    if (course !== prevCourse) {
      if (course) {
        this.setState({ results: [], loading: true }, async () => {
          this.setState({
            results: await Index.getData(course),
            loading: false,
          });
        });
      } else {
        this.setState({ results: [] });
      }
    }
  }

  onChange = (selection) => {
    if (selection) {
      const course = selection.course.toUpperCase();
      Router.push(`/?course=${course}`, `/course/${course}`, { shallow: true });
    } else {
      Router.push('/', '/', { shallow: true });
    }
  }

  render() {
    const { results, loading } = this.state;
    const { initialValue } = this.props;

    return (
      <div className="font-sans leading-tight">
        <Header onChange={this.onChange} showSpinner={loading} initialValue={initialValue} />
        <PoseGroup>
          {results.length > 0 && (
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
