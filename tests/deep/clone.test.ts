import { describe, it, expect } from 'vitest';
import { deepClone } from '../../src/deep/clone';

describe('deepClone', () => {
  it('should clone primitive values', () => {
    expect(deepClone(42)).toBe(42);
    expect(deepClone('hello')).toBe('hello');
    expect(deepClone(true)).toBe(true);
    expect(deepClone(null)).toBe(null);
    expect(deepClone(undefined)).toBe(undefined);
  });

  it('should clone Date objects', () => {
    const original = new Date('2023-01-01T12:00:00Z');
    const cloned = deepClone(original);
    
    expect(cloned).not.toBe(original);
    expect(cloned.getTime()).toBe(original.getTime());
    expect(cloned instanceof Date).toBe(true);
  });

  it('should clone RegExp objects', () => {
    const original = /test/gi;
    const cloned = deepClone(original);
    
    expect(cloned).not.toBe(original);
    expect(cloned.source).toBe(original.source);
    expect(cloned.flags).toBe(original.flags);
    expect(cloned instanceof RegExp).toBe(true);
  });

  it('should clone arrays', () => {
    const original = [1, 2, [3, 4], { a: 5 }];
    const cloned = deepClone(original);
    
    expect(cloned).not.toBe(original);
    expect(cloned).toEqual(original);
    expect(cloned[2]).not.toBe(original[2]);
    expect(cloned[3]).not.toBe(original[3]);
  });

  it('should clone objects', () => {
    const original = { a: 1, b: { c: 2 }, d: [3, 4] };
    const cloned = deepClone(original);
    
    expect(cloned).not.toBe(original);
    expect(cloned).toEqual(original);
    expect(cloned.b).not.toBe(original.b);
    expect(cloned.d).not.toBe(original.d);
  });

  it('should clone Map objects', () => {
    const original = new Map([['key1', 'value1'], ['key2', { nested: 'value2' }]]);
    const cloned = deepClone(original);
    
    expect(cloned).not.toBe(original);
    expect(cloned.size).toBe(original.size);
    expect(cloned.get('key1')).toBe('value1');
    expect(cloned.get('key2')).not.toBe(original.get('key2'));
    expect(cloned.get('key2')).toEqual({ nested: 'value2' });
  });

  it('should clone Set objects', () => {
    const original = new Set([1, 2, { a: 3 }]);
    const cloned = deepClone(original);
    
    expect(cloned).not.toBe(original);
    expect(cloned.size).toBe(original.size);
    expect(cloned.has(1)).toBe(true);
    expect(cloned.has(2)).toBe(true);
    
    const setValues = Array.from(cloned);
    const objValue = setValues.find(v => typeof v === 'object');
    expect(objValue).not.toBe(Array.from(original).find(v => typeof v === 'object'));
  });

  it('should handle circular references', () => {
    const original: any = { a: 1 };
    original.self = original;
    
    const cloned = deepClone(original);
    
    expect(cloned).not.toBe(original);
    expect(cloned.self).toBe(cloned);
    expect(cloned.a).toBe(1);
  });

  it('should handle nested circular references', () => {
    const original: any = { a: { b: {} } };
    original.a.b.c = original.a;
    
    const cloned = deepClone(original);
    
    expect(cloned).not.toBe(original);
    expect(cloned.a.b.c).toBe(cloned.a);
  });

  it('should handle empty objects and arrays', () => {
    expect(deepClone({})).toEqual({});
    expect(deepClone([])).toEqual([]);
    expect(deepClone(new Map())).toEqual(new Map());
    expect(deepClone(new Set())).toEqual(new Set());
  });
});
