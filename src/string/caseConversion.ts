/**
 * String case conversion utility functions.
 * Provides various ways to convert strings between different case formats.
 */

/**
 * Converts a string to camelCase.
 *
 * @param str - The string to convert
 * @returns camelCase string
 *
 * @example
 * ```typescript
 * camelCase("hello world");              // "helloWorld"
 * camelCase("user-name");                // "userName"
 * camelCase("first_name_last_name");     // "firstNameLastName"
 * ```
 */
export function camelCase(str: string): string {
  if (!str || typeof str !== 'string') {
    return '';
  }
  
  // Handle edge case where string starts with separator
  const trimmed = str.replace(/^[\s_-]+/, '');
  if (trimmed.length === 0) return '';
  
  // If the string is already in camelCase format, return it as is
  if (/^[a-z][a-zA-Z]*$/.test(trimmed)) {
    return trimmed;
  }
  
  // Split by separators and process each part
  const parts = trimmed.split(/[\s_-]+/);
  if (parts.length === 1) {
    return parts[0].toLowerCase();
  }
  
  // First part is lowercase, rest are capitalized
  return parts[0].toLowerCase() + 
    parts.slice(1).map(part => {
      if (part.length === 0) return '';
      // If the part already has camelCase formatting, preserve it
      if (/^[a-z][a-zA-Z]*$/.test(part)) {
        return part.charAt(0).toUpperCase() + part.slice(1);
      }
      // Otherwise, capitalize first letter and lowercase the rest
      return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
    }).join('');
}

/**
 * Converts a string to kebab-case.
 *
 * @param str - The string to convert
 * @returns kebab-case string
 *
 * @example
 * ```typescript
 * kebabCase("helloWorld");               // "hello-world"
 * kebabCase("userName");                 // "user-name"
 * kebabCase("firstNameLastName");        // "first-name-last-name"
 * ```
 */
export function kebabCase(str: string): string {
  if (!str || typeof str !== 'string') {
    return '';
  }
  
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

/**
 * Converts a string to snake_case.
 *
 * @param str - The string to convert
 * @returns snake_case string
 *
 * @example
 * ```typescript
 * snakeCase("helloWorld");               // "hello_world"
 * snakeCase("userName");                 // "user_name"
 * snakeCase("firstNameLastName");        // "first_name_last_name"
 * ```
 */
export function snakeCase(str: string): string {
  if (!str || typeof str !== 'string') {
    return '';
  }
  
  return str
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[\s-]+/g, '_')
    .toLowerCase();
}

/**
 * Converts a string to PascalCase.
 *
 * @param str - The string to convert
 * @returns PascalCase string
 *
 * @example
 * ```typescript
 * pascalCase("hello world");             // "HelloWorld"
 * pascalCase("user-name");               // "UserName"
 * pascalCase("first_name_last_name");    // "FirstNameLastName"
 * ```
 */
export function pascalCase(str: string): string {
  if (!str || typeof str !== 'string') {
    return '';
  }
  
  // First convert to camelCase, then capitalize first letter
  const camel = camelCase(str);
  if (camel.length === 0) return camel;
  return camel.charAt(0).toUpperCase() + camel.slice(1);
}
