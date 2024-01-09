import React, { memo } from "react";
import { PrayerSection } from "../PrayerSection";
import { MultiLingualText, Stack } from "..";
import { useMemoAsync } from "@src/hooks/useMemoAsync";
import { Prayer as PrayerT } from "@/types";
import { Prayer as NewPrayerT } from "@/utils/getLiturgy";

interface PrayerProps {
    prayer: NewPrayerT;
}

export const Prayer = memo(({ prayer }: PrayerProps) => {
    const loadedPrayer = useMemoAsync<PrayerT>(prayer.content);
    if (!loadedPrayer) return null;

    const { title, sections } = loadedPrayer;
    return (
        <Stack spaceAbove="s" spaceBelow="xl">
            {/* Prayer Title */}
            <Stack spaceBelow="l">
                <MultiLingualText variant="heading" text={{ english: title.english, arabic: title.arabic }} centered />
            </Stack>

            {/* Prayer Body */}
            {sections.map((section, i) => (
                <PrayerSection key={i} {...section} />
            ))}
        </Stack>
    );
});
