import React, { forwardRef } from "react";
import { View, LayoutChangeEvent } from "react-native";
import { Prayer as PrayerT } from "../../types";
import { PrayerSection } from "../PrayerSection";
import { ZOOM_MULTIPLIER } from "../../constants";
import { MultiLingualText } from "../Text";

interface PrayerProps extends PrayerT {}

export const Prayer = ({ title, sections }: PrayerProps) => {
    return (
        <View style={{ marginTop: 10 * ZOOM_MULTIPLIER, marginBottom: 50 * ZOOM_MULTIPLIER }}>
            {/* Prayer Title */}
            <View style={{ marginBottom: 25 * ZOOM_MULTIPLIER }}>
                <MultiLingualText variant="heading" text={title} centered />
            </View>

            {/* Prayer Body */}
            {sections.map((section, i) => (
                <PrayerSection key={i} {...section} />
            ))}
        </View>
    );
};
