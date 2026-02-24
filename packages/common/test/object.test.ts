import { isObject, isEmptyObject, isNonEmptyObject, objectKeys } from "../src/object.js";
import { describe, it, expect } from "vitest";

describe("isObject", () => {
    it("should return true if the value is an object", () => {
        expect(isObject({})).toBe(true);
    });
});

describe("isEmptyObject", () => {
    it("should return true if the value is an empty object", () => {
        expect(isEmptyObject({})).toBe(true);
    });
});

describe("isNonEmptyObject", () => {
    it("should return true if the value is a non-empty object", () => {
        expect(isNonEmptyObject({ a: 1 })).toBe(true);
    });
});

describe("objectKeys", () => {
    it("should return the keys of the object", () => {
        expect(objectKeys({ a: 1, b: 2 })).toEqual(["a", "b"]);
    });
});
