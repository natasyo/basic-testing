// Uncomment the code below and write your tests
import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
} from '.';
import lodash from 'lodash';

describe('BankAccount', () => {
  const initial = 120;
  let account: BankAccount;

  beforeAll(() => {
    account = getBankAccount(initial);
    console.log(account);
  });

  test('should create account with initial balance', () => {
    // Write your test here
    expect(account.getBalance()).toBe(initial);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    // Write your test here
    expect(() => account.withdraw(300)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    // Write your test here
    const targetAccount = getBankAccount(20);
    expect(() => account.transfer(500, targetAccount)).toThrow();
  });

  test('should throw error when transferring to the same account', () => {
    // Write your test here
    expect(() => account.transfer(500, account)).toThrow();
  });

  test('should deposit money', () => {
    // Write your test here
    account.deposit(10);
    expect(account.getBalance()).toBe(130);
  });

  test('should withdraw money', () => {
    // Write your test here
    account.withdraw(50);
    expect(account.getBalance()).toBe(80);
  });

  test('should transfer money', () => {
    // Write your test here
    account.withdraw(10);
    expect(account.getBalance()).toBe(70);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    // Write your tests here
    const spy = jest
      .spyOn(lodash, 'random')
      .mockReturnValueOnce(33)
      .mockReturnValueOnce(1);
    const result = await account.fetchBalance();
    expect(typeof result).toBe('number');
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThanOrEqual(100);
    spy.mockRestore();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    // Write your tests here
    jest
      .spyOn(account, 'fetchBalance')
      .mockResolvedValue(500);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(500);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    // Write your tests here
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);
    expect(account.synchronizeBalance()).rejects.toThrow(SynchronizationFailedError);
  });
});
