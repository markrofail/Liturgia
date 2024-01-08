import * as fs from "fs";
import * as cheerio from "cheerio";
import path = require("path");

interface Verse {
    english: string;
    coptic: string;
    coptic_english: string;
    arabic: string;
}

interface Section {
    speaker: string;
    verses: Verse[];
}

interface Prayer {
    title: {
        english: string;
        arabic: string;
    };
    sections: Section[];
}

const getText = (element: cheerio.Cheerio, last?: boolean) =>
    (!last ? element.contents().first() : element.contents().last()).text().replaceAll(":", "").trim();

const parseHTML = (html: string): Prayer => {
    const $ = cheerio.load(html);
    const sections: Section[] = [];

    const children = $("#hymntext > div").children();
    for (let i = 0; i < children.length; i++) {
        const row = $(children[i]);

        let speaker = getText($(row).find(".englishtext > p > b")).toLowerCase() ?? "";
        if (!speaker && i === 0) speaker = '""';

        const english = getText($(row).find(".englishtext > p"), true);
        const coptic = getText($(row).find(".coptictext_utf8 > p"), true);
        const coptic_english = "";
        const arabic = getText($(row).find(".arabictext > p"), true);

        const verse = { english, coptic, coptic_english, arabic };
        if (!speaker) {
            const lastSection = sections.pop();
            if (lastSection) {
                lastSection.verses.push(verse);
                sections.push(lastSection);
            }
        } else {
            sections.push({ speaker, verses: [verse] });
        }
    }

    const title = { english: getText($("h1")), arabic: getText($("h1 > .arabictext")) };
    return { title, sections };
};

const convertToYAML = (data: Prayer): string => {
    const yamlContent = `
title:
  english: "${data.title.english}"
  arabic: "${data.title.arabic}"
sections:
${data.sections
    .map(
        (section) => `
  - speaker: ${section.speaker}
    verses:
${section.verses
    .map(
        (verse) => `
      - english: "${verse.english.replace(/"/g, '\\"')}"
        coptic: "${verse.coptic.replace(/"/g, '\\"')}"
        coptic_english: "${verse.coptic_english.replace(/"/g, '\\"')}"
        arabic: "${verse.arabic.replace(/"/g, '\\"')}"
`,
    )
    .join("")}
`,
    )
    .join("")}
`;

    return yamlContent;
};

// Function to change the filename suffix
const changeFileSuffix = (filePath: string, newSuffix: string) => {
    const { dir, name } = path.parse(filePath);
    const newFileName = `${name}${newSuffix}`;
    const newPath = path.join(dir, newFileName);
    return newPath;
};

// Function to recursively scan a directory for HTML files and convert to YAML
const convertHTMLFilesToYAMLRecursive = (directory: string) => {
    const files = fs.readdirSync(directory);

    files.forEach((file) => {
        const filePath = path.join(directory, file);
        const isDirectory = fs.statSync(filePath).isDirectory();

        if (isDirectory) {
            // Recursively scan the subdirectory
            convertHTMLFilesToYAMLRecursive(filePath);
        } else if (file.endsWith(".html")) {
            convertHTMLFileToYAML(filePath);
        }
    });
};

const convertHTMLFileToYAML = (filePath: string) => {
    const htmlContent = fs.readFileSync(filePath, "utf-8");
    const parsedData = parseHTML(htmlContent);

    const yamlContent = convertToYAML(parsedData);
    const newYamlFilePath = changeFileSuffix(filePath, ".yml");
    fs.writeFileSync(newYamlFilePath, yamlContent);

    console.log(`Conversion completed for: ${filePath}`);
};

// Run the conversion for the current directory
convertHTMLFilesToYAMLRecursive(__dirname);
// convertHTMLFileToYAML();
