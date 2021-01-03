import * as courseRepo from '../src/repositories/courseRepo';
import { Course } from '../src/types/Course';

describe('saveCourse', () => {
  test('should save a course', async () => {
    // Arrange
    const course = new Course('TEST0000', [
      {
        term: 'Fall 2013',
        title: 'Introduction to OO Programming',
        last_name: 'Umapathy',
        online: true,
      },
    ]);

    // Act
    const save = courseRepo.saveCourse(course);

    // Assert
    await expect(save).resolves.toBeUndefined();
  });
});

describe('findCourse', () => {
  test('should return a course', async () => {
    // Arrange
    const courseName = 'TEST0000';

    // Act
    const course = await courseRepo.findCourse(courseName);

    // Assert
    expect(course!.name).toEqual(courseName);
    expect(course!.sections).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          term: 'Fall 2013',
          title: 'Introduction to OO Programming',
          last_name: 'Umapathy',
          online: true,
        }),
      ]),
    );
  });
});