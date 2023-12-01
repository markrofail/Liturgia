import React from "react";
import { View } from "react-native";
import { Verse } from "../Verse";
import { Hint } from "./Hint";
import { SpeakerLabel } from "../Prayer/SpeakerLabel";
import { PrayerSection as PrayerSectionT } from "../../types";
import { ZOOM_MULTIPLIER } from "../../constants";

interface PrayerSectionProps extends PrayerSectionT {}

export const PrayerSection = ({ speaker, verses, text }: PrayerSectionProps) => {
    return (
        <View style={{ marginBottom: 15 * ZOOM_MULTIPLIER }}>
            {!!speaker && <SpeakerLabel speaker={speaker} />}
            {speaker === "info" ? <Hint {...text} /> : verses?.map((verse, i) => <Verse key={i} verse={verse} />)}
        </View>
    );
};
