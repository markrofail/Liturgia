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
    const textMap: Record<Speaker, { text: string; color: string }> = {
        priest: { text: "Priest", color: "#ff4000" },
        deacon: { text: "Deacon", color: "yellow" },
        congregation: { text: "Congregation", color: "orange" },
    };
    const { text, color } = textMap[speaker];

    return (
        <Text style={{ color }} variant="titleMedium">
            {text}
        </Text>
    );
};
