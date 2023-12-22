import * as fs from "fs";
import * as path from "path";

const PROJECT_ROOT = path.join(__dirname, "..");
const READINGS_ROOT = path.join(PROJECT_ROOT, "resources/readings");

const getSubDirectories = (directory: string) =>
    fs
        .readdirSync(directory)
        .map((filepath) => path.join(directory, filepath))
        .filter((filepath) => fs.statSync(filepath).isDirectory());

const getResources = (directory: string) =>
    fs
        .readdirSync(directory)
        .filter((file) => path.extname(file) === ".json")
        .map((file) => path.basename(file, ".json"));

const generateIndexFile = (directory: string, resources: string[]) => `export default {
${resources.map((file) => `    "${file}": () => require("@${directory}/${file}.json"),`).join("\n")}
};`;

const subDirectories = getSubDirectories(READINGS_ROOT);
subDirectories.forEach((subDir) => {
    const relative = path.relative(PROJECT_ROOT, subDir);
    const resources = getResources(subDir);
    const generatedFile = generateIndexFile(relative, resources);

    const outputPath = path.join(subDir, "index.ts");
    console.log(`Generated resource map ${outputPath}`);
    fs.writeFileSync(outputPath, generatedFile);
});
