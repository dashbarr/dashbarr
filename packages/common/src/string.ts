/**
 * Checks if the given input is a string.
 * @param input - The input to check.
 * @returns True if the input is a string, false otherwise.
 */
export const isString = (input: unknown): input is string => {
    return typeof input === "string" || input instanceof String;
};

/**
 * Checks if the given string is empty.
 * @param input - The string to check.
 * @returns True if the string is empty, false otherwise.
 */
export const isEmptyString = (input: unknown): input is string => {
    return isString(input) && input.trim() === "";
};

/**
 * Checks if the given string is non-empty.
 * @param input - The string to check.
 * @returns True if the string is non-empty, false otherwise.
 */
export const isNonEmptyString = (input: unknown): input is string => {
    return isString(input) && input.trim() !== "";
};

/**
 * Checks if the given string is a valid package version.
 * @param input - The string to check.
 * @returns True if the string is a valid package version, false otherwise.
 */
export const isPackageVersion = (input: string): input is PackageVersion => {
    return isString(input) && /^[0-9]+\.[0-9]+\.[0-9]+$/.test(input);
};

/**
 * Normalizes a string into a consistent "words" format for casing.
 *
 * Rules:
 * - Inserts spaces at common word boundaries (camelCase, PascalCase, acronym boundaries, letter/number boundaries)
 * - Replaces non-letter/number characters with spaces
 * - Collapses runs of whitespace into a single space
 * - Lowercases and trims
 */
function normalizeString(input: string) {
    // 1) Add spaces at common boundaries before we replace punctuation.
    //    - "JSONData" -> "JSON Data" (acronym boundary)
    //    - "helloWorld" -> "hello World" (camel boundary)
    //    - "Version2Alpha" -> "Version 2 Alpha" (digit/letter boundary)
    const withBoundaries = input
        .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
        .replace(/([a-z\d])([A-Z])/g, "$1 $2")
        .replace(/(\d)([A-Za-z])/g, "$1 $2")
        .replace(/([A-Za-z])(\d)/g, "$1 $2");

    // 2) Replace non-alphanumeric with spaces. Prefer Unicode letters/numbers when available.
    //    This keeps things like "Sébastien" or "宮崎" as letters instead of stripping them.
    let cleaned: string;
    try {
        cleaned = withBoundaries.replace(/[^\p{L}\p{N}]+/gu, " ");
    } catch {
        // Fallback for older runtimes without Unicode property escapes.
        cleaned = withBoundaries.replace(/[^A-Za-z0-9]+/g, " ");
    }

    // 3) Collapse whitespace, lowercase, and trim.
    return cleaned.replace(/\s+/g, " ").toLowerCase().trim();
}

/**
 * Converts a string to kebab-case.
 * @param input - The string to convert.
 * @returns The kebab-case string.
 */
export const toKebabCase = (input: string): string => {
    return normalizeString(input).replace(/ /g, "-");
};

/**
 * Converts a string to snake_case.
 * @param input - The string to convert.
 * @returns The snake_case string.
 */
export const toSnakeCase = (input: string): string => {
    return normalizeString(input).replace(/ /g, "_");
};

/**
 * Converts a string to camelCase.
 * @param input - The string to convert.
 * @returns The camelCase string.
 */
export const toCamelCase = (input: string): string => {
    return normalizeString(input)
        .split(" ")
        .map((word, index) => (index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)))
        .join("");
};

/**
 * Converts a string to PascalCase.
 * @param input - The string to convert.
 * @returns The PascalCase string.
 */
export const toPascalCase = (input: string): string => {
    return normalizeString(input)
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join("");
};

/**
 * Converts a string to Title Case.
 * @param input - The string to convert.
 * @returns The Title Case string.
 */
export const toTitleCase = (input: string): string => {
    return normalizeString(input)
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
};

/**
 * Export the string functions as a default export.
 * @returns {Object} The string functions.
 */
export default {
    isString,
    isEmptyString,
    isNonEmptyString,
    isPackageVersion,
    toKebabCase,
    toSnakeCase,
    toCamelCase,
    toPascalCase,
    toTitleCase
};
