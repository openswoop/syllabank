import * as departmentRepo from '../src/repositories/departmentRepo';

describe('getCoursesByDepartmentId', () => {
  test('should return a list of courses', async () => {
    // Arrange
    const departmentId = 6502;

    // Act
    const courses = await departmentRepo.getCoursesByDepartmentId(departmentId);

    // Assert
    expect(courses).toContainEqual(
      expect.objectContaining({
        name: 'COP2220',
        sections: expect.arrayContaining([
          {
            term: 'Fall 2020',
            last_name: 'Snedden',
            online: true,
          },
          {
            term: 'Summer 2020',
            last_name: 'Reddivari',
            days: 'MTWR',
            time_begin: '10:50:00',
            time_end: '12:30:00',
          },
        ]),
      }),
    );
  });
});
