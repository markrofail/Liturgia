import React from "react";
import { Speaker, MultiLingualText as MultiLingualTextT } from "../../types";
import { SpeakerLabel } from "./SpeakerLabel";
import { MultiLingualText, Stack } from "..";

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
