import { Course } from '../../src/domain/Course';

describe('addSyllabus', () => {
  test('should only add syllabus to matching sections', () => {
    // Arrange
    const course = new Course('AST2002', [
      {
        term: 'Spring 2017',
        title: 'Basic Astronomy',
        last_name: 'Anderson',
        days: 'MW',
        time_begin: '10:50:00',
        time_end: '12:50:00',
      },
      {
        term: 'Spring 2017',
        title: 'Basic Astronomy',
        last_name: 'Anderson',
        online: true,
      },
      {
        term: 'Spring 2017',
        title: 'Basic Astronomy',
        last_name: 'Not Anderson',
        online: true,
      },
    ]);

    // Act
    const updatedCourse = course.addSyllabus(
      {
        term: 'Spring 2017',
        last_name: 'Anderson',
      },
      'syllabus.pdf',
    );

    // Assert
    expect(updatedCourse).toEqual(
      new Course('AST2002', [
        {
          term: 'Spring 2017',
          title: 'Basic Astronomy',
          last_name: 'Anderson',
          days: 'MW',
          time_begin: '10:50:00',
          time_end: '12:50:00',
          syllabus: 'syllabus.pdf',
        },
        {
          term: 'Spring 2017',
          title: 'Basic Astronomy',
          last_name: 'Anderson',
          online: true,
          syllabus: 'syllabus.pdf',
        },
        {
          term: 'Spring 2017',
          title: 'Basic Astronomy',
          last_name: 'Not Anderson',
          online: true,
        },
      ]),
    );
  });

  test('should add syllabus for specific sections', () => {
    // Arrange
    const course = new Course('AST2002', [
      {
        term: 'Spring 2017',
        title: 'Basic Astronomy',
        last_name: 'Anderson',
        days: 'MW',
        time_begin: '10:50:00',
        time_end: '12:50:00',
      },
    ]);

    // Act
    const updatedCourse = course.addSyllabus(
      {
        term: 'Spring 2017',
        last_name: 'Anderson',
        days: 'MW',
        time: '10:50:00',
      },
      'syllabus.pdf',
    );

    // Assert
    expect(updatedCourse).toEqual(
      new Course('AST2002', [
        {
          term: 'Spring 2017',
          title: 'Basic Astronomy',
          last_name: 'Anderson',
          days: 'MW',
          time_begin: '10:50:00',
          time_end: '12:50:00',
          syllabus: 'syllabus.pdf',
        },
      ]),
    );
  });
});
