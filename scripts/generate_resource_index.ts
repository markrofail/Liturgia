import * as fs from "fs";
import * as path from "path";

const PROJECT_ROOT = path.join(__dirname, "..");
const READINGS_ROOT = path.join(PROJECT_ROOT, "resources");

const generateIndexFile = (resources: string[]) => `export default {
${resources.map((file) => `    "${file}": import("./${file}.json"),`).join("\n")}
};
`;

const indexDirectory = (directoryPath: string) => {
    const resources: string[] = []

    fs.readdirSync(directoryPath).forEach((file) => {
        const filePath = path.join(directoryPath, file)

        if (fs.statSync(filePath).isDirectory()) {
            indexDirectory(filePath)
        } else if (path.extname(file) === ".json") {
            const filename = path.basename(file, ".json")
            resources.push(filename)
        }
    })

    if (resources.length === 0) {
        return
    }

    const generatedFile = generateIndexFile(resources);
    const outputPath = path.join(directoryPath, "index.ts");
    console.log(`Generated resource map ${outputPath}`);
    fs.writeFileSync(outputPath, generatedFile);
}

indexDirectory(READINGS_ROOT)
