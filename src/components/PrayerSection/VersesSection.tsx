import React from "react";
import { View } from "react-native";
import { MultiLingualText } from "../Text";
import { ZOOM_MULTIPLIER } from "../../constants";
import { SpeakerLabel } from "./SpeakerLabel";
import { Speaker, MultiLingualText as MultiLingualTextT } from "../../types";

interface VersesSectionProps {
    speaker?: Speaker;
    verses?: { occasion: string } & MultiLingualTextT[];
}
export const VersesSection = ({ speaker, verses }: VersesSectionProps) => {
    return (
        <>
            {!!speaker && <SpeakerLabel speaker={speaker} />}
            <View style={{ marginBottom: 10 * ZOOM_MULTIPLIER }}>
                {!!verses &&
                    verses.map((verse, i) => (
                        <View key={i} style={{ marginBottom: 10 * ZOOM_MULTIPLIER }}>
                            <MultiLingualText variant="body" gap={16 * ZOOM_MULTIPLIER} text={verse} />
                        </View>
                    ))}
            </View>
        </>
    );
};
