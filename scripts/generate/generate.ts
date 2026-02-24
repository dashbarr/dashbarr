#!/usr/bin/env bun

import { select, input } from "@inquirer/prompts";
import string from "@dashbarr/common/string";
import system from "@dashbarr/common/system";
import cli from "ts-command-line-args";
import handlebars from "handlebars";
import path from "node:path";
import url from "node:url";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// const SCRIPTS_DIR = path.join(__dirname, "..", "scripts");
const PACKAGES_DIR = path.join(__dirname, "..", "..", "packages");

const DEFAULT_PLUGIN_VERSION = "0.1.0";

const args = cli.parse({
    integration: { type: Boolean, defaultValue: false },
    theme: { type: Boolean, defaultValue: false },
    widget: { type: Boolean, defaultValue: false },
    name: { type: String, defaultValue: "" },
    version: { type: String, defaultValue: DEFAULT_PLUGIN_VERSION },
    authorName: { type: String, defaultValue: await system.gitUserName() },
    authorEmail: { type: String, defaultValue: await system.gitUserEmail() }
});

async function main() {
    // Determine the plugin type if provided as a flag.
    let pluginType = args.integration ? "integration" : args.theme ? "theme" : args.widget ? "widget" : "";

    // Ensure a plugin type is specified.
    if (!args.integration && !args.theme && !args.widget) {
        pluginType = await select({
            message: "What type of plugin do you want to create?",
            choices: [
                { name: "Integration", value: "integration" },
                { name: "Theme", value: "theme" },
                { name: "Widget", value: "widget" }
            ]
        });
    }

    if (!args.name) {
        args.name = await input({
            message: `What is the name of the ${pluginType}?`
        });
    }

    if (!string.isPackageVersion(args.version)) {
        console.error("");
        console.error("Invalid package version");
        console.error("Package version must follow semantic versioning (e.g. 1.0.0)");
        process.exit(1);
    }

    const inputPath = path.join(__dirname, pluginType, "template");
    const outputPath = path.join(PACKAGES_DIR, `${pluginType}s`, "src", string.toKebabCase(args.name));
    await system.copyDirectory(inputPath, outputPath);

    const packageName = `@dashbarr-${pluginType}/${string.toKebabCase(args.name)}`;

    for await (const file of system.directoryFiles(outputPath)) {
        if (file.endsWith(".hbs")) {
            const newFileName = file.replace(".hbs", "");
            const template = await system.readFile(file);
            const compiled = handlebars.compile(template);
            const result = compiled({
                package: {
                    name: packageName,
                    displayName: string.toTitleCase(args.name),
                    version: args.version,
                    author: {
                        name: args.authorName,
                        email: args.authorEmail
                    }
                },
                plugin: {
                    type: pluginType,
                    name: args.name,
                    displayName: string.toTitleCase(args.name),
                    className: string.toPascalCase(args.name)
                }
            });
            await system.renameFile(file, newFileName);
            await system.writeFile(newFileName, result);
        }
    }

    // await system.exec(`bun install`, { cwd: outputPath });
    // await system.exec(`bun run --filter ${packageName} build`, { cwd: outputPath });
}

main();
