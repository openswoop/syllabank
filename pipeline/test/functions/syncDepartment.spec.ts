import { mocked } from 'ts-jest/utils';
import { testEnv } from '../utils/firebaseHelper';
import { syncDepartment } from '../../src/functions/syncDepartment';
import * as courseRepo from '../../src/repositories/courseRepo';
import * as departmentRepo from '../../src/repositories/departmentRepo';

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
      {
        name: 'COT3100',
        sections: [
          { term: 'Spring 2020', title: 'Computational Structures', last_name: 'Asaithambi' },
        ],
      },
    ]);

    mockedCourseRepo.findCourse.mockResolvedValueOnce({
      name: 'COT3100',
      sections: [{ term: 'Fall 2019', title: 'Computational Structures', last_name: 'Liu' }],
    });

    const wrapped = testEnv.wrap(syncDepartment);

    // Act
    await wrapped(message);

    // Assert
    expect(courseRepo.saveCourse).toHaveBeenCalledWith({
      name: 'COT3100',
      sections: [
        { term: 'Spring 2020', title: 'Computational Structures', last_name: 'Asaithambi' },
        { term: 'Fall 2019', title: 'Computational Structures', last_name: 'Liu' },
      ],
    });
  });
});
