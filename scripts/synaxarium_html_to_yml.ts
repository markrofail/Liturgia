import * as fs from "fs";
import * as path from "path";
import * as cheerio from "cheerio";
import { stringify } from "yaml";

const range = (length: number) => Array.from({ length }, (_, i) => i);

const getText = (node: cheerio.Cheerio) => node?.text()?.trim().replaceAll(/\s+/g, " ");

const extractEntry = (html: string) => {
    const $ = cheerio.load(html);
    const headerNode = $(`h1`);

    const commemorations: any[] = [];
    $("h3").each((_, node) => {
        commemorations.push({
            title: getText($(node)),
            text: getText($(node).nextUntil("h3")),
        });
    });

    return { title: getText(headerNode), commemorations };
};

const convertHTMLFilesToYAMLRecursive = (directory: string) => {
    const files = fs.readdirSync(directory);

    files.forEach((file) => {
        const filePath = path.join(directory, file);

        if (file.endsWith(".en.html")) {
            convertHTMLFileToYAML(filePath);
        }
    });
};

const getYmlFilePath = (filepath: string) => {
    const directory = path.dirname(filepath).replace("-raw", "");
    const filename = path.basename(filepath);

    !fs.existsSync(directory) && fs.mkdirSync(directory);
    return `${directory}/${filename.replace(".en.html", ".yml")}`;
};

const convertHTMLFileToYAML = (filePath: string) => {
    const htmlEn = fs.readFileSync(filePath, "utf-8");
    const entryEn = extractEntry(htmlEn);

    const htmlAr = fs.readFileSync(filePath.replace(".en", ".ar"), "utf-8");
    const entryAr = extractEntry(htmlAr);

    const entryUnified = {
        title: {
            english: entryEn.title,
            arabic: entryAr.title,
        },
        commemorations: range(Math.max(entryEn.commemorations.length, entryAr.commemorations.length)).map((i) => ({
            title: {
                english: entryEn.commemorations[i]?.title ?? "",
                arabic: entryAr.commemorations[i]?.title ?? "",
            },
            text: {
                english: entryEn.commemorations[i]?.text ?? "",
                arabic: entryAr.commemorations[i]?.text ?? "",
            },
        })),
    };

    fs.writeFileSync(getYmlFilePath(filePath), stringify(entryUnified));
    console.log(`Conversion completed for: ${filePath}`);
};

const readingsDirectory = path.join(__dirname, "../assets/text/readings");
convertHTMLFilesToYAMLRecursive(readingsDirectory);
// convertHTMLFileToYAML(`${readingsDirectory}/tout-29.en.html`)
