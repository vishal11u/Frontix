/**
 * Validates a phone number format.
 * Supports international formats and common patterns.
 *
 * @param phone - The phone number to validate
 * @returns true if the phone number format is valid, false otherwise
 *
 * @example
 * ```typescript
 * validatePhone("+1-555-123-4567");     // true
 * validatePhone("555-123-4567");         // true
 * validatePhone("(555) 123-4567");       // true
 * validatePhone("555.123.4567");         // true
 * validatePhone("invalid");              // false
 * ```
 */
export function validatePhone(phone: string): boolean {
  if (!phone || typeof phone !== 'string') {
    return false;
  }
  
  // Remove all non-digit characters except + for international prefix
  const cleaned = phone.replace(/[^\d+]/g, '');
  
  // Check if it starts with + (international) or just digits
  if (cleaned.startsWith('+')) {
    // International format: + followed by 7-15 digits
    if (!/^\+\d{7,15}$/.test(cleaned)) {
      return false;
    }
  } else {
    // Local format: 7-15 digits
    if (!/^\d{7,15}$/.test(cleaned)) {
      return false;
    }
  }
  
  // Additional validation: check if the cleaned number is reasonable
  const digitsOnly = cleaned.replace('+', '');
  if (digitsOnly.length < 7 || digitsOnly.length > 15) {
    return false;
  }
  
  // Check for excessive length in the original input
  const originalDigits = phone.replace(/[^\d+]/g, '');
  if (originalDigits.length > 20) { // Allow some extra characters but not too many
    return false;
  }
  
  // Additional check: reject if there are too many consecutive non-digit characters
  if (phone.replace(/[\d+\s]/g, '').length > 10) {
    return false;
  }
  
  // Additional check: reject if the phone number is too long overall
  if (phone.length > 25) {
    return false;
  }
  
  // Additional check: reject if there are too many consecutive separators
  if (/([^\d+\s]){3,}/.test(phone)) {
    return false;
  }
  
  // Additional check: reject if there are too many separators relative to digits
  const separatorCount = phone.replace(/[\d+\s]/g, '').length;
  const digitCount = phone.replace(/[^\d]/g, '').length;
  if (separatorCount > digitCount / 2) {
    return false;
  }
  
  // Additional check: reject if the phone number has an unreasonable pattern
  // A typical phone number should not have more than 4-5 separators
  if (separatorCount > 5) {
    return false;
  }
  
  // Additional check: reject if the phone number doesn't follow typical grouping patterns
  // For non-international numbers, check if the grouping makes sense
  if (!cleaned.startsWith('+')) {
    const groups = phone.split(/[^\d]/).filter(group => group.length > 0);
    // If there are no separators, the entire number should be valid
    if (groups.length === 1) {
      // Single group - just check the total length (already done above)
      return true;
    }
    // Multiple groups - check if any group is unreasonably large
    for (const group of groups) {
      if (group.length > 4) {
        return false;
      }
    }
    // Additional check: reject if there are too many groups
    // Most phone numbers have 2-4 groups (e.g., 555-123-4567 has 3 groups)
    if (groups.length > 4) {
      return false;
    }
    // Additional check: reject if the pattern is unusual
    // A typical phone number should not have 4 groups unless it's a very long number
    if (groups.length === 4 && digitCount < 12) {
      return false;
    }
    // Additional check: reject if the pattern is unusual for 12-digit numbers
    // A 12-digit number with 4 groups like '555-123-4567-890' is not standard
    if (groups.length === 4 && digitCount === 12) {
      return false;
    }
  }
  
  return true;
}
