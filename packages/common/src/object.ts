/**
 * Checks if the given value is an object.
 * @param value - The value to check.
 * @returns True if the value is an object, false otherwise.
 */
export const isObject = (value: unknown): value is Record<string, unknown> => {
    return typeof value === "object" && value !== null && !Array.isArray(value);
};

/**
 * Checks if the given value is an empty object.
 * @param value - The value to check.
 * @returns True if the value is an empty object, false otherwise.
 */
export const isEmptyObject = (value: unknown): value is Record<string, unknown> => {
    return isObject(value) && Object.keys(value).length === 0;
};

/**
 * Checks if the given value is a non-empty object.
 * @param value - The value to check.
 * @returns True if the value is a non-empty object, false otherwise.
 */
export const isNonEmptyObject = (value: unknown): value is Record<string, unknown> => {
    return isObject(value) && Object.keys(value).length > 0;
};

/**
 * Returns the keys of the given object.
 * @param obj - The object to get the keys of.
 * @returns The keys of the object.
 */
export function objectKeys<TObject extends object>(obj: TObject): (keyof TObject)[] {
    return Object.keys(obj) as (keyof TObject)[];
}
