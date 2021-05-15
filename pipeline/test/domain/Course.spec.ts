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

describe('mergeWith', () => {
  test('should add missing sections in order', () => {
    // Arrange
    const course = new Course('COT3100', [
      {
        term: 'Fall 2019',
        title: 'Computational Structures',
        last_name: 'Liu',
        online: true,
      },
    ]);

    // Act
    const updatedCourse = course.mergeWith(
      new Course('COT3100', [
        {
          term: 'Fall 2019',
          title: 'Computational Structures',
          last_name: 'Liu',
          online: true,
        },
        {
          term: 'Spring 2020',
          title: 'Computational Structures',
          last_name: 'Asaithambi',
          online: true,
        },
      ]),
    );

    // Assert
    expect(updatedCourse).toEqual(
      new Course('COT3100', [
        {
          term: 'Spring 2020',
          title: 'Computational Structures',
          last_name: 'Asaithambi',
          online: true,
        },
        {
          term: 'Fall 2019',
          title: 'Computational Structures',
          last_name: 'Liu',
          online: true,
        },
      ]),
    );
  });

  test('should not add existing sections twice', () => {
    // Arrange
    const course = new Course('COT3100', [
      {
        term: 'Spring 2020',
        title: 'Computational Structures',
        last_name: 'Asaithambi',
        online: true,
        syllabus: 'syllabi/AST2002_Spring2017_Anderson.pdf',
      },
    ]);

    // Act
    const updatedCourse = course.mergeWith(
      new Course('COT3100', [
        {
          term: 'Spring 2020',
          title: 'Computational Structures',
          last_name: 'Asaithambi',
          online: true,
        },
        {
          term: 'Fall 2019',
          title: 'Computational Structures',
          last_name: 'Liu',
          online: true,
        },
      ]),
    );

    // Assert
    expect(updatedCourse).toEqual(
      new Course('COT3100', [
        {
          term: 'Spring 2020',
          title: 'Computational Structures',
          last_name: 'Asaithambi',
          online: true,
          syllabus: 'syllabi/AST2002_Spring2017_Anderson.pdf',
        },
        {
          term: 'Fall 2019',
          title: 'Computational Structures',
          last_name: 'Liu',
          online: true,
        },
      ]),
    );
  });

  test('should delete removed sections', () => {
    // Arrange
    const course = new Course('COT3100', [
      {
        term: 'Spring 2020',
        title: 'Computational Structures',
        last_name: 'Asaithambi',
        online: true,
      },
    ]);

    // Act
    const updatedCourse = course.mergeWith(
      new Course('COT3100', [
        {
          term: 'Fall 2019',
          title: 'Computational Structures',
          last_name: 'Liu',
          online: true,
        },
      ]),
    );

    // Assert
    expect(updatedCourse).toEqual(
      new Course('COT3100', [
        {
          term: 'Fall 2019',
          title: 'Computational Structures',
          last_name: 'Liu',
          online: true,
        },
      ]),
    );
  });
});
