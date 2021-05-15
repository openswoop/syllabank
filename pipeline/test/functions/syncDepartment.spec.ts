import { mocked } from 'ts-jest/utils';
import { testEnv } from '../utils/firebaseHelper';
import { syncDepartment } from '../../src/functions/syncDepartment';
import * as courseRepo from '../../src/repositories/courseRepo';
import * as departmentRepo from '../../src/repositories/departmentRepo';
import { Course } from '../../src/domain/Course';

jest.mock('../../src/repositories/departmentRepo.ts', () => ({
  getCoursesByDepartmentId: jest.fn(),
}));

jest.mock('../../src/repositories/courseRepo.ts', () => ({
  findCourse: jest.fn(),
  saveCourse: jest.fn(),
}));

const mockedDepartmentRepo = mocked(departmentRepo);
const mockedCourseRepo = mocked(courseRepo);

beforeEach(() => {
  jest.spyOn(console, 'log').mockImplementation(() => {});
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  jest.clearAllMocks();
  mocked(console.log).mockRestore();
  mocked(console.error).mockRestore();
});

describe('syncDepartment', () => {
  test('should merge courses', async () => {
    // Arrange
    const message = testEnv.pubsub.makeMessage({
      departmentId: 6502,
    });

    mockedDepartmentRepo.getCoursesByDepartmentId.mockResolvedValueOnce([
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
    ]);

    mockedCourseRepo.findCourse.mockResolvedValueOnce(
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

    const wrapped = testEnv.wrap(syncDepartment);

    // Act
    await wrapped(message);

    // Assert
    expect(courseRepo.saveCourse).toHaveBeenCalledWith({
      name: 'COT3100',
      sections: [
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
      ],
    });
  });
});
