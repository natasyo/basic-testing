// Uncomment the code below and write your tests
// import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

import { doStuffByInterval, readFileAsynchronously } from './index';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import { join } from 'path';

jest.mock('fs', () => ({
  existsSync: jest.fn(),
}));

jest.mock('fs/promises', () => ({
  readFile: jest.fn(),
}));

jest.mock('path', () => ({
  join: jest.fn(),
}));

const mockExistsSync = existsSync as jest.MockedFunction<typeof existsSync>;
const mockReadFile = readFile as jest.MockedFunction<typeof readFile>;
const mockPathJoin = join as jest.MockedFunction<typeof join>;

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    // Write your test here
    const callback = jest.fn();
    setTimeout(callback, 1000);
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalled();
  });

  test('should call callback only after timeout', () => {
    // Write your test here
    const callback = jest.fn();
    setTimeout(callback, 1000);
    jest.advanceTimersByTime(998);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(2);
    expect(callback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    // Write your test here
    const sb = jest.fn();
    const spy = jest.spyOn(global, 'setInterval');
    doStuffByInterval(sb, 1000);
    expect(spy).toHaveBeenCalledWith(sb, 1000);
  });

  test('should call callback multiple times after multiple intervals', () => {
    // Write your test here
    const sb = jest.fn();
    doStuffByInterval(sb, 1000);
    jest.advanceTimersByTime(1000);
    expect(sb).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(2000);
    expect(sb).toHaveBeenCalledTimes(3);
    jest.advanceTimersByTime(3000);
    expect(sb).toHaveBeenCalledTimes(6);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const file = 'path.txt';
    const fakePath = '/fake/path.txt';

    mockPathJoin.mockReturnValue(fakePath);
    mockExistsSync.mockReturnValue(true);
    mockReadFile.mockResolvedValue(Buffer.from('content'));

    await readFileAsynchronously(file);

    expect(mockPathJoin).toHaveBeenCalledWith(expect.any(String), file);
  });

  test('should return null if file does not exist', async () => {
    mockPathJoin.mockReturnValue('/some/path');
     mockExistsSync.mockReturnValue(false);
    const result = await readFileAsynchronously('path.txt');
    expect(result).toBeNull();
    expect(mockReadFile).not.toHaveBeenCalled();
  });

  test('should return file content if file exists', async () => {
    const content="content"
    mockPathJoin.mockReturnValue('/some/path');
    mockExistsSync.mockReturnValue(true)
    mockReadFile.mockResolvedValue(Buffer.from(content));
    const result = await readFileAsynchronously('path.txt');
    expect(result).toBe(content);

  });
});
