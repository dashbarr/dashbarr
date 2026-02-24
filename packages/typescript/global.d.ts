export {};
declare global {
    type URLString = `https://${string}` | `http://${string}`;

    type PackageVersion = `${number}.${number}.${number}`;

    interface PackageJson {
        name: string;
        displayName?: string;
        description?: string;
        version: PackageVersion;
        author?: {
            name: string;
            email: string;
        };
        homepage?: string;
        repository?: string;
        bugs?: string;
        license?: string;
        keywords?: string[];
        dependencies?: Record<string, string>;
        devDependencies?: Record<string, string>;
        peerDependencies?: Record<string, string>;
        optionalDependencies?: Record<string, string>;
        bundledDependencies?: string[];
        scripts?: Record<string, string>;
    }
}
