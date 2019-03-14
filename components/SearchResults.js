import { Component } from 'react'

export default class SearchResults extends Component {

  render() {
    const headings = ['Term', 'Course', 'Professor', 'Time', 'Syllabus']
    const rows = [
      ['Fall 2018', 'COT3100', ['Gultepe', 'Eren'], 'MW 1:30pm',],
      ['Fall 2018', 'COT3100', ['Gultepe', 'Eren'], 'TR 4:30pm',],
      ['Fall 2018', 'COT3100', ['Liu', 'Xudong'], 'MW 4:30pm',],
      ['Summer 2018', 'COT3100', ['Asaithambi', 'Asai'], 'MTWR 10:50am',],
      ['Spring 2018', 'COT3100', ['Asaithambi', 'Asai'], 'TR 10:50am',],
      ['Spring 2018', 'COT3100', ['Asaithambi', 'Asai'], 'TR 3:05pm',],
      ['Spring 2018', 'COT3100', ['Jethwani', 'Richa'], 'TR 4:30pm',],
      ['Fall 2017', 'COT3100', ['Asaithambi', 'Asai'], 'TR 1:40pm',],
      ['Fall 2017', 'COT3100', ['Chuan', 'Ching-Hua'], 'MW 1:30pm',],
    ]

    return (
      <table className="w-full">
        <tr>
          {headings.map(title => <th key={title} className="text-left font-sans-round font-light text-grey-dark pb-5">{title}</th>)}
        </tr>
        
        {/* Enumerate results */}
        {rows.map((row, i) => (
          <tr key={i}>
            <td className="pb-5">{row[0]}</td>
            <td className="pb-5">{row[1]}</td>
            <td className="pb-5"><span className="font-medium">{row[2][0]}</span>, {row[2][1]}</td>
            <td className="pb-5">{row[3]}</td>
            <td className="pb-5"><a href="#" className="text-blue-dark no-underline"><i className="fas fa-eye mr-1"></i> Open PDF</a></td>
          </tr>
        ))}
      </table>
    )
  }
}