/**
 * Validates an email address format.
 * Uses a comprehensive regex pattern to check email validity.
 *
 * @param email - The email address to validate
 * @returns true if the email format is valid, false otherwise
 *
 * @example
 * ```typescript
 * validateEmail("user@example.com");     // true
 * validateEmail("invalid-email");        // false
 * validateEmail("");                     // false
 * validateEmail("user@domain.co.uk");    // true
 * ```
 */
export function validateEmail(email: string): boolean {
  if (!email || typeof email !== 'string') {
    return false;
  }
  
  // Comprehensive email regex pattern with stricter validation
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  // Additional checks for common invalid patterns
  if (email.includes('..') || email.includes('@@') || email.startsWith('.') || email.endsWith('.')) {
    return false;
  }
  
  return emailRegex.test(email.trim());
}
