import { describe, it, expect } from 'vitest';
import { validateEmail } from '../../src/validation/validateEmail';

describe('validateEmail', () => {
  it('should validate correct email addresses', () => {
    expect(validateEmail('user@example.com')).toBe(true);
    expect(validateEmail('test.email@domain.co.uk')).toBe(true);
    expect(validateEmail('user+tag@example.org')).toBe(true);
    expect(validateEmail('user.name@subdomain.example.com')).toBe(true);
    expect(validateEmail('123@example.com')).toBe(true);
    expect(validateEmail('user@example-domain.com')).toBe(true);
  });

  it('should reject invalid email addresses', () => {
    expect(validateEmail('invalid-email')).toBe(false);
    expect(validateEmail('user@')).toBe(false);
    expect(validateEmail('@example.com')).toBe(false);
    expect(validateEmail('user@.com')).toBe(false);
    expect(validateEmail('user..name@example.com')).toBe(false);
    expect(validateEmail('user@example..com')).toBe(false);
  });

  it('should handle edge cases', () => {
    expect(validateEmail('')).toBe(false);
    expect(validateEmail('   ')).toBe(false);
    expect(validateEmail(null as any)).toBe(false);
    expect(validateEmail(undefined as any)).toBe(false);
    expect(validateEmail(123 as any)).toBe(false);
  });

  it('should handle special characters in local part', () => {
    expect(validateEmail('user+tag@example.com')).toBe(true);
    expect(validateEmail('user.name@example.com')).toBe(true);
    expect(validateEmail('user_name@example.com')).toBe(true);
    expect(validateEmail('user-name@example.com')).toBe(true);
    expect(validateEmail('user!name@example.com')).toBe(true);
    expect(validateEmail('user#name@example.com')).toBe(true);
  });

  it('should handle international domains', () => {
    expect(validateEmail('user@example.co.uk')).toBe(true);
    expect(validateEmail('user@example.org')).toBe(true);
    expect(validateEmail('user@example.net')).toBe(true);
    expect(validateEmail('user@example.info')).toBe(true);
  });
});
