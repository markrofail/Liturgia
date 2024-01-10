import React, { memo } from "react";
import { Spinner } from "@gluestack-ui/themed";
import { PrayerSection } from "@src/components/PrayerSection";
import { MultiLingualText, Stack } from "@src/components";
import { useMemoAsync } from "@src/hooks/useMemoAsync";
import { Prayer as PrayerContent } from "@src/types";
import { Prayer as PrayerT } from "@src/utils/getLiturgy";

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
