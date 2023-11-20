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
    return (
        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginBottom: 20 }}>
            {english && (
                <Text variant="headlineLarge" style={{ fontFamily: "OpenSans_700Bold" }}>
                    {english}
                </Text>
            )}
            {coptic && (
                <>
                    <Text variant="headlineLarge"> :: </Text>
                    <Text
                        variant="headlineLarge"
                        style={{ fontFamily: "NotoSansCoptic_400Regular", fontWeight: "bold" }}
                    >
                        {coptic}
                    </Text>
                </>
            )}
            {arabic && (
                <>
                    <Text variant="headlineLarge"> :: </Text>
                    <Text variant="headlineLarge" style={{ fontFamily: "Rubik_700Bold" }}>
                        {arabic}
                    </Text>
                </>
            )}
        </View>
    );
};
