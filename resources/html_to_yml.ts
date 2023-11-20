import * as fs from "fs";
import * as cheerio from "cheerio";

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
        const speaker = getText($(row).find(".englishtext > p > b")).toLowerCase();

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
`
    )
    .join("")}
`
    )
    .join("")}
`;

    return yamlContent;
};

const htmlFilePath = "resources/prayers/matins/thanksgiving-prayer.html";
const htmlContent = fs.readFileSync(htmlFilePath, "utf-8");
const parsedData = parseHTML(htmlContent);

const outputYamlFilePath = htmlFilePath.replace("html", "yml");
const yamlContent = convertToYAML(parsedData);
fs.writeFileSync(outputYamlFilePath, yamlContent);
