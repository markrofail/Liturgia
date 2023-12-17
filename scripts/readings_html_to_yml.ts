import * as fs from "fs";
import * as path from "path";
import * as cheerio from "cheerio";
import { stringify } from "yaml";

const getText = (node: cheerio.Cheerio) => node?.text()?.trim().replaceAll(/\s+/g, " ");

const extractLiturgyReading = ($: cheerio.Root, text: string) => {
    const headerNode = $(`a[name=${text}]`);

    return {
        title: getText(headerNode.nextAll("h5")),
        text: getText(headerNode.nextAll(".reading-text")),
    };
};

const extractPsalmAndGospel = ($: cheerio.Root, text: string) => {
    const headerNode = $(`a[name=${text}]`);

    const psalmNode = headerNode.nextAll('h4:contains("Psalm"), h4:contains("مزمور")').first();
    const psalm = {
        title: getText(psalmNode.nextAll("h5").first()),
        text: getText(psalmNode.nextAll(".reading-text").first()),
    };

    const gospelNode = headerNode.nextAll('h4:contains("Gospel"), h4:contains("الإنجيل")').first();
    const gospel = {
        title: getText(gospelNode.nextAll("h5").first()),
        text: getText(gospelNode.nextAll(".reading-text").first()),
    };

    return { psalm, gospel };
};

const extractReadings = (html: string) => {
    const $ = cheerio.load(html);
    const matins = extractPsalmAndGospel($, "matins");

    const vespers = extractPsalmAndGospel($, "vespers");

    const paulineEpistle = extractLiturgyReading($, "liturgy-pauline");
    const catholicEpistle = extractLiturgyReading($, "liturgy-catholic");
    const actsOfTheApostles = extractLiturgyReading($, "liturgy-acts");
    const { psalm, gospel } = extractPsalmAndGospel($, "liturgy-gospel");
    const liturgy = { paulineEpistle, catholicEpistle, actsOfTheApostles, psalm, gospel };

    return { matins, vespers, liturgy };
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

const unifyLanguages = (dataEn: any, dataAr: any) => {
    return {
        title: {
            english: dataEn.title,
            arabic: dataAr.title,
        },
        text: {
            english: dataEn.text,
            arabic: dataAr.text,
        },
    };
};

const getYmlFilePath = (filepath: string, prefix: string) => {
    const directory = path.dirname(filepath).replace("-raw", "");
    const filename = path.basename(filepath);

    !fs.existsSync(`${directory}/${prefix}`) && fs.mkdirSync(`${directory}/${prefix}`);
    return `${directory}/${prefix}/${filename.replace(".en.html", ".yml")}`;
};
const convertHTMLFileToYAML = (filePath: string) => {
    const htmlEn = fs.readFileSync(filePath, "utf-8");
    const readingsEn = extractReadings(htmlEn);

    const htmlAr = fs.readFileSync(filePath.replace(".en", ".ar"), "utf-8");
    const readingsAr = extractReadings(htmlAr);

    const readingsUnified = {
        matins: {
            psalm: unifyLanguages(readingsEn.matins.psalm, readingsAr.matins.psalm),
            gospel: unifyLanguages(readingsEn.matins.gospel, readingsAr.matins.gospel),
        },
        vespers: {
            psalm: unifyLanguages(readingsEn.vespers.psalm, readingsAr.vespers.psalm),
            gospel: unifyLanguages(readingsEn.vespers.gospel, readingsAr.vespers.gospel),
        },
        liturgy: {
            psalm: unifyLanguages(readingsEn.liturgy.psalm, readingsAr.liturgy.psalm),
            gospel: unifyLanguages(readingsEn.liturgy.gospel, readingsAr.liturgy.gospel),
            paulineEpistle: unifyLanguages(readingsEn.liturgy.paulineEpistle, readingsAr.liturgy.paulineEpistle),
            catholicEpistle: unifyLanguages(readingsEn.liturgy.catholicEpistle, readingsAr.liturgy.catholicEpistle),
            actsOfTheApostles: unifyLanguages(
                readingsEn.liturgy.actsOfTheApostles,
                readingsAr.liturgy.actsOfTheApostles
            ),
        },
    };

    fs.writeFileSync(getYmlFilePath(filePath, "matins-psalm"), stringify(readingsUnified.matins.psalm));
    fs.writeFileSync(getYmlFilePath(filePath, "matins-gospel"), stringify(readingsUnified.matins.gospel));
    fs.writeFileSync(getYmlFilePath(filePath, "vespers-psalm"), stringify(readingsUnified.vespers.psalm));
    fs.writeFileSync(getYmlFilePath(filePath, "vespers-gospel"), stringify(readingsUnified.vespers.gospel));
    fs.writeFileSync(getYmlFilePath(filePath, "liturgy-psalm"), stringify(readingsUnified.liturgy.psalm));
    fs.writeFileSync(getYmlFilePath(filePath, "liturgy-gospel"), stringify(readingsUnified.liturgy.gospel));
    fs.writeFileSync(getYmlFilePath(filePath, "pauline-epistle"), stringify(readingsUnified.liturgy.paulineEpistle));
    fs.writeFileSync(getYmlFilePath(filePath, "catholic-epistle"), stringify(readingsUnified.liturgy.catholicEpistle));
    fs.writeFileSync(
        getYmlFilePath(filePath, "acts-of-the-apostles"),
        stringify(readingsUnified.liturgy.actsOfTheApostles)
    );

    console.log(`Conversion completed for: ${filePath}`);
};

const readingsDirectory = path.join(__dirname, "../assets-raw/text/readings");
convertHTMLFilesToYAMLRecursive(readingsDirectory);
