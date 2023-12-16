import React from "react";
import { View } from "react-native";
import { ZOOM_MULTIPLIER } from "../../constants";
import { InfoSection } from "./InfoSection";
import { VersesSection } from "./VersesSection";
import { ReadingSection } from "./ReadingSection";

interface PrayerSectionProps {
    type?: "info" | "verses" | "reading";
}

export const PrayerSection = ({ type, ...props }: PrayerSectionProps) => {
    return (
        <View style={{ marginBottom: 15 * ZOOM_MULTIPLIER }}>
            {type === "info" && <InfoSection {...props} />}
            {type === "reading" && <ReadingSection {...props} />}
            {(!type || type === "verses") && <VersesSection {...props} />}
        </View>
    );
};
