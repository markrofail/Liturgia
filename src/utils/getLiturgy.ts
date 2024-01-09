import { Prayer as Content, MultiLingualText } from "@src/types";
import slugify from "slugify";

export type Prayer = {
    id: string;
    title: MultiLingualText;
    content: Promise<Content>;
};

export type Liturgy = {
    title: MultiLingualText;
    prayers: Prayer[];
}[];

export const getLiturgy = () =>
    flattenData([
        {
            title: { english: "Matins", arabic: "باكر" },
            prayers: Object.values(require("@resources/prayers/liturgy/00-matins").default),
        },
        {
            title: { english: "The Offertory", arabic: "تقديم الحمل" },
            prayers: Object.values(require("@resources/prayers/liturgy/01-offertory-of-the-lamb").default),
        },
        {
            title: { english: "Liturgy Of The Word", arabic: "قداس الكلمة" },
            prayers: Object.values(require("@resources/prayers/liturgy/02-liturgy-of-the-word").default),
        },
        {
            title: { english: "Liturgy Of The Believers", arabic: "قداس المؤمنين" },
            prayers: Object.values(require("@resources/prayers/liturgy/03-liturgy-of-the-believers").default),
        },
        {
            title: { english: "The Distribution of the Holy Mysteries", arabic: "توزيع األسرار" },
            prayers: Object.values(require("@resources/prayers/liturgy/04-distribution").default),
        },
    ]);

type FlatData = ({ type: "title" | "data" } & Partial<Prayer>)[]
export type DataEntry = FlatData[0]

const flattenData = (data: Liturgy) => {
    const result: FlatData = [];
    data.forEach(({ title, prayers }) => {
        result.push({ type: "title" as const, title: title, id: slugify(`${title.english}`) });
        prayers.forEach((element) => result.push({ type: "data" as const, ...element as Prayer }));
    });
    return result;
};
