// Uncomment the code below and write your tests
// import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

import { doStuffByInterval, readFileAsynchronously } from './index';
import path from 'path';
import * as fs from 'fs';

jest.mock('fs', () => ({
  __esModule: true,
  existsSync: jest.fn(),
  promises: {
    readFile: jest.fn(),
  },
}));
jest.mock('path', () => ({
  __esModule: true,
  join: jest.fn(),
  default: {
    join: jest.fn(),
  },
}));

const mockExistSync = fs.existsSync as jest.Mock;
const mockPathJoin = path.join as jest.Mock;
const mockReadFile = fs.promises.readFile as jest.Mock;

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
    mockExistSync.mockReturnValue(true);
    mockReadFile.mockResolvedValue('content');

    await readFileAsynchronously(file);

    expect(mockPathJoin).toHaveBeenCalledWith(expect.any(String), file);
  });

  test('should return null if file does not exist', async () => {
    mockPathJoin.mockReturnValue('/some/path');
    mockExistSync.mockReturnValue(false);
    const result = await readFileAsynchronously('path.txt');
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {});
});
