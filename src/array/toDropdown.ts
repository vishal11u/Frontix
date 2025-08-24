/**
 * Converts an array to dropdown-friendly objects with label and value properties.
 *
 * @param arr - The input array to convert
 * @returns An array of objects with `label` and `value` properties
 *
 * @example
 * ```typescript
 * toDropdown(["Apple", "Banana"]);
 * // Returns: [{ label: "Apple", value: "Apple" }, { label: "Banana", value: "Banana" }]
 *
 * toDropdown([1, 2, 3]);
 * // Returns: [{ label: 1, value: 1 }, { label: 2, value: 2 }, { label: 3, value: 3 }]
 * ```
 */
export function toDropdown<T>(arr: T[]): { label: T; value: T }[] {
  if (!Array.isArray(arr)) return [];
  return arr.map(item => ({ label: item, value: item }));
}
