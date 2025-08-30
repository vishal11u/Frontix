/**
 * Converts a string to a URL-friendly slug.
 * Removes special characters, converts spaces to hyphens, and makes lowercase.
 *
 * @param str - The string to convert
 * @param separator - Character to use as separator (default: '-')
 * @returns URL-friendly slug string
 *
 * @example
 * ```typescript
 * slugify("Hello World!");              // "hello-world"
 * slugify("User's Profile", '_');       // "users_profile"
 * slugify("Café & Résumé");             // "cafe-resume"
 * ```
 */
export function slugify(str: string, separator: string = '-'): string {
  if (!str || typeof str !== 'string') {
    return '';
  }
  
  // Handle empty separator case
  if (separator === '') {
    return str
      .toLowerCase()
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '');
  }
  
  // Escape special regex characters in separator
  const escapedSeparator = separator.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  
  return str
    .toLowerCase()
    .trim()
    // Replace accented characters with their ASCII equivalents
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    // First, normalize consecutive separators in the input (like -- or ___)
    .replace(/[-_]{2,}/g, separator)
    // Remove apostrophes and periods entirely
    .replace(/['.]/g, '')
    // Replace other special characters with separator
    .replace(/[^a-z0-9\s-]/g, separator)
    // Replace spaces with separator
    .replace(/\s+/g, separator)
    // Normalize consecutive separators again
    .replace(new RegExp(`${escapedSeparator}+`, 'g'), separator)
    // Remove leading/trailing separators
    .replace(new RegExp(`^${escapedSeparator}|${escapedSeparator}$`, 'g'), '');
}
