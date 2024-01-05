import MatinsIndex from "@resources/prayers/liturgy/00-matins"
import TheOffertoryIndex from "@resources/prayers/liturgy/01-offertory-of-the-lamb"
import LiturgyOfTheWordIndex from "@resources/prayers/liturgy/02-liturgy-of-the-word"
import LiturgyOfTheBelieversIndex from "@resources/prayers/liturgy/03-liturgy-of-the-believers"
import DistributionIndex from "@resources/prayers/liturgy/04-distribution"
import { Prayer } from "@/types";
import slugify from "slugify";

type RawPrayer = Omit<Prayer, "id">

const generatePrayerId = (prefix: string, prayer: RawPrayer) => {
    if (!prayer.title) console.log(prefix, JSON.stringify(prayer));
    return slugify(`${prefix} ${prayer.title.english}`.toLowerCase());
};

export const generatePrayerIds = (prefix: string, prayers: RawPrayer[]): Prayer[] =>
    prayers.map((prayer, i) => ({
        ...prayer,
        id: generatePrayerId(`${prefix} ${i}`, prayer),
    }));

export const getLiturgy = async () => {
    return [
        { "title": "Matins", prayers: generatePrayerIds("0-matins", await Promise.all(Object.values(MatinsIndex)) as RawPrayer[]) },
        { "title": "The Offertory", prayers: generatePrayerIds("1-offertory-of-the-lamb", await Promise.all(Object.values(TheOffertoryIndex)) as RawPrayer[]) },
        { "title": "Liturgy Of The Word", prayers: generatePrayerIds("2-liturgy-of-the-word", await Promise.all(Object.values(LiturgyOfTheWordIndex)) as RawPrayer[]) },
        { "title": "Liturgy Of The Believers", prayers: generatePrayerIds("3-liturgy-of-the-believers", await Promise.all(Object.values(LiturgyOfTheBelieversIndex)) as RawPrayer[]) },
        { "title": "Distribution", prayers: generatePrayerIds("4-distribution", await Promise.all(Object.values(DistributionIndex)) as RawPrayer[]) }
    ]
};
