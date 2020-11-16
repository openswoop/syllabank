import { mocked } from 'ts-jest/utils';
import { registerSyllabi } from '../src/functions/registerSyllabi';
import * as courseRepo from '../src/repositories/courseRepo';
import * as syllabusRepo from '../src/repositories/syllabusRepo';

jest.mock('../src/repositories/courseRepo.ts', () => ({
  findCourse: jest.fn(),
  saveCourse: jest.fn(),
}));

jest.mock('../src/repositories/syllabusRepo.ts', () => ({
  publishSyllabus: jest.fn(),
}));

const mockedCourseRepo = mocked(courseRepo);
const mockedSyllabusRepo = mocked(syllabusRepo);

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
  eventType: 'google.storage.object.finalize',
  timestamp: '2018-04-09T07:56:12.975Z',
  resource: null,
};

describe('registerSyllabi', () => {
  test('should skip files that are not PDFs', async () => {
    // Arrange
    const event = {
      name: 'syllabi/AST2002_Spring2017_Anderson.pdf',
      bucket: 'syllabank.appspot.com',
      contentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      metageneration: 0,
      timeCreated: new Date(),
      updated: new Date(),
    };
    const context = CONTEXT;
    const callback = jest.fn();

    // Act
    await registerSyllabi(event, context, callback);

    // Assert
    expect(mockedCourseRepo.findCourse).not.toHaveBeenCalled();
    expect(mockedSyllabusRepo.publishSyllabus).not.toHaveBeenCalled();
  });

  test('should skip files that are not in the inbox folder', async () => {
    // Arrange
    const event = {
      name: 'syllabi/AST2002_Spring2017_Anderson.pdf',
      bucket: 'syllabank.appspot.com',
      contentType: 'application/pdf',
      metageneration: 0,
      timeCreated: new Date(),
      updated: new Date(),
    };
    const context = CONTEXT;
    const callback = jest.fn();

    // Act
    await registerSyllabi(event, context, callback);

    // Assert
    expect(mockedCourseRepo.findCourse).not.toHaveBeenCalled();
    expect(mockedSyllabusRepo.publishSyllabus).not.toHaveBeenCalled();
  });

  test('should skip files that dont match syllabus pattern', async () => {
    // Arrange
    const event = {
      name: 'syllabi/AST2002_Spring2017.pdf',
      bucket: 'syllabank.appspot.com',
      contentType: 'application/pdf',
      metageneration: 0,
      timeCreated: new Date(),
      updated: new Date(),
    };
    const context = CONTEXT;
    const callback = jest.fn();

    // Act
    await registerSyllabi(event, context, callback);

    // Assert
    expect(mockedCourseRepo.findCourse).not.toHaveBeenCalled();
    expect(mockedSyllabusRepo.publishSyllabus).not.toHaveBeenCalled();
  });

  test('should assign syllabus to matching courses', async () => {
    // Arrange
    const event = {
      name: 'inbox/AST2002_Spring2017_Anderson.pdf',
      bucket: 'syllabank.appspot.com',
      contentType: 'application/pdf',
      metageneration: 0,
      timeCreated: new Date(),
      updated: new Date(),
    };
    const context = CONTEXT;
    const callback = jest.fn();

    mockedCourseRepo.findCourse.mockResolvedValueOnce({
      name: 'AST2002',
      sections: [
        {
          term: 'Spring 2017',
          title: 'Basic Astronomy',
          last_name: 'Anderson',
          days: 'MW',
          time_begin: '1050',
          time_end: '1250',
        },
      ],
    });

    // Act
    await registerSyllabi(event, context, callback);

    // Assert
    expect(mocked(console.error)).not.toHaveBeenCalled();
    expect(mockedCourseRepo.findCourse).toHaveBeenCalled();
    expect(mockedSyllabusRepo.publishSyllabus).toHaveBeenCalledWith(
      'syllabank.appspot.com',
      'inbox/AST2002_Spring2017_Anderson.pdf',
    );
    expect(mockedCourseRepo.saveCourse).toHaveBeenCalledWith({
      name: 'AST2002',
      sections: [
        {
          term: 'Spring 2017',
          title: 'Basic Astronomy',
          last_name: 'Anderson',
          days: 'MW',
          time_begin: '1050',
          time_end: '1250',
          syllabus: 'syllabi/AST2002_Spring2017_Anderson.pdf',
        },
      ],
    });
  });

  test('should not publish changes if no courses match', async () => {
    // Arrange
    const event = {
      name: 'inbox/AST2002_Fall2019_Anderson.pdf',
      bucket: 'syllabank.appspot.com',
      contentType: 'application/pdf',
      metageneration: 0,
      timeCreated: new Date(),
      updated: new Date(),
    };
    const context = CONTEXT;
    const callback = jest.fn();

    mockedCourseRepo.findCourse.mockResolvedValueOnce({
      name: 'AST2002',
      sections: [
        {
          term: 'Spring 2017',
          title: 'Basic Astronomy',
          last_name: 'Anderson',
          days: 'MW',
          time_begin: '1050',
          time_end: '1250',
        },
      ],
    });

    // Act
    await registerSyllabi(event, context, callback);

    // Assert
    expect(mocked(console.error)).not.toHaveBeenCalled();
    expect(mockedCourseRepo.findCourse).toHaveBeenCalled();
    expect(mockedSyllabusRepo.publishSyllabus).not.toHaveBeenCalled();
    expect(mockedCourseRepo.saveCourse).not.toHaveBeenCalled();
  });
});
