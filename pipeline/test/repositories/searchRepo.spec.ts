import './../utils/firebaseHelper';
import * as searchRepo from '../../src/repositories/searchRepo';

describe('upsertRecord', () => {
  test('should insert record using objectId', async () => {
    // Arrange
    const courseName = 'TEST0000';

    // Act
    const upsert = searchRepo.upsertRecord(courseName, 'Test Course', 0);

    // Asset
    await expect(upsert).resolves.toEqual(courseName);
  });
});
