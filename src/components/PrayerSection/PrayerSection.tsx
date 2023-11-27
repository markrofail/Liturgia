import React from "react";
import { Text } from "react-native-paper";
import { View } from "react-native";
import { Verse } from "../Verse";
import { PrayerSection as PrayerSectionT, Speaker } from "../../types";
import { ZOOM_MULTIPLIER } from "../../constants";

interface PrayerSectionProps extends PrayerSectionT {}

export const PrayerSection = ({ speaker, verses }: PrayerSectionProps) => {
    return (
        <View style={{ marginBottom: 15 * ZOOM_MULTIPLIER }}>
            {!!speaker && <SpeakerText speaker={speaker} />}
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
        reader: { english: "Reader", arabic: "القارئ", color: "yellow" },
        people: { english: "People", arabic: "الشعب", color: "orange" },
    };
    const { english, arabic, color } = textMap[speaker];

    return (
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 * ZOOM_MULTIPLIER }}>
            <Text
                variant="titleMedium"
                style={{ color, fontFamily: "OpenSans_700Bold", fontSize: 18 * ZOOM_MULTIPLIER }}
            >
                {english}
            </Text>
            <Text
                variant="titleMedium"
                style={{ color, textAlign: "right", fontFamily: "Rubik_700Bold", fontSize: 22 * ZOOM_MULTIPLIER }}
            >
                {arabic}
            </Text>
        </View>
    );
};
