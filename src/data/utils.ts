import slugify from "slugify";
import { Prayer } from "../types";

const generatePrayerId = (prefix: string, prayer: any) => {
    if (!prayer.title) console.log(prefix, JSON.stringify(prayer));
    return slugify(`${prefix} ${prayer.title.english}`.toLowerCase());
};

export const generatePrayerIds = (
    liturgy: { title: string; prayers: Prayer[] }[]
): { title: string; prayers: Prayer[] }[] =>
    liturgy.map(({ title, prayers }, i1) => ({
        title,
        prayers: prayers.map((prayer: any, i2) => ({
            ...prayer,
            id: generatePrayerId(`${i1} ${title} ${i2}`, prayer),
        })),
    }));
