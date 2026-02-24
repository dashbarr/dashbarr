#!/usr/bin/env bun

/**
 * Update the integrations.ts file in the integrations package.
 * This script is used to update the integrations.ts file in the integrations package
 * when a new integration is created or when a new version of an integration is released.
 */

import system from "@dashbarr/common/system";
import handlebars from "handlebars";
import path from "node:path";
import url from "node:url";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TEMPLATES_DIR = path.join(__dirname, "..", "generators", "templates");
const INTEGRATIONS_PACKAGE_DIR = path.join(__dirname, "..", "packages", "integrations");
const INTEGRATIONS_PLUGINS_DIR = path.join(__dirname, "..", "plugins", "integrations");

async function main() {
    // Map of integration names to their dependencies.
    const integrations = new Array<string>();

    // Get the list of available integrations.
    for (const integration of await system.listDirectories(INTEGRATIONS_PLUGINS_DIR)) {
        // Path to the integration package.json file.
        const packageJsonPath = path.join(INTEGRATIONS_PLUGINS_DIR, integration, "package.json");

        // Read the integration package.json file.
        const packageJson = await system.readPackageJson(packageJsonPath);

        // Add the integration to the dependencies map.
        integrations.push(packageJson.name);
    }

    // Update the dependencies in the integrations package.
    await system.updatePackageJson(path.join(INTEGRATIONS_PACKAGE_DIR, "package.json"), {
        dependencies: Object.fromEntries(integrations.map((name) => [name, "workspace:*"]))
    });

    // Install the dependencies in the integrations package.
    await system.exec(`bun install`, { cwd: INTEGRATIONS_PACKAGE_DIR });

    // Compile the integrations template.
    const integrationsTemplate = await system.readFile(path.join(TEMPLATES_DIR, "integrations.ts.hbs"));
    const compiled = handlebars.compile(integrationsTemplate);
    const result = compiled({ integrations });
    await system.writeFile(path.join(INTEGRATIONS_PACKAGE_DIR, "src", "integrations.ts"), result, "typescript");
}

main();
