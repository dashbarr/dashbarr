import { isString } from "./string.js";

/**
 * Checks if the given value is a URL.
 * @param input - The value to check.
 * @returns True if the value is a URL, false otherwise.
 */
export const isValidUrlString = (input: string): input is URLString => {
    return isString(input) && /^https?:\/\//.test(input);
};

/**
 * Removes a trailing slash from a path.
 * @param path - The path to remove the trailing slash from.
 * @returns The path without the trailing slash.
 */
export function removeTrailingSlash(input: string): string {
    return input.at(-1) === "/" ? input.substring(0, input.length - 1) : input;
}
