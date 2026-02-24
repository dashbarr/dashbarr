import type { Config } from "prettier";

export default {
    tabWidth: 4,
    useTabs: false,
    singleQuote: false,
    trailingComma: "none",
    printWidth: 120,
    arrowParens: "always",
    bracketSpacing: true,
    semi: true,
    singleAttributePerLine: true,
    quoteProps: "as-needed",
    endOfLine: "lf",
    htmlWhitespaceSensitivity: "css",
    overrides: [
        {
            files: ["*.yaml", "*.yml"],
            options: {
                tabWidth: 2
            }
        }
    ]
} satisfies Config;
