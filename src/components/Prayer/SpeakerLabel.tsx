import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { Speaker, MultiLingualText } from "../../types";
import { ZOOM_MULTIPLIER } from "../../constants";

export const LABEL_MAP: Record<Speaker, MultiLingualText & { color: string }> = {
    priest: { english: "Priest", arabic: "الكاهن", coptic: "Ⲡⲓⲟⲩⲏⲃ", color: "#ff4000" },
    deacon: { english: "Deacon", arabic: "الشماس", coptic: "Ⲡⲓⲇⲓⲁⲕⲱⲛ", color: "yellow" },
    reader: { english: "Reader", arabic: "القارئ", coptic: "", color: "yellow" },
    people: { english: "People", arabic: "الشعب", coptic: "Ⲡⲓⲗⲁⲟⲥ", color: "orange" },
    info: { english: "", arabic: "", coptic: "", color: "" },
};

interface SpeakerLabelProps {
    speaker: Speaker;
}
export const SpeakerLabel = ({ speaker }: SpeakerLabelProps) => {
    if (!Object.keys(LABEL_MAP).includes(speaker)) console.log(`Unrecognized speaker ${speaker}`);
    const { english, arabic, color } = LABEL_MAP[speaker];

    return (
        <View
            style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 8 * ZOOM_MULTIPLIER,
            }}
        >
            <Text
                variant="titleMedium"
                style={{
                    color,
                    fontFamily: "OpenSans_700Bold",
                    fontSize: 18 * ZOOM_MULTIPLIER,
                    lineHeight: 20 * ZOOM_MULTIPLIER,
                }}
            >
                {english}
            </Text>
            <Text
                variant="titleMedium"
                style={{
                    color,
                    textAlign: "right",
                    fontFamily: "Rubik_700Bold",
                    fontSize: 22 * ZOOM_MULTIPLIER,
                    lineHeight: 24 * ZOOM_MULTIPLIER,
                }}
            >
                {arabic}
            </Text>
        </View>
    );
};
