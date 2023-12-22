import * as fs from "fs";
import * as path from "path";
import * as cheerio from "cheerio";
import { stringify } from "yaml";

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

const extractReadings = (html: string) => {
    const $ = cheerio.load(html);

    const matinsPsalm = extractPsalm($, "matins");
    const matinsGospel = extractGospel($, "matins");
    const vespersPsalm = extractPsalm($, "vespers");
    const vespersGospel = extractGospel($, "vespers");
    const liturgyPsalm = extractPsalm($, "liturgy-gospel");
    const liturgyGospel = extractGospel($, "liturgy-gospel");
    const paulineEpistle = extractReading($, "liturgy-pauline");
    const catholicEpistle = extractReading($, "liturgy-catholic");
    const actsOfTheApostles = extractReading($, "liturgy-acts");

    return {
        matinsPsalm,
        matinsGospel,
        vespersPsalm,
        vespersGospel,
        liturgyPsalm,
        liturgyGospel,
        paulineEpistle,
        catholicEpistle,
        actsOfTheApostles,
    };
};

const normalizeArabicText = (text: string) =>
    text.replace(/([^\u0621-\u063A\u0641-\u064A\u0660-\u0669a-zA-Z 0-9\u064B-\u064D])/g, "");

type Reading = { title: string; text: string };
const unifyLanguages = (en: Reading, ar: Reading) => ({
    title: { english: en.title, arabic: normalizeArabicText(ar.title) },
    text: { english: en.text, arabic: normalizeArabicText(ar.text) },
});

const convertHTMLFileToYAML = (filePath: string) => {
    const htmlEn = fs.readFileSync(filePath, "utf-8");
    const readingsEn = extractReadings(htmlEn);

    const htmlAr = fs.readFileSync(filePath.replace(".en", ".ar"), "utf-8");
    const readingsAr = extractReadings(htmlAr);

    const readingsUnified = {
        matinsPsalm: unifyLanguages(readingsEn.matinsPsalm, readingsAr.matinsPsalm),
        matinsGospel: unifyLanguages(readingsEn.matinsGospel, readingsAr.matinsGospel),
        vespersPsalm: unifyLanguages(readingsEn.vespersPsalm, readingsAr.vespersPsalm),
        vespersGospel: unifyLanguages(readingsEn.vespersGospel, readingsAr.vespersGospel),
        liturgyPsalm: unifyLanguages(readingsEn.liturgyPsalm, readingsAr.liturgyPsalm),
        liturgyGospel: unifyLanguages(readingsEn.liturgyGospel, readingsAr.liturgyGospel),
        paulineEpistle: unifyLanguages(readingsEn.paulineEpistle, readingsAr.paulineEpistle),
        catholicEpistle: unifyLanguages(readingsEn.catholicEpistle, readingsAr.catholicEpistle),
        actsOfTheApostles: unifyLanguages(readingsEn.actsOfTheApostles, readingsAr.actsOfTheApostles),
    };

    fs.writeFileSync(getYmlFilePath(filePath, "matins-psalm"), stringify(readingsUnified.matinsPsalm));
    fs.writeFileSync(getYmlFilePath(filePath, "matins-gospel"), stringify(readingsUnified.matinsGospel));
    fs.writeFileSync(getYmlFilePath(filePath, "vespers-psalm"), stringify(readingsUnified.vespersPsalm));
    fs.writeFileSync(getYmlFilePath(filePath, "vespers-gospel"), stringify(readingsUnified.vespersGospel));
    fs.writeFileSync(getYmlFilePath(filePath, "liturgy-psalm"), stringify(readingsUnified.liturgyPsalm));
    fs.writeFileSync(getYmlFilePath(filePath, "liturgy-gospel"), stringify(readingsUnified.liturgyGospel));
    fs.writeFileSync(getYmlFilePath(filePath, "pauline-epistle"), stringify(readingsUnified.paulineEpistle));
    fs.writeFileSync(getYmlFilePath(filePath, "catholic-epistle"), stringify(readingsUnified.catholicEpistle));
    fs.writeFileSync(getYmlFilePath(filePath, "acts-of-the-apostles"), stringify(readingsUnified.actsOfTheApostles));

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
