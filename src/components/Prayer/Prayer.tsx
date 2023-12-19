import React from "react";
import { Prayer as PrayerT } from "../../types";
import { PrayerSection } from "../PrayerSection";
import { MultiLingualText, Stack } from "..";

interface PrayerProps extends PrayerT {}

export const Prayer = ({ title, sections }: PrayerProps) => {
    return (
        <Stack spaceAbove="s" spaceBelow="xl">
            {/* Prayer Title */}
            <Stack spaceBelow="l">
                <MultiLingualText variant="heading" text={title} centered />
            </Stack>

            {/* Prayer Body */}
            {sections.map((section, i) => (
                <PrayerSection key={i} {...section} />
            ))}
        </Stack>
    );
};
