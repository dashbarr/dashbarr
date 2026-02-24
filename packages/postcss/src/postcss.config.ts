import type { Config } from "postcss-load-config";

export default {
    plugins: {
        "@tailwindcss/postcss": {},
        "@dashbarr/postcss/strip-tailwindcss-comment": {}
    }
} satisfies Config;
