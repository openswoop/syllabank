import {Component} from 'react'

export default class SearchResults extends Component {

  to_formatted_time = (time) => {
    const times = time.split(":");
    const date = new Date();
    date.setHours(times[0], times[1], 0);
    return date.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true})
  };

  render() {
    const headings = ['Term', 'Course', 'Professor', 'Time', 'Syllabus'];

    return (
      <table className="w-full">
        <tr>
          {headings.map(title => <th key={title} className="results-header">{title}</th>)}
        </tr>

        {/* Enumerate results */}
        {this.props.results.map((row, i) => (
          <tr key={i}>
            {console.log(row)}
            <td className="pb-5">{row.term} {row.year}</td>
            <td className="pb-5">{row.course}</td>
            <td className="pb-5"><span
              className="font-medium">{row.last_name}</span> {row.first_name}</td>
            <td className="pb-5">{row.days} {this.to_formatted_time(row.time_begin)}</td>
            <td className="pb-5"><a href="https://drive.google.com/file/d/1xqhJAlFcUOl_fOkG4xqx9dxSjDvyVtVk/view" target="_blank" className="results-link">
              <i className="fas fa-eye mr-1"/> Open PDF</a>
            </td>
          </tr>
        ))}
      </table>
    )
  }
}