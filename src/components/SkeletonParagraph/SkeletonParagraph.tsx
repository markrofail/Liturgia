import React from "react";
import { View } from "react-native";
import { Skeleton } from "react-native-skeleton-loaders";
import { Stack } from "@src/components";
import { getZoomMultiplier } from "@src/settings";

interface SkeletonParagraphProps {
    columns: number;
    rows: number;
    lines: number;
}

export const SkeletonParagraph = ({ columns, rows, lines }: SkeletonParagraphProps) => {
    const zoomMultiplier = getZoomMultiplier();

    return (
        <Stack direction="row" gap="l">
            {range(columns).map((i1) => (
                <View style={{ flex: 1 }} key={i1}>
                    {range(rows).map((i2) => (
                        <Stack direction="column" gap="s" spaceAbove={i2 === 0 ? undefined : "xl"} key={i2} centered>
                            {range(lines).map((i3) => (
                                <Skeleton w={"75%"} h={18 * zoomMultiplier} bR={100} key={i3} />
                            ))}
                        </Stack>
                    ))}
                </View>
            ))}
        </Stack>
    );
};

const range = (length: number) => Array.from({ length }, (_, i) => i);
