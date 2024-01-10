import React, { memo } from "react";
import { Spinner } from "@gluestack-ui/themed";
import { PrayerSection } from "@src/components/PrayerSection";
import { MultiLingualText, Stack } from "@src/components";
import { useMemoAsync } from "@src/hooks/useMemoAsync";
import { Prayer as PrayerContent } from "@src/types";
import { Prayer as PrayerT } from "@src/utils/getLiturgy";

interface PrayerProps {
    prayer: PrayerT;
}

export const Prayer = memo(({ prayer: { title, content } }: PrayerProps) => {
    const data = useMemoAsync<PrayerContent>(content);

    return (
        <Stack spaceAbove="s" spaceBelow="xl">
            {/* Prayer Title */}
            <Stack spaceBelow="l">
                <MultiLingualText variant="heading" text={title} centered />
            </Stack>

            {/* Prayer Body */}
            {data ? (
                data.sections.map((section, i) => <PrayerSection key={i} {...section} />)
            ) : (
                <Spinner size="large" color="$white" />
            )}
        </Stack>
    );
});
