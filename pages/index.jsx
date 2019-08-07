import React, { Component } from 'react';
import posed, { PoseGroup } from 'react-pose';
import Router, { withRouter } from 'next/router';
import Header from '../components/Header';
import Content from '../components/Content';
import { loadFirebase } from '../lib/db';
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

export default withRouter(class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: [],
      loading: false,
    };
  }

  componentDidUpdate = (prevProps) => {
    const { router } = this.props;
    const course = router.query.course;

    // verify props have changed to avoid an infinite loop
    if (course !== prevProps.router.query.course) {
      if (course) {
        this.setState({ results: [], loading: true }, () => {
          this.getData(course);
        });
      } else {
        this.setState({ results: [] });
      }
    }
  }

  toTermName = (termNumber) => {
    if (termNumber === 10) return 'Spring';
    if (termNumber === 50) return 'Summer';
    if (termNumber === 80) return 'Fall';
    return undefined;
  }

  getData = async (course) => {
    const firebase = await loadFirebase();
    const db = firebase.firestore();
    const data = await new Promise((resolve, reject) => {
      db.collection('courses')
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
          resolve(records);
        })
        .catch(error => reject(error));
    });

    this.setState({
      results: data.map(row => ({ ...row, term: this.toTermName(row.term) })),
      loading: false,
    });
  }

  onChange = (selection) => {
    if (selection) {
      const url = {
        pathname: '/',
        query: { course: selection.course.toUpperCase() },
      };
      Router.push(url, url, { shallow: true });
    } else {
      Router.push('/', '/', { shallow: true });
    }
  }

  render() {
    const { results, loading } = this.state;

    return (
      <div className="font-sans leading-tight">
        <Header onAction={this.onChange} showSpinner={loading} />
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
});
