/**
 * Deeply merges multiple objects, with later objects taking precedence.
 * Handles nested objects, arrays, and preserves non-object values.
 *
 * @param target - The target object to merge into
 * @param sources - Source objects to merge from
 * @returns The merged object
 *
 * @example
 * ```typescript
 * const obj1 = { a: 1, b: { c: 2 } };
 * const obj2 = { b: { d: 3 }, e: 4 };
 * const merged = merge(obj1, obj2);
 * // Result: { a: 1, b: { c: 2, d: 3 }, e: 4 }
 * ```
 */
export function merge<T extends Record<string, any>>(
  target: T,
  ...sources: Partial<T>[]
): T {
  if (!sources.length) {
    return target;
  }
  
  const source = sources.shift();
  if (!source) {
    return target;
  }
  
  if (typeof source !== 'object' || source === null) {
    return target;
  }
  
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      const sourceValue = source[key];
      const targetValue = target[key];
      
      if (
        sourceValue &&
        typeof sourceValue === 'object' &&
        !Array.isArray(sourceValue) &&
        targetValue &&
        typeof targetValue === 'object' &&
        !Array.isArray(targetValue)
      ) {
        // Recursively merge nested objects
        (target as any)[key] = merge(targetValue, sourceValue);
      } else {
        // Override with source value
        (target as any)[key] = sourceValue;
      }
    }
  }
  
  // Continue with remaining sources
  return merge(target, ...sources);
}
