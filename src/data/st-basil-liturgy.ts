import { generatePrayerIds } from "./utils";
import { Prayer } from "../types";

type Part = { title: string; prayers: Prayer[] };
const matins: Part = {
    title: "Matins",
    prayers: [
        require("../../resources/prayers/00-matins/01-our-father.json"),
        require("../../resources/prayers/00-matins/02-thanksgiving-prayer.json"),
        require("../../resources/prayers/00-matins/03-verses-of-the-cymbals.json"),
        require("../../resources/prayers/00-matins/04-litany-of-the-sick.json"),
        require("../../resources/prayers/00-matins/05-litany-of-the-travelers.json"),
        require("../../resources/prayers/00-matins/06-praise-of-the-angels.json"),
        require("../../resources/prayers/00-matins/07-the-trisagion.json"),
        require("../../resources/prayers/00-matins/08-our-father.json"),
        require("../../resources/prayers/00-matins/09-doxologies-intro.json"),
        require("../../resources/prayers/00-matins/10-doxologies-st-mary.json"),
        require("../../resources/prayers/00-matins/11-doxologies-archangel-michael.json"),
        require("../../resources/prayers/00-matins/12-doxologies-st-pishoy-and-st-paul.json"),
        require("../../resources/prayers/00-matins/13-doxologies-conclusion.json"),
        require("../../resources/prayers/00-matins/14-introduction-to-the-creed.json"),
        require("../../resources/prayers/00-matins/15-the-orthodox-creed.json"),
        require("../../resources/prayers/00-matins/16-o-god-have-mercy-upon-us.json"),
        require("../../resources/prayers/00-matins/17-litany-of-the-gospel.json"),
        require("../../resources/prayers/00-matins/18-the-psalm-and-gospel.json"),
        require("../../resources/prayers/00-matins/19-the-gospel-response.json"),
        require("../../resources/prayers/00-matins/20-the-five-short-litanies.json"),
        require("../../resources/prayers/00-matins/21-litany-of-peace.json"),
        require("../../resources/prayers/00-matins/22-litany-of-the-fathers.json"),
        require("../../resources/prayers/00-matins/23-litany-of-the-place.json"),
        require("../../resources/prayers/00-matins/24-litany-of-the-seeds-and-herbs.json"),
        require("../../resources/prayers/00-matins/25-litany-of-assemblies.json"),
        require("../../resources/prayers/00-matins/26-our-father.json"),
        require("../../resources/prayers/00-matins/27-absolution-to-the-son.json"),
        require("../../resources/prayers/00-matins/28-concluding-hymn.json"),
        require("../../resources/prayers/00-matins/29-the-short-blessing.json"),
        require("../../resources/prayers/00-matins/30-our-father.json"),
    ],
};

const theOffertory: Part = {
    title: "The Offertory",
    prayers: [
        require("../../resources/prayers/01-offertory-of-the-lamb/00-our-father.json"),
        require("../../resources/prayers/01-offertory-of-the-lamb/01-introduction-to-the-creed.json"),
        require("../../resources/prayers/01-offertory-of-the-lamb/02-the-orthodox-creed.json"),
        require("../../resources/prayers/01-offertory-of-the-lamb/03-procession-of-the-lamb.json"),
        require("../../resources/prayers/01-offertory-of-the-lamb/04-lord-have-mercy.json"),
        require("../../resources/prayers/01-offertory-of-the-lamb/05-holy-holy-holy.json"),
        require("../../resources/prayers/01-offertory-of-the-lamb/06-alleluia-fai-be-pi.json"),
        require("../../resources/prayers/01-offertory-of-the-lamb/07-khen-efran.json"),
        require("../../resources/prayers/01-offertory-of-the-lamb/08-thanksgiving-prayer.json"),
        require("../../resources/prayers/01-offertory-of-the-lamb/09-absolution-of-the-servants.json"),
    ],
};

const liturgyOfTheWord: Part = {
    title: "The Liturgy of the Word",
    prayers: [
        require("../../resources/prayers/02-liturgy-of-the-word/01-tai-shori.json"),
        require("../../resources/prayers/02-liturgy-of-the-word/02-hiten-ne-epresvia.json"),
        require("../../resources/prayers/02-liturgy-of-the-word/03-pauline-epistle.json"),
        require("../../resources/prayers/02-liturgy-of-the-word/04-catholic-epistile.json"),
        require("../../resources/prayers/02-liturgy-of-the-word/05-praxis-response.json"),
        require("../../resources/prayers/02-liturgy-of-the-word/06-praxis.json"),
        require("../../resources/prayers/02-liturgy-of-the-word/07-synaxarion.json"),
        require("../../resources/prayers/02-liturgy-of-the-word/08-the-trisagion.json"),
        require("../../resources/prayers/02-liturgy-of-the-word/09-litany-of-the-gospel.json"),
        require("../../resources/prayers/02-liturgy-of-the-word/10-psalm-and-gospel.json"),
    ],
};

const liturgyOfTheBelievers: Part = {
    title: "The Liturgy of the Believers",
    prayers: [
        require("../../resources/prayers/03-liturgy-of-the-believers/01-gospel-response.json"),
        require("../../resources/prayers/03-liturgy-of-the-believers/02-three-great-litanies.json"),
        require("../../resources/prayers/03-liturgy-of-the-believers/03-litany-of-peace.json"),
        require("../../resources/prayers/03-liturgy-of-the-believers/04-litany-of-the-fathers.json"),
        require("../../resources/prayers/03-liturgy-of-the-believers/05-litany-fo-the-assemblies.json"),
        require("../../resources/prayers/03-liturgy-of-the-believers/06-the-orthodox-creed.json"),
        require("../../resources/prayers/03-liturgy-of-the-believers/07-prayer-of-reconciliation.json"),
        require("../../resources/prayers/03-liturgy-of-the-believers/08-anaphora.json"),
        require("../../resources/prayers/03-liturgy-of-the-believers/10-institution-narrative.json"),
        require("../../resources/prayers/03-liturgy-of-the-believers/12-litany-of-peace.json"),
        require("../../resources/prayers/03-liturgy-of-the-believers/13-litany-of-the-fathers.json"),
        require("../../resources/prayers/03-liturgy-of-the-believers/14-litany-of-the-clergy.json"),
        require("../../resources/prayers/03-liturgy-of-the-believers/15-litany-of-mercy.json"),
        require("../../resources/prayers/03-liturgy-of-the-believers/16-litany-of-the-place.json"),
        require("../../resources/prayers/03-liturgy-of-the-believers/17-litany-of-the-seeds-and-the-hebs.json"),
        require("../../resources/prayers/03-liturgy-of-the-believers/18-litany-of-the-oblations.json"),
        require("../../resources/prayers/03-liturgy-of-the-believers/19-commemoration-of-the-saints.json"),
        require("../../resources/prayers/03-liturgy-of-the-believers/20-those-o-lord.json"),
        require("../../resources/prayers/03-liturgy-of-the-believers/21-lead-us.json"),
        require("../../resources/prayers/03-liturgy-of-the-believers/22-introduction-to-fractions.json"),
        require("../../resources/prayers/03-liturgy-of-the-believers/23-the-prayers-of-the-fractions.json"),
        require("../../resources/prayers/03-liturgy-of-the-believers/24-fraction-advent-nativity.json"),
        require("../../resources/prayers/03-liturgy-of-the-believers/25-our-father.json"),
        require("../../resources/prayers/03-liturgy-of-the-believers/26-absolution-to-the-father.json"),
        require("../../resources/prayers/03-liturgy-of-the-believers/27-the-confession.json"),
    ],
};

const distribution: Part = {
    title: "Distribution",
    prayers: [
        require("../../resources/prayers/04-distribution/01-introduction.json"),
        require("../../resources/prayers/04-distribution/02-psalm-150.json"),
        require("../../resources/prayers/04-distribution/03-our-father-who-art-in-heaven.json"),
        require("../../resources/prayers/04-distribution/04-our-savior-called-upon-us.json"),
    ],
};

export default generatePrayerIds([matins, theOffertory, liturgyOfTheWord, liturgyOfTheBelievers, distribution]);
