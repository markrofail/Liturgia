import React, { Fragment, useMemo } from "react";
import { MultiLingualText } from "../Text";
import { ZOOM_MULTIPLIER } from "../../constants";
import { ReadingType, Synaxarium, getReadings } from "../../utils/getReadings";

export interface ReadingSectionProps {
    readingType?: ReadingType;
}

export const ReadingSection = ({ readingType }: ReadingSectionProps) => {
    const readingText = useMemo(() => readingType && getReadings(readingType), []);

    if (!readingText) return null;
    return (
        <>
            <MultiLingualText variant="heading" gap={16 * ZOOM_MULTIPLIER} text={readingText.title} />
            {readingType !== "synaxarium" ? (
                <MultiLingualText variant="body" gap={16 * ZOOM_MULTIPLIER} text={readingText.text} />
            ) : (
                (readingText as Synaxarium).commemorations.map((commemoration, i) => (
                    <Fragment key={i}>
                        <MultiLingualText variant="body" gap={16 * ZOOM_MULTIPLIER} text={commemoration.title} />
                        <MultiLingualText variant="body" gap={16 * ZOOM_MULTIPLIER} text={commemoration.text} />
                    </Fragment>
                ))
            )}
        </>
    );
};
