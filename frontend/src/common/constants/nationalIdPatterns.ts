import { Country, NationalIdPatterns } from "../../typings";

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
    },
    JP: { // Japan (My Number)
        regex: /^[0-9]{12}$/,
        example: "123456789012",
        label: "Japanese My Number (12 digits)"
    },
    KR: { // South Korea (Resident Registration Number)
        regex: /^[0-9]{6}-[0-9]{7}$/,
        mask: (value: string) => {
            const nums = value.replace(/-/g, '').substring(0, 13);
            if (nums.length <= 6) return nums;
            return `${nums.substring(0, 6)}-${nums.substring(6, 13)}`;
        },
        example: "123456-1234567",
        label: "Korean Resident Registration Number"
    },
    SA: { // Saudi Arabia (National ID)
        regex: /^[0-9]{10}$/,
        example: "1234567890",
        label: "Saudi National ID (10 digits)"
    },
    EG: { // Egypt (National ID)
        regex: /^[0-9]{14}$/,
        example: "12345678901234",
        label: "Egyptian National ID (14 digits)"
    },
    LY: { // Libya (National ID)
        regex: /^[0-9]{12}$/,
        example: "123456789012",
        label: "Libyan National ID (12 digits)"
    },
    TN: { // Tunisia (National ID)
        regex: /^[0-9]{8}$/,
        example: "12345678",
        label: "Tunisian National ID (8 digits)"
    },
    MA: { // Morocco (CIN)
        regex: /^[A-Z]{1,2}[0-9]{6}$/,
        example: "A123456",
        label: "Moroccan Carte Nationale d'Identité"
    },
    DZ: { // Algeria (National ID)
        regex: /^[0-9]{10}$/,
        example: "1234567890",
        label: "Algerian National ID (10 digits)"
    },
    OM: { // Oman (Civil ID)
        regex: /^[0-9]{11}$/,
        example: "12345678901",
        label: "Omani Civil ID (11 digits)"
    },
    AE: { // United Arab Emirates (Emirates ID)
        regex: /^[0-9]{15}$/,
        example: "123456789012345",
        label: "UAE Emirates ID (15 digits)"
    },
    BH: { // Bahrain (CPR)
        regex: /^[0-9]{9}$/,
        example: "123456789",
        label: "Bahraini CPR (9 digits)"
    },
    QA: { // Qatar (QID)
        regex: /^[0-9]{11}$/,
        example: "12345678901",
        label: "Qatari ID (11 digits)"
    },
    IQ: { // Iraq (National ID)
        regex: /^[0-9]{10}$/,
        example: "1234567890",
        label: "Iraqi National ID (10 digits)"
    },
    KW: { // Kuwait (Civil ID)
        regex: /^[0-9]{12}$/,
        example: "123456789012",
        label: "Kuwaiti Civil ID (12 digits)"
    },
    YE: { // Yemen (National ID)
        regex: /^[0-9]{9}$/,
        example: "123456789",
        label: "Yemeni National ID (9 digits)"
    },
    MY: { // Malaysia (MyKAD)
        regex: /^[0-9]{12}$/,
        example: "123456789012",
        label: "Malaysian MyKAD (12 digits)"
    },
    ID: { // Indonesia (NIK - Nomor Induk Kependudukan)
        regex: /^[0-9]{16}$/,
        example: "1234567890123456",
        label: "Indonesian NIK (16 digits)"
    },
    VN: { // Vietnam (CCCD - Citizen ID)
        regex: /^[0-9]{12}$/,
        example: "123456789012",
        label: "Vietnamese CCCD (12 digits)"
    },
    BD: { // Bangladesh (NID - National ID)
        regex: /^[0-9]{10}$|^[0-9]{13}$|^[0-9]{17}$/,
        example: "1234567890",
        label: "Bangladeshi NID (10, 13, or 17 digits)"
    },
    PK: { // Pakistan (CNIC - Computerized National ID)
        regex: /^[0-9]{5}-[0-9]{7}-[0-9]{1}$/,
        mask: (value: string) => {
            const nums = value.replace(/-/g, '').substring(0, 13);
            if (nums.length <= 5) return nums;
            if (nums.length <= 12) return `${nums.substring(0, 5)}-${nums.substring(5)}`;
            return `${nums.substring(0, 5)}-${nums.substring(5, 12)}-${nums.substring(12, 13)}`;
        },
        example: "12345-1234567-1",
        label: "Pakistani CNIC (13 digits with hyphens)"
    },
    IN: { // India (Aadhaar)
        regex: /^[0-9]{12}$/,
        example: "123456789012",
        label: "Indian Aadhaar (12 digits)"
    },
    SG: { // Singapore (NRIC/FIN)
        regex: /^[STFG][0-9]{7}[A-Z]$/,
        mask: (value: string) => {
            let cleaned = value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
            if (cleaned.length > 0) {
                const firstChar = cleaned.match(/[STFG]/)?.[0] || '';
                const remaining = cleaned.substring(1).replace(/[^0-9]/g, '');
                cleaned = firstChar + remaining.substring(0, 7);
                if (cleaned.length === 8) {
                    cleaned += cleaned[0] === 'S' || cleaned[0] === 'T' ? 'A' : 'F';
                }
            }
            return cleaned.substring(0, 9);
        },
        example: "S1234567A",
        label: "Singapore NRIC/FIN"
    },
    CN: { // China (Resident ID Card)
        regex: /^[0-9]{17}[0-9X]$/,
        mask: (value: string) => {
            const nums = value.replace(/[^0-9Xx]/g, '').toUpperCase();
            return nums.substring(0, 18);
        },
        example: "12345620000101123X",
        label: "Chinese Resident ID (18 digits, last may be X)"
    },
    IR: { // Iran (National ID)
        regex: /^[0-9]{10}$/,
        example: "1234567890",
        label: "Iranian National ID (10 digits)"
    },
    RU: { // Russia (SNILS/INN)
        regex: /^[0-9]{11}$|^[0-9]{3}-[0-9]{3}-[0-9]{3} [0-9]{2}$/,
        mask: (value: string) => {
            const nums = value.replace(/[^0-9]/g, '').substring(0, 11);
            if (nums.length <= 3) return nums;
            if (nums.length <= 6) return `${nums.substring(0, 3)}-${nums.substring(3)}`;
            if (nums.length <= 9) return `${nums.substring(0, 3)}-${nums.substring(3, 6)}-${nums.substring(6)}`;
            return `${nums.substring(0, 3)}-${nums.substring(3, 6)}-${nums.substring(6, 9)} ${nums.substring(9, 11)}`;
        },
        example: "123-456-789 01",
        label: "Russian SNILS (11 digits, formatted)"
    },
        FR: { // France (Numéro INSEE / NIR)
        regex: /^[1-3][0-9]{2}(0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])(2[AB]|[0-9]{3})[0-9]{3}[0-9]{2}$/,
        example: "1880812345678",
        label: "French INSEE Number (15 digits)",
        mask: (value: string) => {
            const nums = value.replace(/[^0-9AB]/g, '').toUpperCase();
            if (nums.length <= 13) return nums;
            return `${nums.substring(0, 13)} ${nums.substring(13, 15)}`;
        }
    },
    ES: { // Spain (DNI/NIE)
        regex: /^([XYZ][0-9]{7}[A-Z]|[0-9]{8}[A-Z])$/,
        example: "12345678Z",
        label: "Spanish DNI/NIE (8 digits + letter or X/Y/Z + 7 digits + letter)",
        mask: (value: string) => {
            let cleaned = value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
            if (cleaned.length > 8) {
                cleaned = cleaned.substring(0, 8) + cleaned.substring(8, 9);
            }
            return cleaned;
        }
    },
    PT: { // Portugal (NIF)
        regex: /^[0-9]{9}$/,
        example: "123456789",
        label: "Portuguese NIF (9 digits)"
    },
    IE: { // Ireland (PPS Number)
        regex: /^[0-9]{7}[A-Z]{1,2}$/,
        example: "1234567A",
        label: "Irish PPS Number (7 digits + 1-2 letters)"
    },
    BA: { // Bosnia (JMBG)
        regex: /^[0-9]{13}$/,
        example: "0101990123456",
        label: "Bosnian JMBG (13 digits)"
    },
    TR: { // Türkiye (TCKN)
        regex: /^[0-9]{11}$/,
        example: "12345678901",
        label: "Turkish TCKN (11 digits)"
    },
    HU: { // Hungary (TAJ)
        regex: /^[0-9]{3} [0-9]{3} [0-9]{3}$/,
        mask: (value: string) => {
            const nums = value.replace(/[^0-9]/g, '').substring(0, 9);
            if (nums.length <= 3) return nums;
            if (nums.length <= 6) return `${nums.substring(0, 3)} ${nums.substring(3)}`;
            return `${nums.substring(0, 3)} ${nums.substring(3, 6)} ${nums.substring(6, 9)}`;
        },
        example: "123 456 789",
        label: "Hungarian TAJ Number (9 digits, spaced)"
    },
        NG: { // Nigeria (NIN - National Identification Number)
        regex: /^[0-9]{11}$/,
        example: "12345678901",
        label: "Nigerian NIN (11 digits)"
    },
    GH: { // Ghana (Ghana Card)
        regex: /^GHA-[0-9]{9}-[0-9]$/,
        mask: (value: string) => {
            const nums = value.replace(/[^0-9]/g, '').substring(0, 10);
            if (nums.length <= 9) return `GHA-${nums}`;
            return `GHA-${nums.substring(0, 9)}-${nums.substring(9, 10)}`;
        },
        example: "GHA-123456789-1",
        label: "Ghana Card ID (GHA-9 digits-1)"
    },
    CM: { // Cameroon (CNI - National Identity Card)
        regex: /^[0-9]{8,12}$/,
        example: "123456789012",
        label: "Cameroonian CNI (8-12 digits)"
    },
    CG: { // Congo (Numéro d'Identification Nationale)
        regex: /^[0-9]{12}$/,
        example: "123456789012",
        label: "Congolese National ID (12 digits)"
    },
    ZA: { // South Africa (ID Number)
        regex: /^[0-9]{13}$/,
        example: "9001011234082",
        label: "South African ID (13 digits with birth date)",
        mask: (value: string) => {
            const nums = value.replace(/[^0-9]/g, '').substring(0, 13);
            if (nums.length <= 6) return nums;
            if (nums.length <= 10) return `${nums.substring(0, 6)} ${nums.substring(6)}`;
            return `${nums.substring(0, 6)} ${nums.substring(6, 10)} ${nums.substring(10, 13)}`;
        }
    },
    AO: { // Angola (Bilhete de Identidade)
        regex: /^[A-Z]{2}[0-9]{6}[A-Z]{2}$/,
        example: "AB123456CD",
        label: "Angolan ID (2 letters + 6 digits + 2 letters)"
    },
    BF: { // Burkina Faso (CNIB - Carte Nationale d'Identité Burkinabè)
        regex: /^[0-9]{12}$/,
        example: "123456789012",
        label: "Burkinabè CNIB (12 digits)"
    },
    NE: { // Niger (Numéro d'Identification Nationale)
        regex: /^[0-9]{10}$/,
        example: "1234567890",
        label: "Nigerien National ID (10 digits)"
    },
    ML: { // Mali (NINA - Numéro d'Identification Nationale)
        regex: /^[0-9]{13}$/,
        example: "1234567890123",
        label: "Malian NINA (13 digits)"
    },
    BR: { // Brazil (CPF/CNPJ)
        regex: /^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}-?[0-9]{2}|[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}-?[0-9]{2})$/,
        mask: (value: string) => {
            const nums = value.replace(/[^0-9]/g, '');
            if (nums.length <= 11) { // CPF
                if (nums.length <= 3) return nums;
                if (nums.length <= 6) return `${nums.substring(0, 3)}.${nums.substring(3)}`;
                if (nums.length <= 9) return `${nums.substring(0, 3)}.${nums.substring(3, 6)}.${nums.substring(6)}`;
                return `${nums.substring(0, 3)}.${nums.substring(3, 6)}.${nums.substring(6, 9)}-${nums.substring(9, 11)}`;
            } else { // CNPJ
                if (nums.length <= 2) return nums;
                if (nums.length <= 5) return `${nums.substring(0, 2)}.${nums.substring(2)}`;
                if (nums.length <= 8) return `${nums.substring(0, 2)}.${nums.substring(2, 5)}.${nums.substring(5)}`;
                if (nums.length <= 12) return `${nums.substring(0, 2)}.${nums.substring(2, 5)}.${nums.substring(5, 8)}/${nums.substring(8)}`;
                return `${nums.substring(0, 2)}.${nums.substring(2, 5)}.${nums.substring(5, 8)}/${nums.substring(8, 12)}-${nums.substring(12, 14)}`;
            }
        },
        example: "123.456.789-09 or 12.345.678/0001-90",
        label: "Brazilian CPF (individual) or CNPJ (company)"
    },
    MX: { // Mexico (CURP/RFC)
        regex: /^([A-Z]{4}[0-9]{6}[A-Z]{6}[0-9A-Z]{2}|[A-Z]{4}[0-9]{6}[A-Z0-9]{3})$/,
        mask: (value: string) => {
            const cleaned = value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
            if (cleaned.length <= 18) { // CURP
                return cleaned.substring(0, 18);
            } else { // RFC
                return cleaned.substring(0, 13);
            }
        },
        example: "MEXA880101HDFRRL09 or MEXA880101P12",
        label: "Mexican CURP (18 chars) or RFC (10-13 chars)"
    },
    PA: { // Panama (Cédula)
        regex: /^[A-Z0-9]{2}-[0-9]{4}-[0-9]{4}$/,
        mask: (value: string) => {
            const nums = value.replace(/[^A-Z0-9]/g, '').toUpperCase();
            if (nums.length <= 2) return nums;
            if (nums.length <= 6) return `${nums.substring(0, 2)}-${nums.substring(2)}`;
            return `${nums.substring(0, 2)}-${nums.substring(2, 6)}-${nums.substring(6, 10)}`;
        },
        example: "PE-1234-5678",
        label: "Panamanian Cédula (PE-1234-5678 format)"
    },
    PE: { // Peru (DNI)
        regex: /^[0-9]{8}$/,
        example: "12345678",
        label: "Peruvian DNI (8 digits)"
    },
    UY: { // Uruguay (CI)
        regex: /^[0-9]{1,3}\.[0-9]{3}\.[0-9]{3}-[0-9]$/,
        mask: (value: string) => {
            const nums = value.replace(/[^0-9]/g, '');
            if (nums.length <= 1) return nums;
            if (nums.length <= 4) return `${nums.substring(0, 1)}.${nums.substring(1)}`;
            if (nums.length <= 7) return `${nums.substring(0, 1)}.${nums.substring(1, 4)}.${nums.substring(4)}`;
            return `${nums.substring(0, 1)}.${nums.substring(1, 4)}.${nums.substring(4, 7)}-${nums.substring(7, 8)}`;
        },
        example: "1.234.567-8",
        label: "Uruguayan CI (dotted format with check digit)"
    },
    CO: { // Colombia (Cédula)
        regex: /^[0-9]{8,10}$/,
        example: "1234567890",
        label: "Colombian Cédula (8-10 digits)"
    },
    VE: { // Venezuela (Cédula)
        regex: /^[VEJPG][0-9]{3,8}$/,
        mask: (value: string) => {
            const cleaned = value.replace(/[^VEJPGvejpg0-9]/g, '').toUpperCase();
            return cleaned.substring(0, 9);
        },
        example: "V12345678",
        label: "Venezuelan Cédula (V/E/J/P/G + 3-8 digits)"
    },
    AU: { // Australia (TFN - Tax File Number)
        regex: /^[0-9]{8,9}$/,
        example: "123456789",
        label: "Australian Tax File Number (8-9 digits)",
        mask: (value: string) => {
            return value.replace(/[^0-9]/g, '').substring(0, 9);
        }
    },
    NZ: { // New Zealand (IRD Number)
        regex: /^[0-9]{8,9}$/,
        example: "12345678",
        label: "New Zealand IRD Number (8-9 digits)",
        mask: (value: string) => {
            const nums = value.replace(/[^0-9]/g, '').substring(0, 9);
            // Format as 00-000-000 for 8 digits or 000-000-000 for 9 digits
            if (nums.length <= 3) return nums;
            if (nums.length <= 6) return `${nums.substring(0, 3)}-${nums.substring(3)}`;
            return `${nums.substring(0, 3)}-${nums.substring(3, 6)}-${nums.substring(6)}`;
        }
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

