import Header from '../components/Header';
import SearchResults from '../components/SearchResults';
import React, {Component} from 'react';
import fetch from 'isomorphic-unfetch';
import '../css/styles.css';
import myData from '../components/data.json';

class Syllabank extends Component {

  constructor(props) {
    super(props);

    this.state = {
      results: [],
      query: "",
    };
  }

  onClick = async () => {
    const res = await fetch("http://localhost:8000/api/selectSylabi?course=ENC1101");
    const data = await res.json();
    console.log(data);

    this.setState({
      results: data
    });
  };

  onInputChange = async (event) => {
    if (event.key === 'Enter') {
      const searchTerm = event.target.value;
      console.log(searchTerm);
      // alert(JSON.stringify(item));

      // console.log(myData);
      // const res = await fetch("http://localhost:8000/api/selectSylabi?course=" + searchTerm);
      // const data = await res.json();
        Array.prototype.filter = function(fun /*, thisp*/) {
    var len = this.length >>> 0;
    if (typeof fun != "function")
    throw new TypeError();

    var res = [];
    var thisp = arguments[1];
    for (var i = 0; i < len; i++) {
      if (i in this) {
        var val = this[i];
        if (fun.call(thisp, val, i, this))
        res.push(val);
      }
    }
    return res;
  };

      let data = myData.filter(function (el) {
        return el.course == searchTerm.toUpperCase()
      });
      console.log(data);

      this.setState({
        results: data.slice(0, 20)
      });
    }
  };

  render() {
    return (
      <div className="font-sans leading-tight">
        <Header onAction={this.onInputChange}/>
        <section className="container mx-auto">
          <div className="flex -mx-4">
            <div className="w-3/5 ml-auto mr-auto px-8 py-4">
              <div className="flex items-center">
                <span className="text-grey-dark italic font-light">Showing results</span>
                <div className="ml-auto">
                  <a href="#"><i className="fas fa-bars text-blue-dark mr-1"></i></a>
                  <a href="#"><i className="fas fa-th text-grey"></i></a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="container mx-auto">
          <div className="flex -mx-4">
            <div className="w-1/5 px-4">
              {/* <!-- Course description --> */}
              {/*<div className="rounded shadow text-sm p-5 mb-6 border-t-2 border-teal-dark">*/}
              {/*  <div className="flex mb-4">*/}
              {/*    <span className="font-medium pr-3">COT3100</span>*/}
              {/*    <span>3 credits</span>*/}
              {/*  </div>*/}
              {/*  <p className="text-xs text-grey-darker mb-4">*/}
              {/*    This course covers the applications of finite mathematics to CIS. Topics include*/}
              {/*    sets,*/}
              {/*    relations, functions, and number theory; algebraic and combinatorial structures;*/}
              {/*    applications of graphs; Boolean algebra and switching theory, and logic.*/}
              {/*  </p>*/}
              {/*  <a href="#" className="font-sans-round font-semibold text-teal-dark no-underline">*/}
              {/*    <i className="fas fa-dove mr-1"></i>*/}
              {/*    View catalog*/}
              {/*  </a>*/}
              {/*</div>*/}

              {/* <!-- Professor description --> */}
              {/*<div className="rounded shadow text-sm p-5 mb-6 border-t-2 border-pink-dark">*/}
              {/*  <div className="flex items-center mb-4">*/}
              {/*    <div className="h-8 w-8 bg-cover rounded-full"*/}
              {/*         style={{backgroundImage: `url("http://www.unf.edu/~asai/images/asai.jpg")`}}></div>*/}
              {/*    <div className="ml-4">*/}
              {/*      <div className="font-medium">Asai Asaithambi</div>*/}
              {/*      <div className="text-xs text-grey-darkest italic font-light">School of Computing*/}
              {/*      </div>*/}
              {/*    </div>*/}
              {/*  </div>*/}
              {/*  <a href="#" className="font-sans-round font-semibold text-pink-dark no-underline">*/}
              {/*    <i className="fas fa-dove mr-1"></i>*/}
              {/*    View ISQs*/}
              {/*  </a>*/}
              {/*</div>*/}
            </div>

            <div className="w-3/5 px-4">
          {/*    /!* <!-- Next semester info --> *!/*/}
          {/*    <div className="flex rounded shadow text-sm py-3 px-4 mb-6 items-center">*/}
          {/*      <span className="flex-no-shrink font-medium pr-4">Spring 2019 Sections</span>*/}
          {/*      <span className="text-xs text-grey-darker pr-4">*/}
          {/*    Two professors are teaching <span className="font-medium">COT3100</span> next semester*/}
          {/*</span>*/}
          {/*      <a href="#"*/}
          {/*         className="flex-no-shrink ml-auto bg-grey-dark hover:bg-grey-darker rounded px-6 py-2 text-xs text-white no-underline shadow-md">*/}
          {/*        View section listings*/}
          {/*      </a>*/}
          {/*    </div>*/}

              {/* Results table */}
              <div className="flex flex-col rounded text-sm shadow p-4 mb-6">
                {/*<button className="bg-green text-white mb-3" onClick={this.onClick}>Click</button>*/}
                <SearchResults results={this.state.results}/>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default Syllabank
