import { describe, it, expect } from 'vitest';
import { safeValue } from '../../src/validation/safeValue';

describe('safeValue', () => {
  it('should return the original value when it is valid', () => {
    expect(safeValue('Hello', 'N/A')).toBe('Hello');
    expect(safeValue(42, 'N/A')).toBe(42);
    expect(safeValue(true, false)).toBe(true);
    expect(safeValue({ key: 'value' }, {})).toEqual({ key: 'value' });
  });

  it('should return fallback when value is null', () => {
    expect(safeValue(null, 'N/A')).toBe('N/A');
    expect(safeValue(null, 0)).toBe(0);
    expect(safeValue(null, false)).toBe(false);
  });

  it('should return fallback when value is undefined', () => {
    expect(safeValue(undefined, 'N/A')).toBe('N/A');
    expect(safeValue(undefined, 0)).toBe(0);
    expect(safeValue(undefined, false)).toBe(false);
  });

  it('should return fallback when value is empty string', () => {
    expect(safeValue('', 'Empty')).toBe('Empty');
    expect(safeValue('   ', 'Empty')).toBe('Empty');
    expect(safeValue('\t\n', 'Empty')).toBe('Empty');
  });

  it('should handle edge cases', () => {
    expect(safeValue(0, 'N/A')).toBe(0);
    expect(safeValue(false, 'N/A')).toBe(false);
    expect(safeValue('0', 'N/A')).toBe('0');
    expect(safeValue('false', 'N/A')).toBe('false');
  });

  it('should preserve object references for valid objects', () => {
    const obj = { key: 'value' };
    const result = safeValue(obj, {});
    expect(result).toBe(obj);
    expect(result).toEqual({ key: 'value' });
  });
});
