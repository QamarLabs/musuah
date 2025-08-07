
export const validateEmail = (value: string) => {
    // Basic email validation regex
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(value)) {
        return "Please enter a valid email address";
    }
};

export function throttle<T extends (...args: any[]) => any>(func: T, limit: number): T {
    let lastCall = 0;
    return function (...args: Parameters<T>) {
        const now = Date.now();
        if (now - lastCall >= limit) {
            lastCall = now;
            return func(...args);
        }
    } as T;
}