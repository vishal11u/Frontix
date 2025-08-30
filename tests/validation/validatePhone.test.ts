import { describe, it, expect } from 'vitest';
import { validatePhone } from '../../src/validation/validatePhone';

describe('validatePhone', () => {
  it('should validate correct phone numbers', () => {
    expect(validatePhone('+1-555-123-4567')).toBe(true);
    expect(validatePhone('555-123-4567')).toBe(true);
    expect(validatePhone('(555) 123-4567')).toBe(true);
    expect(validatePhone('555.123.4567')).toBe(true);
    expect(validatePhone('555 123 4567')).toBe(true);
    expect(validatePhone('+44 20 7946 0958')).toBe(true);
  });

  it('should reject invalid phone numbers', () => {
    expect(validatePhone('invalid')).toBe(false);
    expect(validatePhone('123')).toBe(false);
    expect(validatePhone('555-123')).toBe(false);
    expect(validatePhone('abc-def-ghij')).toBe(false);
    expect(validatePhone('555-123-4567-890')).toBe(false);
  });

  it('should handle edge cases', () => {
    expect(validatePhone('')).toBe(false);
    expect(validatePhone('   ')).toBe(false);
    expect(validatePhone(null as any)).toBe(false);
    expect(validatePhone(undefined as any)).toBe(false);
    expect(validatePhone(123 as any)).toBe(false);
  });

  it('should handle international formats', () => {
    expect(validatePhone('+1-555-123-4567')).toBe(true);
    expect(validatePhone('+44-20-7946-0958')).toBe(true);
    expect(validatePhone('+81-3-1234-5678')).toBe(true);
    expect(validatePhone('+86-10-1234-5678')).toBe(true);
  });

  it('should handle various separators', () => {
    expect(validatePhone('555-123-4567')).toBe(true);
    expect(validatePhone('555.123.4567')).toBe(true);
    expect(validatePhone('555 123 4567')).toBe(true);
    expect(validatePhone('(555) 123-4567')).toBe(true);
    expect(validatePhone('555_123_4567')).toBe(true);
  });

  it('should validate length constraints', () => {
    // Too short
    expect(validatePhone('123456')).toBe(false);
    // Too long
    expect(validatePhone('12345678901234567890')).toBe(false);
    // Valid lengths
    expect(validatePhone('1234567')).toBe(true);
    expect(validatePhone('123456789012345')).toBe(true);
  });
});
