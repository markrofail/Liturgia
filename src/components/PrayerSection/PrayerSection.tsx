import React from "react";
import { InfoSection } from "./InfoSection";
import { VersesSection } from "./VersesSection";
import { ReadingSection } from "./ReadingSection";
import { Stack } from "../Stack";

interface PrayerSectionProps {
    type?: "info" | "verses" | "reading";
}

export const PrayerSection = ({ type, ...props }: PrayerSectionProps) => {
    return (
        <Stack spaceBelow="m">
            {type === "info" && <InfoSection {...props} />}
            {type === "reading" && <ReadingSection {...props} />}
            {(!type || type === "verses") && <VersesSection {...props} />}
        </Stack>
    );
};
