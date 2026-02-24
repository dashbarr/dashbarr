import * as datetime from "./datetime.js";
import * as github from "./github.js";

export default {
    ...datetime,
    ...github
} as const;
