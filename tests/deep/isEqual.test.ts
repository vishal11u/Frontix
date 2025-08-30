import { describe, it, expect } from 'vitest';
import { isEqual } from '../../src/deep/isEqual';

describe('isEqual', () => {
  it('should return true for identical primitive values', () => {
    expect(isEqual(42, 42)).toBe(true);
    expect(isEqual('hello', 'hello')).toBe(true);
    expect(isEqual(true, true)).toBe(true);
    expect(isEqual(null, null)).toBe(true);
    expect(isEqual(undefined, undefined)).toBe(true);
  });

  it('should return false for different primitive values', () => {
    expect(isEqual(42, 43)).toBe(false);
    expect(isEqual('hello', 'world')).toBe(false);
    expect(isEqual(true, false)).toBe(false);
    expect(isEqual(0, false)).toBe(false);
    expect(isEqual('0', 0)).toBe(false);
  });

  it('should return false for null/undefined comparisons', () => {
    expect(isEqual(null, undefined)).toBe(false);
    expect(isEqual(0, null)).toBe(false);
    expect(isEqual('', undefined)).toBe(false);
  });

  it('should compare Date objects correctly', () => {
    const date1 = new Date('2023-01-01T12:00:00Z');
    const date2 = new Date('2023-01-01T12:00:00Z');
    const date3 = new Date('2023-01-01T12:00:01Z');
    
    expect(isEqual(date1, date2)).toBe(true);
    expect(isEqual(date1, date3)).toBe(false);
  });

  it('should compare RegExp objects correctly', () => {
    const regex1 = /test/gi;
    const regex2 = /test/gi;
    const regex3 = /test/g;
    
    expect(isEqual(regex1, regex2)).toBe(true);
    expect(isEqual(regex1, regex3)).toBe(false);
  });

  it('should compare Map objects correctly', () => {
    const map1 = new Map([['key1', 'value1'], ['key2', { nested: 'value2' }]]);
    const map2 = new Map([['key1', 'value1'], ['key2', { nested: 'value2' }]]);
    const map3 = new Map([['key1', 'value1'], ['key2', { nested: 'different' }]]);
    
    expect(isEqual(map1, map2)).toBe(true);
    expect(isEqual(map1, map3)).toBe(false);
  });

  it('should compare Set objects correctly', () => {
    const set1 = new Set([1, 2, { a: 3 }]);
    const set2 = new Set([1, 2, { a: 3 }]);
    const set3 = new Set([1, 2, { a: 4 }]);
    
    expect(isEqual(set1, set2)).toBe(true);
    expect(isEqual(set1, set3)).toBe(false);
  });

  it('should compare arrays correctly', () => {
    expect(isEqual([1, 2, 3], [1, 2, 3])).toBe(true);
    expect(isEqual([1, 2, 3], [1, 2, 4])).toBe(false);
    expect(isEqual([1, [2, 3]], [1, [2, 3]])).toBe(true);
    expect(isEqual([1, [2, 3]], [1, [2, 4]])).toBe(false);
  });

  it('should compare objects correctly', () => {
    expect(isEqual({ a: 1, b: 2 }, { a: 1, b: 2 })).toBe(true);
    expect(isEqual({ a: 1, b: 2 }, { a: 1, b: 3 })).toBe(false);
    expect(isEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } })).toBe(true);
    expect(isEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 3 } })).toBe(false);
  });

  it('should handle nested structures', () => {
    const obj1 = {
      a: 1,
      b: [2, 3, { c: 4, d: [5, 6] }],
      e: new Map([['key', { f: 7 }]])
    };
    
    const obj2 = {
      a: 1,
      b: [2, 3, { c: 4, d: [5, 6] }],
      e: new Map([['key', { f: 7 }]])
    };
    
    const obj3 = {
      a: 1,
      b: [2, 3, { c: 4, d: [5, 7] }],
      e: new Map([['key', { f: 7 }]])
    };
    
    expect(isEqual(obj1, obj2)).toBe(true);
    expect(isEqual(obj1, obj3)).toBe(false);
  });

  it('should handle empty objects and arrays', () => {
    expect(isEqual({}, {})).toBe(true);
    expect(isEqual([], [])).toBe(true);
    expect(isEqual(new Map(), new Map())).toBe(true);
    expect(isEqual(new Set(), new Set())).toBe(true);
  });

  it('should handle different object shapes', () => {
    expect(isEqual({ a: 1 }, { a: 1, b: 2 })).toBe(false);
    expect(isEqual({ a: 1, b: 2 }, { a: 1 })).toBe(false);
    expect(isEqual([1, 2], [1, 2, 3])).toBe(false);
    expect(isEqual([1, 2, 3], [1, 2])).toBe(false);
  });
});
