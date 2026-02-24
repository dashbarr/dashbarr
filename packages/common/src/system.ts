import { isNonEmptyString } from "./string";
import prettierConfig from "@dashbarr/prettier";
import prettier from "prettier";
import childProcess from "node:child_process";
import path from "node:path";
import fs from "node:fs";
import os from "node:os";

/**
 * Execute a command asynchronously.
 * @param {string} command The command to execute.
 * @param {childProcess.ExecOptions} options The options to pass to the command.
 * @returns {Promise<string>}
 */
export async function exec(command: string, options: childProcess.ExecOptions = {}): Promise<string> {
    return new Promise((resolve, reject) => {
        childProcess.exec(command, options, (error, stdout, stderr) => {
            error && reject(error);
            stdout && resolve(stdout.toString());
            stderr && reject(stderr);
        });
    });
}

/**
 * Check if a package is installed on the operating system.
 * @param {string} packageName The name of the package to check.
 * @returns {Promise<boolean>}
 */
export async function osPackageInstalled(packageName: string): Promise<boolean> {
    return os.platform() === "win32"
        ? exec(`where ${packageName}`)
              .then(() => true)
              .catch(() => false)
        : exec(`which ${packageName}`)
              .then(() => true)
              .catch(() => false);
}

/**
 * Get the username from the git config.
 * @returns {Promise<string>}
 */
export async function gitUserName(): Promise<string> {
    return exec("git config user.name")
        .then((stdout) => stdout.trim())
        .catch(() => "");
}

/**
 * Get the user email from the git config.
 * @returns {Promise<string>}
 */
export async function gitUserEmail(): Promise<string> {
    return exec("git config user.email")
        .then((stdout) => stdout.trim())
        .catch(() => "");
}

/**
 * Copy a directory.
 * @param {string} source
 * @param {string} destination
 * @param {fs.CopyOptions} options
 * @returns {Promise<void>}
 */
export async function copyDirectory(
    sourcePath: string,
    destinationPath: string,
    options: fs.CopyOptions = { recursive: true }
): Promise<void> {
    await fs.promises.cp(sourcePath, destinationPath, options);
}

/**
 * Get all files in a directory recursively.
 * @param {string} directoryPath
 * @returns {Promise<string[]>}
 */
export async function* directoryFiles(directoryPath: string): AsyncGenerator<string> {
    const files = await fs.promises.readdir(directoryPath, { withFileTypes: true });
    for (const file of files) {
        if (file.isDirectory()) {
            yield* directoryFiles(path.resolve(directoryPath, file.name));
        } else {
            yield path.resolve(directoryPath, file.name);
        }
    }
}

/**
 * List the sub-directories in a directory.
 * @param directoryPath The path to the directory to list the directories of.
 * @returns {Promise<string[]>} The names of the directories in the directory.
 */
export async function listDirectories(directoryPath: string): Promise<string[]> {
    const files = await fs.promises.readdir(directoryPath, { withFileTypes: true });
    return files.filter((file) => file.isDirectory()).map((file) => file.name);
}

/**
 * List the files in a directory.
 * @param directoryPath The path to the directory to list the files of.
 * @returns {Promise<string[]>} The names of the files in the directory.
 */
export async function listFiles(directoryPath: string): Promise<string[]> {
    const files = await fs.promises.readdir(directoryPath, { withFileTypes: true });
    return files.filter((file) => !file.isDirectory()).map((file) => file.name);
}

/**
 * Read a file from the file system.
 * @param filePath The path to the file to read.
 * @returns {Promise<string>} The content of the file.
 */
export async function readFile(filePath: string): Promise<string> {
    return fs.promises.readFile(filePath, "utf8");
}

/**
 * Write a file to the file system.
 * @param filePath The path to the file to write.
 * @param content The content to write to the file.
 * @param fileParser The parser to use to format the content.
 * @returns {Promise<void>}
 * @param parser
 */
export async function writeFile(filePath: string, content: string, parser?: prettier.BuiltInParserName): Promise<void> {
    if (isNonEmptyString(parser)) {
        const formattedContent = await prettier.format(content, { parser, ...prettierConfig });
        await fs.promises.writeFile(filePath, formattedContent);
        return;
    }

    const fileInfo = await prettier.getFileInfo(filePath);
    const fileParser = fileInfo.inferredParser ?? parser;
    const formattedContent = await prettier.format(content, { parser: fileParser, ...prettierConfig });
    await fs.promises.writeFile(filePath, formattedContent);
}

/**
 * Rename a file.
 * @param filePath The path to the file to rename.
 * @param newName The new name of the file.
 * @returns {Promise<void>}
 */
export async function renameFile(filePath: string, newName: string): Promise<void> {
    await fs.promises.rename(filePath, newName);
}

/**
 * Read a JSON file.
 * @template T The type of the JSON data to parse.
 * @param filePath The path to the JSON file to read.
 * @returns {Promise<T>} The JSON data from the file.
 */
export async function readJsonFile<T = unknown>(filePath: string): Promise<T> {
    try {
        const content = await readFile(filePath);
        return JSON.parse(content) as T;
    } catch (error) {
        throw new Error(`Failed to read JSON file ${filePath}: ${error}`);
    }
}

/**
 * Write data to a JSON file.
 * @template T The type of the data to write.
 * @param filePath The path to the JSON file to write.
 * @param data The data to write to the JSON file.
 * @returns {Promise<void>}
 */
export async function writeJsonFile<T = unknown>(filePath: string, data: T): Promise<void> {
    await writeFile(filePath, JSON.stringify(data, null, prettierConfig.tabWidth), "json");
}

/**
 * Read a package.json file.
 * @param filePath The path to the package.json file to read.
 * @returns {Promise<PackageJson>} The package.json data from the file.
 */
export async function readPackageJson(filePath: string): Promise<PackageJson> {
    return readJsonFile<PackageJson>(filePath);
}

/**
 * Update a package.json file.
 * @param filePath The path to the package.json file to update.
 * @param data The data to update the package.json file with.
 * @returns {Promise<void>}
 */
export async function updatePackageJson(filePath: string, data: Partial<PackageJson>): Promise<void> {
    const packageJson = await readJsonFile<PackageJson>(filePath);
    await writeJsonFile(filePath, { ...packageJson, ...data });
}

/**
 * Export the system functions as a default export.
 * @returns {Object} The system functions.
 */
export default {
    exec,
    osPackageInstalled,
    gitUserName,
    gitUserEmail,
    copyDirectory,
    directoryFiles,
    listDirectories,
    listFiles,
    readFile,
    writeFile,
    renameFile,
    readJsonFile,
    writeJsonFile,
    readPackageJson,
    updatePackageJson
};
