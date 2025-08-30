import { describe, it, expect } from 'vitest';
import { camelCase, kebabCase, snakeCase, pascalCase } from '../../src/string/caseConversion';

describe('Case Conversion Functions', () => {
  describe('camelCase', () => {
    it('should convert space-separated strings to camelCase', () => {
      expect(camelCase('hello world')).toBe('helloWorld');
      expect(camelCase('user name')).toBe('userName');
      expect(camelCase('first name last name')).toBe('firstNameLastName');
    });

    it('should convert kebab-case to camelCase', () => {
      expect(camelCase('user-name')).toBe('userName');
      expect(camelCase('first-name-last-name')).toBe('firstNameLastName');
      expect(camelCase('api-endpoint')).toBe('apiEndpoint');
    });

    it('should convert snake_case to camelCase', () => {
      expect(camelCase('user_name')).toBe('userName');
      expect(camelCase('first_name_last_name')).toBe('firstNameLastName');
      expect(camelCase('api_endpoint')).toBe('apiEndpoint');
    });

    it('should handle mixed separators', () => {
      expect(camelCase('user-name_lastName')).toBe('userNameLastName');
      expect(camelCase('first name-last_name')).toBe('firstNameLastName');
    });

    it('should handle edge cases', () => {
      expect(camelCase('')).toBe('');
      expect(camelCase('hello')).toBe('hello');
      expect(camelCase('HELLO')).toBe('hello');
    });
  });

  describe('kebabCase', () => {
    it('should convert camelCase to kebab-case', () => {
      expect(kebabCase('helloWorld')).toBe('hello-world');
      expect(kebabCase('userName')).toBe('user-name');
      expect(kebabCase('firstNameLastName')).toBe('first-name-last-name');
    });

    it('should convert PascalCase to kebab-case', () => {
      expect(kebabCase('HelloWorld')).toBe('hello-world');
      expect(kebabCase('UserName')).toBe('user-name');
      expect(kebabCase('FirstNameLastName')).toBe('first-name-last-name');
    });

    it('should convert space-separated strings to kebab-case', () => {
      expect(kebabCase('hello world')).toBe('hello-world');
      expect(kebabCase('user name')).toBe('user-name');
      expect(kebabCase('first name last name')).toBe('first-name-last-name');
    });

    it('should handle mixed separators', () => {
      expect(kebabCase('user_name')).toBe('user-name');
      expect(kebabCase('user-name')).toBe('user-name');
      expect(kebabCase('user name_name')).toBe('user-name-name');
    });

    it('should handle edge cases', () => {
      expect(kebabCase('')).toBe('');
      expect(kebabCase('hello')).toBe('hello');
      expect(kebabCase('HELLO')).toBe('hello');
    });
  });

  describe('snakeCase', () => {
    it('should convert camelCase to snake_case', () => {
      expect(snakeCase('helloWorld')).toBe('hello_world');
      expect(snakeCase('userName')).toBe('user_name');
      expect(snakeCase('firstNameLastName')).toBe('first_name_last_name');
    });

    it('should convert PascalCase to snake_case', () => {
      expect(snakeCase('HelloWorld')).toBe('hello_world');
      expect(snakeCase('UserName')).toBe('user_name');
      expect(snakeCase('FirstNameLastName')).toBe('first_name_last_name');
    });

    it('should convert space-separated strings to snake_case', () => {
      expect(snakeCase('hello world')).toBe('hello_world');
      expect(snakeCase('user name')).toBe('user_name');
      expect(snakeCase('first name last name')).toBe('first_name_last_name');
    });

    it('should handle mixed separators', () => {
      expect(snakeCase('user-name')).toBe('user_name');
      expect(snakeCase('user_name')).toBe('user_name');
      expect(snakeCase('user name-name')).toBe('user_name_name');
    });

    it('should handle edge cases', () => {
      expect(snakeCase('')).toBe('');
      expect(snakeCase('hello')).toBe('hello');
      expect(snakeCase('HELLO')).toBe('hello');
    });
  });

  describe('pascalCase', () => {
    it('should convert space-separated strings to PascalCase', () => {
      expect(pascalCase('hello world')).toBe('HelloWorld');
      expect(pascalCase('user name')).toBe('UserName');
      expect(pascalCase('first name last name')).toBe('FirstNameLastName');
    });

    it('should convert kebab-case to PascalCase', () => {
      expect(pascalCase('user-name')).toBe('UserName');
      expect(pascalCase('first-name-last-name')).toBe('FirstNameLastName');
      expect(pascalCase('api-endpoint')).toBe('ApiEndpoint');
    });

    it('should convert snake_case to PascalCase', () => {
      expect(pascalCase('user_name')).toBe('UserName');
      expect(pascalCase('first_name_last_name')).toBe('FirstNameLastName');
      expect(pascalCase('api_endpoint')).toBe('ApiEndpoint');
    });

    it('should convert camelCase to PascalCase', () => {
      expect(pascalCase('helloWorld')).toBe('HelloWorld');
      expect(pascalCase('userName')).toBe('UserName');
      expect(pascalCase('firstNameLastName')).toBe('FirstNameLastName');
    });

    it('should handle edge cases', () => {
      expect(pascalCase('')).toBe('');
      expect(pascalCase('hello')).toBe('Hello');
      expect(pascalCase('HELLO')).toBe('Hello');
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('should handle null and undefined', () => {
      expect(camelCase(null as any)).toBe('');
      expect(kebabCase(undefined as any)).toBe('');
      expect(snakeCase(null as any)).toBe('');
      expect(pascalCase(undefined as any)).toBe('');
    });

    it('should handle non-string inputs', () => {
      expect(camelCase(123 as any)).toBe('');
      expect(kebabCase({} as any)).toBe('');
      expect(snakeCase([] as any)).toBe('');
      expect(pascalCase(true as any)).toBe('');
    });

    it('should handle strings with numbers', () => {
      expect(camelCase('user123')).toBe('user123');
      expect(kebabCase('user123')).toBe('user123');
      expect(snakeCase('user123')).toBe('user123');
      expect(pascalCase('user123')).toBe('User123');
    });

    it('should handle strings with special characters', () => {
      expect(camelCase('user-name_123')).toBe('userName123');
      expect(kebabCase('user_name-123')).toBe('user-name-123');
      expect(snakeCase('user-name_123')).toBe('user_name_123');
      expect(pascalCase('user-name_123')).toBe('UserName123');
    });
  });
});
