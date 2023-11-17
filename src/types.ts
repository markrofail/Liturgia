import { MutableRefObject } from "react";
import { View } from "react-native";

export type Liturgy = LiturgyPart[]

export type LiturgyPart = {
    title: string;
    prayers: Prayer[];
};

export type Prayer = {
    title: MultiLingualText;
    prayerRef: PrayerRef,
    sections: PrayerSection[];
};

export type PrayerRef = MutableRefObject<View | undefined>;

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
