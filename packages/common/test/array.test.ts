import { isArray, isEmptyArray, isNonEmptyArray } from "../src/array.js";
import { describe, it, expect } from "vitest";

describe("isArray", () => {
    it("should return true if the value is an empty array", () => {
        expect(isArray([])).toBe(true);
    });
    it("should return true if the value is a non-empty array", () => {
        expect(isArray([1])).toBe(true);
    });
    it("should return false if the value is not an array", () => {
        expect(isArray(1)).toBe(false);
    });
    it("should return false if the value is undefined", () => {
        expect(isArray(undefined)).toBe(false);
    });
});

describe("isEmptyArray", () => {
    it("should return true if the value is an empty array", () => {
        expect(isEmptyArray([])).toBe(true);
    });
});

describe("isNonEmptyArray", () => {
    it("should return true if the value is a non-empty array", () => {
        expect(isNonEmptyArray([1])).toBe(true);
    });
});
