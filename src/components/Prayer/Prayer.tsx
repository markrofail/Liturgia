import React from "react";
import { View, LayoutChangeEvent } from "react-native";
import { Prayer as PrayerT } from "../../types";
import { PrayerSection } from "../PrayerSection";
import { PrayerTitle } from "./PrayerTitle";
import { ZOOM_MULTIPLIER } from "../../constants";

interface PrayerProps extends PrayerT {
    onLayout?: (event: LayoutChangeEvent) => void;
}

export const Prayer = ({ onLayout, title, sections }: PrayerProps) => {
    return (
        <View style={{ marginTop: 10 * ZOOM_MULTIPLIER, marginBottom: 50 * ZOOM_MULTIPLIER }} onLayout={onLayout}>
            <PrayerTitle title={title} />
            {sections.map((section, i) => (
                <PrayerSection key={i} {...section} />
            ))}
        </View>
    );
};
