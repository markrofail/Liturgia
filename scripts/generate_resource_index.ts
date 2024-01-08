import * as fs from "fs";
import * as path from "path";
import slugify from "slugify";

const PROJECT_ROOT = path.join(__dirname, "..");
const READINGS_ROOT = path.join(PROJECT_ROOT, "resources");

const generateIndexFile = (directory: string, resources: string[]) => `export default {
${resources.map((file) => `    "${file}": ${generateResourceRecord(directory, file)},`).join("\n")}
};
`;

const generateResourceRecord = (directory: string, file: string) => {
    const absolutePath = path.resolve(PROJECT_ROOT, path.join(directory, `${file}.json`));

    const prefix = path.basename(directory);
    const id = slugify(`${prefix} ${file}`).toLowerCase();

    const { title } = require(absolutePath);
    return `{
        id: "${id}",
        title: ${JSON.stringify(title)},
        content: import("./${file}.json"),
    }`;
};

const indexDirectory = (directoryPath: string) => {
    const resources: string[] = [];

    fs.readdirSync(directoryPath).forEach((file) => {
        const filePath = path.join(directoryPath, file);

        if (fs.statSync(filePath).isDirectory()) {
            indexDirectory(filePath);
        } else if (path.extname(file) === ".json") {
            const filename = path.basename(file, ".json");
            resources.push(filename);
        }
    });

    if (resources.length === 0) {
        return;
    }

    const relativePath = path.relative(PROJECT_ROOT, directoryPath);
    const generatedFile = generateIndexFile(relativePath, resources);
    const outputPath = path.join(directoryPath, "index.ts");
    console.log(`Generated resource map ${outputPath}`);
    fs.writeFileSync(outputPath, generatedFile);
};

indexDirectory(READINGS_ROOT);
