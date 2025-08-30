/**
 * Capitalizes the first letter of a string.
 * Optionally capitalizes all words in the string.
 *
 * @param str - The string to capitalize
 * @param allWords - Whether to capitalize all words (default: false)
 * @returns Capitalized string
 *
 * @example
 * ```typescript
 * capitalize("hello world");              // "Hello world"
 * capitalize("hello world", true);       // "Hello World"
 * capitalize("JOHN DOE", true);          // "John Doe"
 * ```
 */
export function capitalize(str: string, allWords: boolean = false): string {
  if (!str || typeof str !== 'string') {
    return '';
  }
  
  if (allWords) {
    // First convert separators to spaces, then split and capitalize
    const normalized = str.replace(/[_-]/g, ' ');
    const words = normalized.split(/(\s+)/);
    return words
      .map((word, index) => {
        // If it's a space sequence, keep it as is
        if (/^\s+$/.test(word)) {
          return word;
        }
        // If it's a word, capitalize it
        if (/^[a-zA-Z]/.test(word)) {
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }
        // If it's not a word, keep it as is
        return word;
      })
      .join('');
  }
  
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
