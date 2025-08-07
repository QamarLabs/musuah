// utils/lazyLoad.ts
import { lazy } from 'react';
import { Option } from "../../typings.d";

export function lazyLoad<
    T extends Record<string, any>,
    K extends keyof T
>(loader: () => Promise<T>, name: K) {
    return lazy(async () => {
        const module = await loader();
        return { default: module[name] };
    });
}

export function isDateExpired(date: Date | string | number): boolean {
    // debugger;
    // Convert input to Date object
    const inputDate = new Date(date);

    // Get current date
    const currentDate = new Date();

    // Check if the input date is valid
    if (isNaN(inputDate.getTime())) {
        throw new Error('Invalid date provided');
    }

    // Compare dates with optional threshold
    return inputDate.getTime()  <= currentDate.getTime();
}

export function setExpirationDate(timeToAdd: number, fromDate: Date = new Date()): Date {
    // Validate input date
    if (isNaN(fromDate.getTime())) {
        throw new Error('Invalid fromDate provided');
    }

    // Validate timeToAdd
    if (typeof timeToAdd !== 'number' || timeToAdd < 0) {
        throw new Error('timeToAdd must be a positive number');
    }

    // Create new date to avoid modifying the original
    const resultDate = new Date(fromDate);
    resultDate.setTime(resultDate.getTime() + timeToAdd);

    return resultDate;
}

export function groupOptions(options: Option[]) {
  return options.reduce((acc, option) => {
    const category = option.category || 'Uncategorized';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(option);
    return acc;
  }, {} as Record<string, Option[]>)
}


/**
 * Compares two objects and returns an object containing:
 * - newProperties: key-value pairs that exist in newObj but not in oldObj
 * - changedProperties: key-value pairs that exist in both but with different values
 * 
 * @param oldObj The original object to compare against
 * @param newObj The new object to compare
 * @returns An object with new and changed properties
 */
export function getObjectDifferences<T extends Record<string, any>>(
  oldObj: T,
  newObj: Partial<T>
): {
  newProperties: Partial<T>;
  changedProperties: Partial<T>;
} {
  const newProperties: Partial<T> = {};
  const changedProperties: Partial<T> = {};

  // Check for new or changed properties
  for (const key in newObj) {
    if (!(key in oldObj)) {
      // Key is new
      newProperties[key] = newObj[key];
    } else if (!deepEqual(oldObj[key], newObj[key])) {
      // Value has changed
      changedProperties[key] = newObj[key];
    }
  }

  return { newProperties, changedProperties };
}

/**
 * Helper function to deeply compare two values
 * Handles objects, arrays, dates, and primitive values
 */
function deepEqual(a: any, b: any): boolean {
  // Handle primitive types and null/undefined
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (typeof a !== 'object' || typeof b !== 'object') return a === b;

  // Handle Date objects
  if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime();

  // Handle arrays
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!deepEqual(a[i], b[i])) return false;
    }
    return true;
  }

  // Handle objects
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) return false;

  for (const key of aKeys) {
    if (!bKeys.includes(key)) return false;
    if (!deepEqual(a[key], b[key])) return false;
  }

  return true;
}