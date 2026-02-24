import { isValidUrlString, removeTrailingSlash } from "../src/url.js";
import { describe, it, expect } from "vitest";

describe("isValidUrlString", () => {
    it("should return true if the input is a valid URL string", () => {
        expect(isValidUrlString("https://www.example.com")).toBe(true);
    });
    it("should return false if the input is not a valid URL string", () => {
        expect(isValidUrlString("www.example.com")).toBe(false);
    });
});

describe("removeTrailingSlash", () => {
    it("should return the URL without the trailing slash", () => {
        expect(removeTrailingSlash("https://www.example.com/")).toBe("https://www.example.com");
    });
});
