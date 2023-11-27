import React, { forwardRef } from "react";
import { Text } from "react-native-paper";
import { LayoutChangeEvent, View } from "react-native";
import { MultiLingualText, Prayer as PrayerT } from "../../types";
import { PrayerSection } from "../PrayerSection";
import { ZOOM_MULTIPLIER } from "../../constants";

interface PrayerProps extends PrayerT {
    onLayout?: (event: LayoutChangeEvent) => void;
}

export const Prayer = forwardRef(({ onLayout, title, sections }: PrayerProps, ref) => {
    return (
        <View style={{ marginTop: 10 * ZOOM_MULTIPLIER, marginBottom: 50 * ZOOM_MULTIPLIER }} onLayout={onLayout}>
            <PrayerTitle ref={ref} title={title} />
            {sections.map((section, i) => (
                <PrayerSection key={i} {...section} />
            ))}
        </View>
    );
});

const PrayerTitle = forwardRef(({ title: { english, arabic, coptic } }: { title: MultiLingualText }, ref) => {
    return (
        <View ref={ref} style={{ flexDirection: "row", justifyContent: "center", marginBottom: 25 * ZOOM_MULTIPLIER }}>
            {english && (
                <View style={{ flex: 1 }}>
                    <Text
                        variant="headlineLarge"
                        style={{ fontFamily: "OpenSans_700Bold", textAlign: "center", fontSize: 28 * ZOOM_MULTIPLIER }}
                    >
                        {english}
                    </Text>
                </View>
            )}
            {coptic && (
                <View style={{ flex: 1 }}>
                    <Text
                        variant="headlineLarge"
                        style={{
                            fontFamily: "NotoSansCoptic_400Regular",
                            fontWeight: "bold",
                            textAlign: "center",
                            fontSize: 28 * ZOOM_MULTIPLIER,
                        }}
                    >
                        {coptic}
                    </Text>
                </View>
            )}
            {arabic && (
                <View style={{ flex: 1 }}>
                    <Text
                        variant="headlineLarge"
                        style={{ fontFamily: "Rubik_700Bold", textAlign: "center", fontSize: 32 * ZOOM_MULTIPLIER }}
                    >
                        {arabic}
                    </Text>
                </View>
            )}
        </View>
    );
});
