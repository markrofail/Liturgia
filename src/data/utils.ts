import slugify from "slugify";

const generatePrayerId = (prefix: string, prayer: any) => {
    if (!prayer.title) console.log(prefix, JSON.stringify(prayer))
    return slugify(`${prefix} ${prayer.title.english}`.toLowerCase());
}

export const generatePrayerIds = (liturgy: { title: string, prayers: any[] }[]) => liturgy.map(({ title, prayers }, i1) => ({
    title,
    prayers: prayers.map((prayer: any, i2) => ({ ...prayer, id: generatePrayerId(`${i1} ${title} ${i2}`, prayer) })),
}));
