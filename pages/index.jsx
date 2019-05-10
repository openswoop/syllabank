import React, { Component } from 'react';
import Header from '../components/Header';
import SearchResults from '../components/SearchResults';
import { loadFirebase } from '../lib/db';
import '../css/styles.css';
import LoadingSpinner from '../components/LoadingSpinner';

export default class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: [],
      loading: false,
    };
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
        .limit(20)
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
      results: data,
      loading: false,
    });
  }

  onChange = (selection) => {
    this.setState({ results: [], loading: true }, () => {
      this.getData(selection.course.toUpperCase());
    });
  }

  render() {
    const { results, loading } = this.state;

    return (
      <div className="font-sans leading-tight">
        <Header onAction={this.onChange} />

        {results.length > 0 && (
          <section className="container mx-auto">
            <div className="flex -mx-4">
              <div className="w-3/5 ml-auto mr-auto px-8 py-4">
                <div className="flex items-center">
                  <span className="text-grey-dark italic font-light">Showing {results.length} results</span>
                  <div className="ml-auto hidden">
                    <i className="fas fa-bars text-blue-dark mr-2" />
                    <i className="fas fa-th text-grey" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="container mx-auto">
          <div className="flex -mx-4">
            <div className="w-1/5 px-4">
              {/* Course description */}
              {/* <div className="rounded shadow text-sm p-5 mb-6 border-t-2 border-teal-dark">
                <div className="flex mb-4">
                  <span className="font-medium pr-3">COT3100</span>
                  <span>3 credits</span>
                </div>
                <p className="text-xs text-grey-darker mb-4">
                  This course covers the applications of finite mathematics to CIS. Topics include
                  sets,
                  relations, functions, and number theory; algebraic and combinatorial structures;
                  applications of graphs; Boolean algebra and switching theory, and logic.
                </p>
                <a href="#" className="font-sans-round font-semibold text-teal-dark no-underline">
                  <i className="fas fa-dove mr-1" />
                  View catalog
                </a>
              </div> */}

              {/* Professor description */}
              {/* <div className="rounded shadow text-sm p-5 mb-6 border-t-2 border-pink-dark">
                <div className="flex items-center mb-4">
                  <div
                    className="h-8 w-8 bg-cover rounded-full"
                    style={{ backgroundImage: 'url("http://www.unf.edu/~asai/images/asai.jpg")' }} />
                  <div className="ml-4">
                    <div className="font-medium">Asai Asaithambi</div>
                    <div className="text-xs text-grey-darkest italic font-light">School of Computing
                    </div>
                  </div>
                </div>
                <a href="#" className="font-sans-round font-semibold text-pink-dark no-underline">
                  <i className="fas fa-dove mr-1" />
                  View ISQs
                </a>
              </div> */}
            </div>

            <div className="w-3/5 px-4">
              {/* Next semester info */}
              {/* <div className="flex rounded shadow text-sm py-3 px-4 mb-6 items-center">
                <span className="flex-no-shrink font-medium pr-4">Spring 2019 Sections</span>
                <span className="text-xs text-grey-darker pr-4">
                  Two professors are teaching <span className="font-medium">COT3100</span> next semester
                </span>
                <a href="#" className="flex-no-shrink ml-auto bg-grey-dark hover:bg-grey-darker rounded px-6 py-2 text-xs text-white no-underline shadow-md">
                  View section listings
                </a>
              </div> */}

              {/* Results table */}
              {loading ? <LoadingSpinner /> : results.length > 0 && (
                <div className="flex flex-col rounded text-sm shadow p-4 mb-6">
                  <SearchResults results={results} />
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    );
  }
}
