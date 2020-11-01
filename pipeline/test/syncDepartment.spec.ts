import { mocked } from 'ts-jest/utils';
import { syncDepartment } from '../src/functions/syncDepartment';
import * as courseRepo from '../src/repositories/courseRepo';
import * as departmentRepo from '../src/repositories/departmentRepo';

jest.mock('../src/repositories/departmentRepo.ts', () => ({
  getCoursesByDepartmentId: jest.fn(),
}));

jest.mock('../src/repositories/courseRepo.ts', () => ({
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

const CONTEXT = {
  eventId: '70172329041928',
  eventType: 'google.pubsub.topic.publish',
  timestamp: '2018-04-09T07:56:12.975Z',
  resource: null,
};

describe('syncDepartment', () => {
  test('should merge courses', async () => {
    // Arrange
    const event = {
      data: Buffer.from(JSON.stringify({
        departmentId: 6502,
      })).toString('base64'),
    };
    const context = CONTEXT;
    const callback = jest.fn();

    mockedDepartmentRepo.getCoursesByDepartmentId.mockResolvedValueOnce([
      {
        name: 'COT3100',
        sections: [{ term: 'Spring 2020', last_name: 'Asaithambi' }],
      },
    ]);

    mockedCourseRepo.findCourse.mockResolvedValueOnce({
      name: 'COT3100',
      sections: [{ term: 'Fall 2019', last_name: 'Liu' }],
    });

    // Act
    await syncDepartment(event, context, callback);

    // Assert
    expect(courseRepo.saveCourse).toHaveBeenCalledWith({
      name: 'COT3100',
      sections: [
        { term: 'Spring 2020', last_name: 'Asaithambi' },
        { term: 'Fall 2019', last_name: 'Liu' },
      ],
    });
  });
});
