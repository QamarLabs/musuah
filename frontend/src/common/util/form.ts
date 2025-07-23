import { Country, NationalIdPatterns } from "../../typings.d";


export const validateEmail = (value: string) => {
    // Basic email validation regex
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(value)) {
        return "Please enter a valid email address";
    }
};


export const nationalIdPatterns: NationalIdPatterns = {
    JO: { // Jordan
        regex: /^[0-9]{10}$/,
        example: "1234567890",
        label: "Jordanian National Number (10 digits)"
    },
    US: { // United States (SSN)
        regex: /^[0-9]{3}-[0-9]{2}-[0-9]{4}$/,
        mask: (value: string) => {
            const nums = value.replace(/-/g, '').substring(0, 9);
            if (nums.length <= 3) return nums;
            if (nums.length <= 5) return `${nums.substring(0, 3)}-${nums.substring(3)}`;
            return `${nums.substring(0, 3)}-${nums.substring(3, 5)}-${nums.substring(5, 9)}`;
        },
        example: "123-45-6789",
        label: "US Social Security Number"
    },
    UK: { // United Kingdom (NINO)
        regex: /^[A-Z]{2}[0-9]{6}[A-Z]$/,
        mask: (value: string) => {
            // Convert to uppercase and remove non-alphanumeric characters
            let cleaned = value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
            if (cleaned.length > 0) {
                // First 2 characters must be letters
                const letters = cleaned.match(/[A-Z]{0,2}/)?.[0] || '';
                const remaining = cleaned.substring(letters.length).replace(/[^0-9]/g, '');
                cleaned = letters + remaining;
            }
            return cleaned.substring(0, 9); // Max length for UK NINO
        },
        example: "AB123456C",
        label: "UK National Insurance Number"
    },
    DE: { // Germany (Steueridentifikationsnummer)
        regex: /^[0-9]{11}$/,
        example: "12345678901",
        label: "German Tax ID (11 digits)"
    }
};

export const validateNationalId = (country: Country, value: string): string | undefined => {
    if (!value) return undefined;

    const pattern = nationalIdPatterns![country];
    if (!pattern.regex.test(value)) {
        return `Please enter a valid ${pattern.label} (e.g. ${pattern.example})`;
    }
    return undefined;
};