import React, { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { getZoomMultiplier } from "../../settings";

export type Spacing = "xs" | "s" | "m" | "l" | "xl";
export type Direction = "row" | "column";

export interface StackProps {
    spaceAbove?: Spacing;
    spaceBelow?: Spacing;
    gap?: Spacing;
    direction?: Direction;
    centered?: boolean;
    children: ReactNode;
}

export const Stack = ({ spaceAbove, spaceBelow, gap, direction, centered, children }: StackProps) => {
    const styles = {
        ...spaceAboveStyles[spaceAbove ?? "none"],
        ...spaceBelowStyles[spaceBelow ?? "none"],
        ...flexStyles[direction ?? "column"],
        ...gapStyles[gap ?? "none"],
        justifyContent: centered ? ("center" as const) : undefined,
    };

    return <View style={styles}>{children}</View>;
};

const ZOOM_MULTIPLIER = getZoomMultiplier();
const gapStyles = StyleSheet.create({
    none: {},
    xs: { gap: 4 * ZOOM_MULTIPLIER },
    s: { gap: 8 * ZOOM_MULTIPLIER },
    m: { gap: 16 * ZOOM_MULTIPLIER },
    l: { gap: 24 * ZOOM_MULTIPLIER },
    xl: { gap: 32 * ZOOM_MULTIPLIER },
});

const spaceBelowStyles = StyleSheet.create({
    none: {},
    xs: { marginBottom: 4 * ZOOM_MULTIPLIER },
    s: { marginBottom: 8 * ZOOM_MULTIPLIER },
    m: { marginBottom: 16 * ZOOM_MULTIPLIER },
    l: { marginBottom: 24 * ZOOM_MULTIPLIER },
    xl: { marginBottom: 32 * ZOOM_MULTIPLIER },
});

const spaceAboveStyles = StyleSheet.create({
    none: {},
    xs: { marginTop: 4 * ZOOM_MULTIPLIER },
    s: { marginTop: 8 * ZOOM_MULTIPLIER },
    m: { marginTop: 16 * ZOOM_MULTIPLIER },
    l: { marginTop: 24 * ZOOM_MULTIPLIER },
    xl: { marginTop: 32 * ZOOM_MULTIPLIER },
});

const flexStyles = StyleSheet.create({
    row: { flexDirection: "row" },
    column: { flexDirection: "column" },
});
