import React from 'react';

export default class SearchResults extends React.Component {
  toFormattedTime = (time) => {
    const times = time.split(':');
    const date = new Date();
    date.setHours(times[0], times[1], 0);
    return date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  };

  toTermName = (termNumber) => {
    if (termNumber === 10) return 'Spring';
    if (termNumber === 50) return 'Summer';
    if (termNumber === 80) return 'Fall';
    return 'ERROR';
  }

  render() {
    const { results } = this.props;
    const headings = ['Term', 'Course', 'Professor', 'Time', 'Syllabus'];
    const pdf = 'https://drive.google.com/file/d/1xqhJAlFcUOl_fOkG4xqx9dxSjDvyVtVk/view';

    return (
      <table className="w-full">
        <thead>
          <tr>
            {headings.map(title => <th key={title} className="results-header">{title}</th>)}
          </tr>
        </thead>

        <tbody>
          {results.map((row, i) => (
            <tr key={row.id}>
              <td className="pb-5">{this.toTermName(row.term)} {row.year}</td>
              <td className="pb-5">{row.course}</td>
              <td className="pb-5">
                <span className="font-medium">{row.last_name}</span>{row.first_name}
              </td>
              <td className="pb-5">{row.days} {this.toFormattedTime(row.time_begin)}</td>
              <td className="pb-5">
                <a href={pdf} target="_blank" rel="noopener noreferrer" className="results-link">
                  <i className="fas fa-eye mr-1" /> Open PDF
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
