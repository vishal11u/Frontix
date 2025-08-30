/**
 * Creates a deep clone of an object, handling circular references.
 * Supports primitives, objects, arrays, dates, and other built-in types.
 *
 * @param obj - The object to clone
 * @returns A deep clone of the object
 *
 * @example
 * ```typescript
 * const original = { a: 1, b: { c: 2 } };
 * const cloned = deepClone(original);
 * cloned.b.c = 3;
 * console.log(original.b.c); // 2 (unchanged)
 * ```
 */
export function deepClone<T>(obj: T, visited = new WeakMap()): T {
  // Handle primitives and null
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  // Handle circular references
  if (visited.has(obj)) {
    return visited.get(obj);
  }
  
  // Handle Date objects
  if (obj instanceof Date) {
    const cloned = new Date(obj.getTime()) as T;
    visited.set(obj, cloned);
    return cloned;
  }
  
  // Handle Array objects
  if (Array.isArray(obj)) {
    const cloned: any[] = [];
    visited.set(obj, cloned as T);
    for (let i = 0; i < obj.length; i++) {
      cloned[i] = deepClone(obj[i], visited);
    }
    return cloned as T;
  }
  
  // Handle RegExp objects
  if (obj instanceof RegExp) {
    const cloned = new RegExp(obj.source, obj.flags) as T;
    visited.set(obj, cloned);
    return cloned;
  }
  
  // Handle Map objects
  if (obj instanceof Map) {
    const cloned = new Map();
    visited.set(obj, cloned as T);
    obj.forEach((value, key) => {
      cloned.set(deepClone(key, visited), deepClone(value, visited));
    });
    return cloned as T;
  }
  
  // Handle Set objects
  if (obj instanceof Set) {
    const cloned = new Set();
    visited.set(obj, cloned as T);
    obj.forEach(value => {
      cloned.add(deepClone(value, visited));
    });
    return cloned as T;
  }
  
  // Handle plain objects
  const clonedObj: any = {};
  visited.set(obj, clonedObj as T);
  
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      clonedObj[key] = deepClone((obj as any)[key], visited);
    }
  }
  
  return clonedObj as T;
}
