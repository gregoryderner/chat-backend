const IdService = require('../src/application/services/IdService');
const { v4: uuidv4 } = require('uuid');

jest.mock('uuid');

describe('IdService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should generate a UUID', () => {
    const mockUuid = '123e4567-e89b-12d3-a456-426614174000';
    uuidv4.mockReturnValue(mockUuid);

    const id = IdService.generateId();

    expect(id).toBe(mockUuid);
    expect(uuidv4).toHaveBeenCalled();
  });
});
