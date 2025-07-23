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
    debugger;
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