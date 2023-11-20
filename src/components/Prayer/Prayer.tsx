import React, { forwardRef } from "react";
import { Text } from "react-native-paper";
import { LayoutChangeEvent, View } from "react-native";
import { MultiLingualText, Prayer as PrayerT } from "../../types";
import { PrayerSection } from "../PrayerSection";

interface PrayerProps extends PrayerT {
    onLayout?: (event: LayoutChangeEvent) => void;
}

export const Prayer = forwardRef(({ onLayout, title, sections }: PrayerProps, ref) => {
    return (
        <View ref={ref} style={{ marginBottom: 25 }} onLayout={onLayout}>
            <PrayerTitle title={title} />

            {sections.map((section, i) => (
                <PrayerSection key={i} {...section} />
            ))}
        </View>
    );
});

const PrayerTitle = ({ title: { english, arabic, coptic } }: { title: MultiLingualText }) => {
    const text = [english, coptic, arabic].filter((str) => !!str).join(" :: ");
    return (
        <Text variant="headlineLarge" style={{ textAlign: "center", marginBottom: 20 }}>
            {text}
        </Text>
    );
};
