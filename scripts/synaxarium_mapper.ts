import * as fs from "fs";
import * as path from "path";

const generateAssetsMap = (): Record<string, string> => {
    const assetsDir = path.join(__dirname, "../assets/text/readings/synaxarium");
    const files = fs.readdirSync(assetsDir);

    const result: Record<string, string> = {};
    files.forEach((file) => {
        if (path.extname(file) === ".json") {
            const key = path.basename(file, ".json");
            result[key] = `../../assets/text/readings/synaxarium/${file}`;
        }
    });

    return result;
};

// Example usage
const assetsJson = generateAssetsMap();
console.log(assetsJson);
fs.writeFileSync("./readings_map.json", JSON.stringify(assetsJson, null, 2));
