/**
 * Checks if the given value is an array.
 * @param value - The value to check.
 * @returns True if the value is an array, false otherwise.
 */
export const isArray = (value: unknown): value is unknown[] => {
    return Array.isArray(value);
};

/**
 * Checks if the given value is an empty array.
 * @param value - The value to check.
 * @returns True if the value is an empty array, false otherwise.
 */
export const isEmptyArray = (value: unknown): value is unknown[] => {
    return isArray(value) && value.length === 0;
};

/**
 * Checks if the given value is a non-empty array.
 * @param value - The value to check.
 * @returns True if the value is a non-empty array, false otherwise.
 */
export const isNonEmptyArray = (value: unknown): value is unknown[] => {
    return isArray(value) && value.length > 0;
};
