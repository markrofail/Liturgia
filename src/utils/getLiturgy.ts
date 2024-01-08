import { Prayer as Content } from "@src/types";

export type Prayer = {
    id: string;
    title: { english: string; arabic: string };
    content: Promise<Content>;
};

export type Liturgy = {
    title: string;
    prayers: Prayer[];
}[];

export const getLiturgy = () => {
    return [
        { title: "Matins", prayers: Object.values(require("@resources/prayers/liturgy/00-matins").default) },
        {
            title: "The Offertory",
            prayers: Object.values(require("@resources/prayers/liturgy/01-offertory-of-the-lamb").default),
        },
        {
            title: "Liturgy Of The Word",
            prayers: Object.values(require("@resources/prayers/liturgy/02-liturgy-of-the-word").default),
        },
        {
            title: "Liturgy Of The Believers",
            prayers: Object.values(require("@resources/prayers/liturgy/03-liturgy-of-the-believers").default),
        },
        {
            title: "Distribution",
            prayers: Object.values(require("@resources/prayers/liturgy/04-distribution").default),
        },
    ] as Liturgy;
};
