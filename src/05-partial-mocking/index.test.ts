// Uncomment the code below and write your tests
// import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

import { mockOne, mockThree, mockTwo, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');
  return {
    __esModule: true,

    ...originalModule,
    mockOne: jest.fn(),
    mockThree: jest.fn(),
    mockTwo: jest.fn(),
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });
  let consoleSpy: jest.SpyInstance;
  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });
  test('mockOne, mockTwo, mockThree should not log into console', () => {
    // Write your test here
    mockOne();
    mockTwo();
    mockThree();
    expect(consoleSpy).not.toHaveBeenCalled();
  });

  test('unmockedFunction should log into console', () => {
    // Write your test here
    unmockedFunction();
    expect(consoleSpy).toHaveBeenCalled();
  });
});
