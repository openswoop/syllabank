import * as courseRepo from '../src/repositories/courseRepo';
import { Course } from '../src/types/Course';

describe('findCourse', () => {
  test('should return a course', async () => {
    // Arrange
    const courseName = 'COP2551';

    // Act
    const course = await courseRepo.findCourse(courseName);

    // Assert
    expect(course.name).toEqual('COP2551');
    expect(course.sections).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          term: 'Fall 2013',
          last_name: 'Umapathy',
          online: true,
        }),
      ]),
    );
  });
});

describe('saveCourse', () => {
  test('should save a course', async () => {
    // Arrange
    const course = new Course('COP2551', [
      {
        term: 'Fall 2013',
        last_name: 'Umapathy',
        online: true,
      },
    ]);

    // Act
    const save = async () => await courseRepo.saveCourse(course);

    // Assert
    await expect(save()).resolves.toBeUndefined();
  });
});
