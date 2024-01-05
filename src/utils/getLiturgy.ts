import MatinsIndex from "@resources/prayers/liturgy/00-matins"
import TheOffertoryIndex from "@resources/prayers/liturgy/01-offertory-of-the-lamb"
import LiturgyOfTheWordIndex from "@resources/prayers/liturgy/02-liturgy-of-the-word"
import LiturgyOfTheBelieversIndex from "@resources/prayers/liturgy/03-liturgy-of-the-believers"
import DistributionIndex from "@resources/prayers/liturgy/04-distribution"
import { Prayer } from "@/types";
import slugify from "slugify";

type RawPrayer = Omit<Prayer, "id">
type Index = Record<string, Promise<RawPrayer>>

export const generatePrayerIds = (prefix: string, index: Index) =>
    Object.entries(index).map(([filename, content]) => ({
        id: slugify(`${prefix} ${filename}`).toLowerCase(),
        content
    }))

export const getLiturgy = () => {
    return [
        { "title": "Matins", prayers: generatePrayerIds("0-matins", MatinsIndex as Index) },
        { "title": "The Offertory", prayers: generatePrayerIds("01-offertory-of-the-lamb", TheOffertoryIndex as Index) },
        { "title": "Liturgy Of The Word", prayers: generatePrayerIds("02-liturgy-of-the-word", LiturgyOfTheWordIndex as Index) },
        { "title": "Liturgy Of The Believers", prayers: generatePrayerIds("03-liturgy-of-the-believers", LiturgyOfTheBelieversIndex as Index) },
        { "title": "Distribution", prayers: generatePrayerIds("04-distribution", DistributionIndex as Index) }
    ]
};

