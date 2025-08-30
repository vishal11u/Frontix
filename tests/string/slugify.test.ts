import { describe, it, expect } from 'vitest';
import { slugify } from '../../src/string/slugify';

describe('slugify', () => {
  it('should convert basic strings to slugs', () => {
    expect(slugify('Hello World')).toBe('hello-world');
    expect(slugify('Simple Test')).toBe('simple-test');
    expect(slugify('Another Example')).toBe('another-example');
  });

  it('should handle special characters', () => {
    expect(slugify('Hello World!')).toBe('hello-world');
    expect(slugify('User\'s Profile')).toBe('users-profile');
    expect(slugify('Café & Résumé')).toBe('cafe-resume');
    expect(slugify('React & TypeScript')).toBe('react-typescript');
  });

  it('should handle numbers and mixed content', () => {
    expect(slugify('Version 2.0')).toBe('version-20');
    expect(slugify('User123')).toBe('user123');
    expect(slugify('2024 New Year')).toBe('2024-new-year');
  });

  it('should handle multiple spaces and separators', () => {
    expect(slugify('Multiple    Spaces')).toBe('multiple-spaces');
    expect(slugify('Tabs\tand\nNewlines')).toBe('tabs-and-newlines');
    expect(slugify('Mixed   \t  \n  Separators')).toBe('mixed-separators');
  });

  it('should handle custom separators', () => {
    expect(slugify('Hello World', '_')).toBe('hello_world');
    expect(slugify('Test String', '.')).toBe('test.string');
    expect(slugify('Another Test', '')).toBe('anothertest');
  });

  it('should handle edge cases', () => {
    expect(slugify('')).toBe('');
    expect(slugify('   ')).toBe('');
    expect(slugify('---')).toBe('');
    expect(slugify('___')).toBe('');
  });

  it('should handle unicode and accented characters', () => {
    expect(slugify('Café')).toBe('cafe');
    expect(slugify('Résumé')).toBe('resume');
    expect(slugify('Schrödinger')).toBe('schrodinger');
    expect(slugify('François')).toBe('francois');
  });

  it('should handle consecutive separators', () => {
    expect(slugify('Hello--World')).toBe('hello-world');
    expect(slugify('Test___String')).toBe('test-string');
    expect(slugify('Multiple---Separators')).toBe('multiple-separators');
  });

  it('should handle leading and trailing separators', () => {
    expect(slugify('-Hello World-')).toBe('hello-world');
    expect(slugify('_Test String_')).toBe('test-string');
    expect(slugify('---Content---')).toBe('content');
  });

  it('should handle null and undefined', () => {
    expect(slugify(null as any)).toBe('');
    expect(slugify(undefined as any)).toBe('');
  });

  it('should handle non-string inputs', () => {
    expect(slugify(123 as any)).toBe('');
    expect(slugify({} as any)).toBe('');
    expect(slugify([] as any)).toBe('');
  });
});
