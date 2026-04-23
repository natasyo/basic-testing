// Uncomment the code below and write your tests
// import { simpleCalculator, Action } from './index';

import { Action, simpleCalculator } from '01-simple-tests';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    // Write your test here
    expect(simpleCalculator({ a: 5, b: 6, action: Action.Add })).toBe(11);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 5, b: 6, action: Action.Subtract })).toBe(-1);
    // Write your test here
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 5, b: 6, action: Action.Multiply })).toBe(30);
    // Write your test here
  });

  test('should divide two numbers', () => {
    // Write your test here
    expect(simpleCalculator({ a: 5, b: 5, action: Action.Divide })).toBe(1);
  });

  test('should exponentiate two numbers', () => {
    // Write your test here
    expect(simpleCalculator({ a: 5, b: 6, action: Action.Exponentiate })).toBe(
      15625,
    );
  });

  test('should return null for invalid action', () => {
    // Write your test here
    expect(simpleCalculator({ a: 5, b: 6, action: 'sdlkjflskdjf' })).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    // Write your test here
    expect(
      simpleCalculator({ a: '5', b: '5', action: Action.Divide }),
    ).toBeNull();
  });
});
