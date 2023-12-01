import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { MultiLingualText } from "../../types";
import { ZOOM_MULTIPLIER } from "../../constants";

interface PrayerTitleProps {
    title: MultiLingualText;
}
export const PrayerTitle = ({ title: { english, arabic, coptic } }: PrayerTitleProps) => {
    return (
        <View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 25 * ZOOM_MULTIPLIER }}>
            {!!english && (
                <View style={{ flex: 1 }}>
                    <Text
                        variant="headlineLarge"
                        style={{
                            fontFamily: "OpenSans_700Bold",
                            textAlign: "center",
                            fontSize: 28 * ZOOM_MULTIPLIER,
                            lineHeight: 30 * ZOOM_MULTIPLIER,
                        }}
                    >
                        {english}
                    </Text>
                </View>
            )}
            {!!coptic && (
                <View style={{ flex: 1 }}>
                    <Text
                        variant="headlineLarge"
                        style={{
                            fontFamily: "NotoSansCoptic_400Regular",
                            fontWeight: "bold",
                            textAlign: "center",
                            fontSize: 28 * ZOOM_MULTIPLIER,
                            lineHeight: 30 * ZOOM_MULTIPLIER,
                        }}
                    >
                        {coptic}
                    </Text>
                </View>
            )}
            {!!arabic && (
                <View style={{ flex: 1 }}>
                    <Text
                        variant="headlineLarge"
                        style={{
                            fontFamily: "Rubik_700Bold",
                            textAlign: "center",
                            fontSize: 32 * ZOOM_MULTIPLIER,
                            lineHeight: 34 * ZOOM_MULTIPLIER,
                        }}
                    >
                        {arabic}
                    </Text>
                </View>
            )}
        </View>
    );
};
