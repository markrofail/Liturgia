import React from "react";
import { Speaker, MultiLingualText as MultiLingualTextT } from "../../types";
import { MultiLingualText, Stack } from "..";

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
        <Stack spaceBelow="s">
            <MultiLingualText variant="body" color={color} text={{ english, arabic }} />
        </Stack>
    );
};
