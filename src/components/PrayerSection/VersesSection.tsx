import React from "react";
import { MultiLingualText } from "../MultiLingualText";
import { SpeakerLabel } from "./SpeakerLabel";
import { Speaker, MultiLingualText as MultiLingualTextT } from "../../types";
import { Stack } from "../Stack";

interface VersesSectionProps {
    speaker?: Speaker;
    verses?: { occasion: string } & MultiLingualTextT[];
}
export const VersesSection = ({ speaker, verses }: VersesSectionProps) => {
    return (
        <>
            {!!speaker && <SpeakerLabel speaker={speaker} />}

            {!!verses &&
                verses.map((verse, i) => (
                    <Stack spaceBelow="m" key={i}>
                        <MultiLingualText variant="body" gap="m" text={verse} />
                    </Stack>
                ))}
        </>
    );
};
