import { describe, it, expect } from 'vitest';
import { merge } from '../../src/deep/merge';

describe('merge', () => {
  it('should merge simple objects', () => {
    const target = { a: 1, b: 2 };
    const source = { b: 3, c: 4 };
    
    const result = merge(target, source);
    
    expect(result).toEqual({ a: 1, b: 3, c: 4 });
    expect(result).toBe(target); // Should modify target in place
  });

  it('should merge nested objects', () => {
    const target = { a: 1, b: { c: 2, d: 3 } };
    const source = { b: { d: 4, e: 5 }, f: 6 };
    
    const result = merge(target, source);
    
    expect(result).toEqual({ a: 1, b: { c: 2, d: 4, e: 5 }, f: 6 });
    expect(result.b).toBe(target.b); // Should modify nested object in place
  });

  it('should merge multiple sources', () => {
    const target = { a: 1 };
    const source1 = { b: 2 };
    const source2 = { c: 3 };
    const source3 = { d: 4 };
    
    const result = merge(target, source1, source2, source3);
    
    expect(result).toEqual({ a: 1, b: 2, c: 3, d: 4 });
  });

  it('should handle arrays by replacing them', () => {
    const target = { a: [1, 2, 3] };
    const source = { a: [4, 5, 6] };
    
    const result = merge(target, source);
    
    expect(result).toEqual({ a: [4, 5, 6] });
    expect(result.a).toBe(source.a); // Should reference source array
  });

  it('should handle null and undefined sources', () => {
    const target = { a: 1, b: 2 };
    
    const result = merge(target, null as any, undefined as any);
    
    expect(result).toEqual({ a: 1, b: 2 });
  });

  it('should handle non-object sources', () => {
    const target = { a: 1, b: 2 };
    
    const result = merge(target, 'string' as any, 42 as any);
    
    expect(result).toEqual({ a: 1, b: 2 });
  });

  it('should merge deeply nested structures', () => {
    const target = {
      a: 1,
      b: {
        c: 2,
        d: {
          e: 3,
          f: [1, 2, 3]
        }
      }
    };
    
    const source = {
      b: {
        d: {
          e: 4,
          g: 5
        }
      },
      h: 6
    };
    
    const result = merge(target, source);
    
    expect(result).toEqual({
      a: 1,
      b: {
        c: 2,
        d: {
          e: 4,
          f: [1, 2, 3],
          g: 5
        }
      },
      h: 6
    });
  });

  it('should handle empty objects', () => {
    const target = {};
    const source = {};
    
    const result = merge(target, source);
    
    expect(result).toEqual({});
  });

  it('should handle no sources', () => {
    const target = { a: 1, b: 2 };
    
    const result = merge(target);
    
    expect(result).toEqual({ a: 1, b: 2 });
  });

  it('should preserve object references for non-object values', () => {
    const target = { a: 1, b: { c: 2 } };
    const source = { a: 3, b: { c: 4 } };
    
    const result = merge(target, source);
    
    expect(result.a).toBe(3);
    expect(result.b).toBe(target.b); // Should modify in place
    expect(result.b.c).toBe(4);
  });
});
