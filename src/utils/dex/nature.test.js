import { getNatureId, getNatureName } from './nature';

describe('Dex utils Nature getters', () => {
  describe('getNatureId', () => {
    test('should throw an error if the input is falsy', () => {
      const natureString = '';
      expect(() => getNatureId(natureString)).toThrow(`Bad natureString: ${natureString}`);
    });

    test('should throw an error if the input is not a valid nature string', () => {
      const natureString = 'Bad Nature';
      expect(() => getNatureId(natureString)).toThrow(`Bad natureString: ${natureString}`);
    });

    test('should return the correct nature ID for a valid nature string', () => {
      const natureString = 'Hardy';
      const expected = 0;
      const actual = getNatureId(natureString);
      expect(actual).toBe(expected);
    });
  });

  describe('getNatureName', () => {
    test('should return the correct nature name for a given nature ID', () => {
      const natureId = 5;
      const expected = 'Bold';
      const actual = getNatureName(natureId);
      expect(actual).toBe(expected);
    });
  });
});
