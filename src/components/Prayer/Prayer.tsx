import React from "react";
import { Text, View } from "react-native";
import { MultiLingualText, Prayer as PrayerT } from "../../types";
import { PrayerSection } from "../PrayerSection";

interface PrayerProps extends PrayerT {}

export const Prayer = ({ title, sections }: PrayerProps) => {
    return (
        <View>
            <PrayerTitle title={title} />
            {sections.map((section, i) => (
                <PrayerSection key={i} {...section} />
            ))}
        </View>
    );
};

const PrayerTitle = ({ title }: { title: MultiLingualText }) => {
    return <Text>{title.english}</Text>;
};
