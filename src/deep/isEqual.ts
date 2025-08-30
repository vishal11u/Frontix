/**
 * Performs a deep equality comparison between two values.
 * Handles objects, arrays, dates, and other complex types.
 *
 * @param a - First value to compare
 * @param b - Second value to compare
 * @returns true if the values are deeply equal, false otherwise
 *
 * @example
 * ```typescript
 * isEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } }); // true
 * isEqual([1, 2, 3], [1, 2, 3]);                           // true
 * isEqual(new Date('2023-01-01'), new Date('2023-01-01')); // true
 * isEqual({ a: 1 }, { a: 2 });                              // false
 * ```
 */
export function isEqual(a: any, b: any): boolean {
  // Handle primitive values
  if (a === b) {
    return true;
  }
  
  // Handle null/undefined
  if (a == null || b == null) {
    return a === b;
  }
  
  // Handle different types
  if (typeof a !== typeof b) {
    return false;
  }
  
  // Handle Date objects
  if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime();
  }
  
  // Handle RegExp objects
  if (a instanceof RegExp && b instanceof RegExp) {
    return a.source === b.source && a.flags === b.flags;
  }
  
  // Handle Map objects
  if (a instanceof Map && b instanceof Map) {
    if (a.size !== b.size) return false;
    for (const [key, value] of a) {
      if (!b.has(key) || !isEqual(value, b.get(key))) {
        return false;
      }
    }
    return true;
  }
  
  // Handle Set objects
  if (a instanceof Set && b instanceof Set) {
    if (a.size !== b.size) return false;
    for (const value of a) {
      let found = false;
      for (const bValue of b) {
        if (isEqual(value, bValue)) {
          found = true;
          break;
        }
      }
      if (!found) return false;
    }
    return true;
  }
  
  // Handle arrays
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!isEqual(a[i], b[i])) return false;
    }
    return true;
  }
  
  // Handle objects
  if (typeof a === 'object' && typeof b === 'object') {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    
    if (keysA.length !== keysB.length) return false;
    
    for (const key of keysA) {
      if (!keysB.includes(key) || !isEqual(a[key], b[key])) {
        return false;
      }
    }
    return true;
  }
  
  return false;
}
