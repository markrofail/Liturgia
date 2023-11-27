export type Liturgy = LiturgyPart[];

export type LiturgyPart = {
    title: string;
    prayers: Prayer[];
};

export type Prayer = {
    id: string;
    title: MultiLingualText;
    sections: PrayerSection[];
};

export type PrayerSection = {
    speaker?: Speaker;
    verses: MultiLingualText[];
};

export type Speaker = "priest" | "deacon" | "people" | "reader";

export type MultiLingualText = {
    english?: string;
    arabic?: string;
    coptic?: string;
    coptic_english?: string;
};
