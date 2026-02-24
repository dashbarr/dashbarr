import type { Plugin } from "postcss";

export default {
    postcssPlugin: "strip-tailwindcss-comment",
    Once(root) {
        root.walkComments((comment) => {
            if (comment.text.startsWith("! tailwindcss")) {
                comment.remove();
            }
        });
    }
} satisfies Plugin;
