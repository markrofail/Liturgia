import React, { Fragment, useMemo } from "react";
import { Reading, ReadingType, Synaxarium, getReadings } from "../../utils/getReadings";
import { MultiLingualText } from "..";

export interface ReadingSectionProps {
    readingType?: ReadingType;
}

export const ReadingSection = ({ readingType }: ReadingSectionProps) => {
    const readingText = useMemo(() => readingType && getReadings(readingType), []);

    if (!readingText) return null;
    return (
        <>
            <MultiLingualText variant="heading" gap="m" text={readingText.title} />
            {readingType !== "synaxarium" ? (
                <MultiLingualText variant="body" gap="m" text={(readingText as Reading).text} />
            ) : (
                (readingText as Synaxarium).commemorations.map((commemoration, i) => (
                    <Fragment key={i}>
                        <MultiLingualText variant="body" gap="m" text={commemoration.title} />
                        <MultiLingualText variant="body" gap="m" text={commemoration.text} />
                    </Fragment>
                ))
            )}
        </>
    );
};
