import React from "react";
import { Text } from "react-native-paper";
import { View } from "react-native";
import { MultiLingualText, Prayer as PrayerT } from "../../types";
import { PrayerSection } from "../PrayerSection";

interface PrayerProps extends PrayerT {}

export const Prayer = ({ title, prayerRef, sections }: PrayerProps) => {
    return (
        <View ref={prayerRef} style={{ marginBottom: 25 }}>
            <PrayerTitle title={title} />
            {sections.map((section, i) => (
                <PrayerSection key={i} {...section} />
            ))}
        </View>
    );
};

const PrayerTitle = ({ title: { english, arabic, coptic } }: { title: MultiLingualText }) => {
    const text = [english, coptic, arabic].filter((str) => !!str).join(" :: ");
    return (
        <Text variant="headlineLarge" style={{ textAlign: "center", marginBottom: 20 }}>
            {text}
        </Text>
    );
};
