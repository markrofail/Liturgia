import React from "react";
import { View, Text } from "react-native";
import { Verse } from "../Verse";
import { PrayerSection as PrayerSectionT, Speaker } from "../../types";

interface PrayerSectionProps extends PrayerSectionT {}

export const PrayerSection = ({ speaker, verses }: PrayerSectionProps) => {
    return (
        <View>
            <SpeakerText speaker={speaker} />
            {verses.map((verse, i) => (
                <Verse key={i} verse={verse} />
            ))}
        </View>
    );
};

const SpeakerText = ({ speaker }: { speaker: Speaker }) => {
    return <Text>{speaker === "priest" ? "Priest" : speaker === "deacon" ? "Deacon" : "Congregation"}</Text>;
};
