import React from "react";
import { Text } from "react-native-paper";
import { View } from "react-native";
import { Verse } from "../Verse";
import { PrayerSection as PrayerSectionT, Speaker } from "../../types";

interface PrayerSectionProps extends PrayerSectionT {}

export const PrayerSection = ({ speaker, verses }: PrayerSectionProps) => {
    return (
        <View style={{ marginBottom: 10 }}>
            <SpeakerText speaker={speaker} />
            {verses.map((verse, i) => (
                <Verse key={i} verse={verse} />
            ))}
        </View>
    );
};

const SpeakerText = ({ speaker }: { speaker: Speaker }) => {
    const textMap: Record<Speaker, { english: string; arabic: string; color: string }> = {
        priest: { english: "Priest", arabic: "الكاهن", color: "#ff4000" },
        deacon: { english: "Deacon", arabic: "الشماس", color: "yellow" },
        people: { english: "People", arabic: "الشعب", color: "orange" },
    };
    const { english, arabic, color } = textMap[speaker];

    return (
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ color }} variant="titleMedium">
                {english}
            </Text>
            <Text style={{ color, textAlign: "right", fontFamily: "Rubik_400Regular" }} variant="titleMedium">
                {arabic}
            </Text>
        </View>
    );
};
