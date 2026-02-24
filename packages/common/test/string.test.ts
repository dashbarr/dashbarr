import { isString, toKebabCase, toSnakeCase, toCamelCase, toPascalCase, toTitleCase } from "../src/string.js";
import { describe, it, expect } from "vitest";

describe("isString", () => {
    it("should return true if the value is a string", () => {
        expect(isString("string")).toBe(true);
    });
    it("should return true if the value is a String object", () => {
        expect(isString(new String("string"))).toBe(true);
    });
    it("should return false if the value is not a string", () => {
        expect(isString(1)).toBe(false);
    });
});

describe("toKebabCase", () => {
    it("should return the kebab-case string", () => {
        expect(toKebabCase("kebab case string")).toBe("kebab-case-string");
    });
});

describe("toSnakeCase", () => {
    it("should return the snake_case string", () => {
        expect(toSnakeCase("snake case string")).toBe("snake_case_string");
    });
});

describe("toCamelCase", () => {
    it("should return the camelCase string", () => {
        expect(toCamelCase("camel case string")).toBe("camelCaseString");
    });
});

describe("toPascalCase", () => {
    it("should return the PascalCase string", () => {
        expect(toPascalCase("pascal case string")).toBe("PascalCaseString");
    });
});

describe("toTitleCase", () => {
    it("should return the Title Case string", () => {
        expect(toTitleCase("title case string")).toBe("Title Case String");
    });
    it("should ignore common words", () => {
        expect(toTitleCase("a title case string")).toBe("A Title Case String");
        expect(toTitleCase("the title case string")).toBe("The Title Case String");
        expect(toTitleCase("and title case string")).toBe("And Title Case String");
        expect(toTitleCase("or title case string")).toBe("Or Title Case String");
        expect(toTitleCase("but title case string")).toBe("But Title Case String");
        expect(toTitleCase("if title case string")).toBe("If Title Case String");
    });
});

describe("robust casing behavior", () => {
    it("should split camelCase and PascalCase boundaries", () => {
        expect(toKebabCase("helloWorld")).toBe("hello-world");
        expect(toKebabCase("HelloWorld")).toBe("hello-world");
    });

    it("should split acronym boundaries", () => {
        expect(toKebabCase("JSONData")).toBe("json-data");
        expect(toPascalCase("JSONData")).toBe("JsonData");
    });

    it("should normalize punctuation/underscores/dashes into single separators", () => {
        expect(toSnakeCase("foo--bar__baz")).toBe("foo_bar_baz");
    });

    it("should split letter/number boundaries", () => {
        expect(toKebabCase("Version2Alpha")).toBe("version-2-alpha");
        expect(toKebabCase("alpha2")).toBe("alpha-2");
    });

    it("should trim and collapse whitespace", () => {
        expect(toKebabCase("   hello   world   ")).toBe("hello-world");
    });
});
