import { describe, it, expect } from 'vitest';
import { capitalize } from '../../src/string/capitalize';

describe('capitalize', () => {
  it('should capitalize first letter only by default', () => {
    expect(capitalize('hello')).toBe('Hello');
    expect(capitalize('world')).toBe('World');
    expect(capitalize('test')).toBe('Test');
  });

  it('should capitalize all words when allWords is true', () => {
    expect(capitalize('hello world', true)).toBe('Hello World');
    expect(capitalize('john doe', true)).toBe('John Doe');
    expect(capitalize('react typescript', true)).toBe('React Typescript');
  });

  it('should handle already capitalized strings', () => {
    expect(capitalize('Hello')).toBe('Hello');
    expect(capitalize('WORLD')).toBe('World');
    expect(capitalize('Test String', true)).toBe('Test String');
  });

  it('should handle mixed case strings', () => {
    expect(capitalize('hElLo WoRlD', true)).toBe('Hello World');
    expect(capitalize('jOhN dOe', true)).toBe('John Doe');
    expect(capitalize('ReAcT tYpEsCrIpT', true)).toBe('React Typescript');
  });

  it('should handle single characters', () => {
    expect(capitalize('a')).toBe('A');
    expect(capitalize('z')).toBe('Z');
    expect(capitalize('A')).toBe('A');
  });

  it('should handle empty strings', () => {
    expect(capitalize('')).toBe('');
    expect(capitalize('', true)).toBe('');
  });

  it('should handle strings with only spaces', () => {
    expect(capitalize('   ')).toBe('   ');
    expect(capitalize('   ', true)).toBe('   ');
  });

  it('should handle strings with numbers', () => {
    expect(capitalize('user123')).toBe('User123');
    expect(capitalize('user 123', true)).toBe('User 123');
    expect(capitalize('123 user', true)).toBe('123 User');
  });

  it('should handle strings with special characters', () => {
    expect(capitalize('user-name')).toBe('User-name');
    expect(capitalize('user name', true)).toBe('User Name');
    expect(capitalize('user_name', true)).toBe('User Name');
  });

  it('should handle edge cases', () => {
    expect(capitalize(null as any)).toBe('');
    expect(capitalize(undefined as any)).toBe('');
    expect(capitalize(123 as any)).toBe('');
    expect(capitalize({} as any)).toBe('');
  });

  it('should preserve spacing', () => {
    expect(capitalize('  hello  world  ', true)).toBe('  Hello  World  ');
    expect(capitalize('\t\thello\t\tworld\t\t', true)).toBe('\t\tHello\t\tWorld\t\t');
  });

  it('should handle multiple consecutive spaces', () => {
    expect(capitalize('hello    world', true)).toBe('Hello    World');
    expect(capitalize('a    b    c', true)).toBe('A    B    C');
  });
});
