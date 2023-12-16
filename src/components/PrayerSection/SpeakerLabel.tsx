import React from "react";
import { View } from "react-native";
import { MultiLingualText } from "../Text";
import { Speaker, MultiLingualText as MultiLingualTextT } from "../../types";
import { ZOOM_MULTIPLIER } from "../../constants";

export const LABEL_MAP: Record<Speaker, MultiLingualTextT & { color: string }> = {
    priest: { english: "Priest", arabic: "الكاهن", coptic: "Ⲡⲓⲟⲩⲏⲃ", color: "#ff4000" },
    deacon: { english: "Deacon", arabic: "الشماس", coptic: "Ⲡⲓⲇⲓⲁⲕⲱⲛ", color: "yellow" },
    reader: { english: "Reader", arabic: "القارئ", coptic: "", color: "yellow" },
    people: { english: "People", arabic: "الشعب", coptic: "Ⲡⲓⲗⲁⲟⲥ", color: "orange" },
};

interface SpeakerLabelProps {
    speaker: Speaker;
}
export const SpeakerLabel = ({ speaker }: SpeakerLabelProps) => {
    if (!Object.keys(LABEL_MAP).includes(speaker)) console.log(`Unrecognized speaker ${speaker}`);
    const { english, arabic, color } = LABEL_MAP[speaker];

    return (
        <View style={{ marginBottom: 8 * ZOOM_MULTIPLIER }}>
            <MultiLingualText variant="body" color={color} text={{ english, arabic }} />
        </View>
    );
};
