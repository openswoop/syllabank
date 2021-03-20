import { mocked } from 'ts-jest/utils';
import { testEnv } from '../utils/firebaseHelper';
import { updateIndex } from '../../src/functions/updateIndex';
import * as searchRepo from '../../src/repositories/searchRepo';

jest.mock('../../src/repositories/searchRepo.ts', () => ({
  upsertRecord: jest.fn(),
}));

const mockedSearchRepo = mocked(searchRepo);

beforeEach(() => {
  jest.spyOn(console, 'log').mockImplementation(() => {});
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  jest.clearAllMocks();
  mocked(console.log).mockRestore();
  mocked(console.error).mockRestore();
});

describe('updateIndex', () => {
  test('should determine the title based on frequency and recency', async () => {
    // Arrange
    const course = {
      name: 'COP2220',
      sections: [
        {
          term: 'Fall 2020',
          title: 'Programming I',
          last_name: 'Snedden',
          online: true,
        },
        {
          term: 'Spring 2020',
          title: 'Programming I',
          last_name: 'Snedden',
          online: true,
        },
        {
          term: 'Fall 2019',
          title: 'Computer Science I',
          last_name: 'Snedden',
          online: true,
        },
        {
          term: 'Spring 2019',
          title: 'Computer Science I',
          last_name: 'Snedden',
          online: true,
        },
      ],
    };

    const oldRecord = testEnv.firestore.makeDocumentSnapshot({}, 'course/COP2220');
    const newRecord = testEnv.firestore.makeDocumentSnapshot(course, 'course/COP2220');
    const change = testEnv.makeChange(oldRecord, newRecord);
    const wrapped = testEnv.wrap(updateIndex);

    // Act
    await wrapped(change);

    // Assert
    expect(mockedSearchRepo.upsertRecord).toHaveBeenCalledWith('COP2220', 'Programming I', 4);
  });

  test('should always prefer preferred title', async () => {
    // Arrange
    const course = {
      name: 'CIS4930',
      preferred_title: 'Special Topics',
      sections: [
        {
          term: 'Fall 2021',
          title: 'ST: Web Dev Frameworks',
          last_name: 'Snedden',
          online: true,
        },
      ],
    };
    const oldRecord = testEnv.firestore.makeDocumentSnapshot({}, 'course/CIS4930');
    const newRecord = testEnv.firestore.makeDocumentSnapshot(course, 'course/CIS4930');
    const change = testEnv.makeChange(oldRecord, newRecord);
    const wrapped = testEnv.wrap(updateIndex);

    // Act
    wrapped(change);

    // Assert
    expect(mockedSearchRepo.upsertRecord).toHaveBeenCalledWith('CIS4930', 'Special Topics', 1);
  });

  test('should skip deleted courses', () => {
    // Arrange
    const course = {
      name: 'COP2220',
      sections: [
        {
          term: 'Fall 2020',
          title: 'Programming I',
          last_name: 'Snedden',
          online: true,
        },
      ],
    };
    const oldRecord = testEnv.firestore.makeDocumentSnapshot(course, 'course/COP2220');
    const newRecord = testEnv.firestore.makeDocumentSnapshot({}, 'course/COP2220');
    const change = testEnv.makeChange(oldRecord, newRecord);
    const wrapped = testEnv.wrap(updateIndex);

    // Act
    wrapped(change);

    // Assert
    expect(mockedSearchRepo.upsertRecord).not.toHaveBeenCalled();
  });
});
