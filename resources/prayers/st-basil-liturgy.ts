import slugify from "slugify";
import matins from "./matins";

const generatePrayerId = (prefix: string, index: number, prayer: any) =>
    slugify(`${prefix} ${index} ${prayer.title.english}`.toLowerCase());

export default [
    { title: "Matins", prayers: matins },
    // { title: "The Offertory", prayers: matins },
    // { title: "The Liturgy of the Word", prayers: matins },
    // { title: "The Liturgy of the Believers", prayers: matins },
].map(({ title, prayers }) => ({
    title,
    prayers: prayers.map((prayer: any, i: number) => ({ ...prayer, id: generatePrayerId(title, i, prayer) })),
}));
