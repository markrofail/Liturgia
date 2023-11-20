import { MutableRefObject } from "react";
import { View } from "react-native";

export type Liturgy = LiturgyPart[];

export type LiturgyPart = {
    title: string;
    prayers: Prayer[];
};

export type Prayer = {
    id: string;
    prayerRef?: PrayerRef;
    title: MultiLingualText;
    sections: PrayerSection[];
};

export type PrayerRef = MutableRefObject<View | undefined>;

export type PrayerSection = {
    speaker: Speaker;
    verses: MultiLingualText[];
};

export type Speaker = "priest" | "deacon" | "people";

export type MultiLingualText = {
    english?: string;
    arabic?: string;
    coptic?: string;
    coptic_english?: string;
};
