import * as fs from "fs";
import * as path from "path";
import * as cheerio from "cheerio";
import { stringify } from "yaml";

const normalizeArabicText = (text: string) =>
    text.replace(/([^\u0621-\u063A\u0641-\u064A\u0660-\u0669a-zA-Z 0-9\u064B-\u064D:-])/g, "");

const getText = (node: cheerio.Cheerio) => node?.text()?.trim().replaceAll(/\s+/g, " ");

const getTitleAndText = (node: cheerio.Cheerio) => ({
    title: getText(node.nextAll("h5").first()),
    text: getText(node.nextAll(".reading-text").first()),
});

const extractReading = ($: cheerio.Root, text: string) => getTitleAndText($(`a[name=${text}]`));

const extractPsalm = ($: cheerio.Root, text: string) => {
    const headerNode = $(`a[name=${text}]`);
    const psalmNode = headerNode.nextAll('h4:contains("Psalm"), h4:contains("مزمور")').first();
    return getTitleAndText(psalmNode);
};

const extractGospel = ($: cheerio.Root, text: string) => {
    const headerNode = $(`a[name=${text}]`);
    const gospelNode = headerNode.nextAll('h4:contains("Gospel"), h4:contains("الإنجيل")').first();
    return getTitleAndText(gospelNode);
};

const READING_EXTRACTORS = {
    "matins-psalm": ($: cheerio.Root) => extractPsalm($, "matins"),
    "matins-gospel": ($: cheerio.Root) => extractGospel($, "matins"),
    "vespers-psalm": ($: cheerio.Root) => extractPsalm($, "vespers"),
    "vespers-gospel": ($: cheerio.Root) => extractGospel($, "vespers"),
    "liturgy-psalm": ($: cheerio.Root) => extractPsalm($, "liturgy-gospel"),
    "liturgy-gospel": ($: cheerio.Root) => extractGospel($, "liturgy-gospel"),
    "pauline-epistle": ($: cheerio.Root) => extractReading($, "liturgy-pauline"),
    "catholic-epistle": ($: cheerio.Root) => extractReading($, "liturgy-catholic"),
    "acts-of-the-apostles": ($: cheerio.Root) => extractReading($, "liturgy-acts"),
};

const convertHTMLFileToYAML = (filePath: string) => {
    const htmlEn = fs.readFileSync(filePath, "utf-8");
    const cheerioEn = cheerio.load(htmlEn);

    const htmlAr = fs.readFileSync(filePath.replace(".en", ".ar"), "utf-8");
    const cheerioAr = cheerio.load(htmlAr);

    Object.entries(READING_EXTRACTORS).forEach(([readingType, extractReading]) => {
        const readingEn = extractReading(cheerioEn);
        const readingAr = extractReading(cheerioAr);

        const reading = {
            title: { english: readingEn.title, arabic: readingAr.title },
            text: { english: readingEn.text, arabic: normalizeArabicText(readingAr.text) },
        };

        fs.writeFileSync(getYmlFilePath(filePath, readingType), stringify(reading));
    });

    console.log(`Conversion completed for: ${filePath}`);
};

const getYmlFilePath = (filepath: string, prefix: string) => {
    const directory = path.dirname(filepath).replace("-raw", "");
    const filename = path.basename(filepath);

    !fs.existsSync(`${directory}/${prefix}`) && fs.mkdirSync(`${directory}/${prefix}`);
    return `${directory}/${prefix}/${filename.replace(".en.html", ".yml")}`;
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

const readingsDirectory = path.join(__dirname, "../resources-raw/readings");
convertHTMLFilesToYAMLRecursive(readingsDirectory);
