export type Prayer = {
    title: MultiLingualText;
    sections: PrayerSection[];
};

export type PrayerSection = {
    speaker: Speaker;
    verses: MultiLingualText[];
};

export type Speaker = "priest" | "deacon" | "congregation";

export type MultiLingualText = {
    english?: string;
    arabic?: string;
    coptic?: string;
    coptic_english?: string;
};
