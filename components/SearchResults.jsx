import React from 'react';
import { resolvePublicUrl } from '../lib/db';

export default class SearchResults extends React.Component {
  toFormattedTime = (time) => {
    const [hour, minutes] = time.split(':');
    const date = new Date();
    date.setHours(hour, minutes, 0);
    return date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  };

  render() {
    const { results } = this.props;
    const headings = ['Term', 'Course', 'Professor', 'Time', 'Syllabus'];

    return (
      <table className="w-full">
        <thead>
          <tr>
            {headings.map(title => <th key={title} className="results-header">{title}</th>)}
          </tr>
        </thead>

        <tbody>
          {results.map(row => (
            <tr key={row.id}>
              <td className="pb-5">{row.term} {row.year}</td>
              <td className="pb-5">{row.course}</td>
              <td className="pb-5">
                <span className="font-medium">{row.last_name}</span>{row.first_name}
              </td>
              <td className="pb-5">
                {row.online ? 'Online' : `${row.days} ${this.toFormattedTime(row.time_begin)}`}
              </td>
              <td className="pb-5">
                {row.syllabus && (
                  <a href={resolvePublicUrl(row.syllabus)} target="_blank" rel="noopener noreferrer" className="results-link">
                    <i className="fas fa-eye mr-1" /> Open PDF
                  </a>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
