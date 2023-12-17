import React from "react";
import { StyleSheet, Text as TextBase, View } from "react-native";
import { ZOOM_MULTIPLIER } from "../../constants";

type Spacing = "xs" | "s" | "m" | "l" | "xl";
type Variant = "title" | "heading" | "body" | "date" | "menuEntry" | "menuEntryIndex";
type Language = "english" | "coptic" | "coptic_english" | "arabic";

export interface TextProps {
    language?: Language;
    variant: Variant;
    spaceBelow?: Spacing;
    spaceAbove?: Spacing;
    text?: string;
    fill?: boolean;
    color?: string;
    inverse?: boolean;
}

export const Text = ({ fill, language, variant, color, inverse, text }: TextProps) => {
    const styles = {
        color: color ?? (inverse ? "black" : "white"),
        ...languageStyles[language ?? "english"],
        ...variantStyles[variant],
    };
    if (!!color) styles.color = color;

    return (
        !!text && (
            <View style={{ flex: fill ? 1 : undefined }}>
                <TextBase style={{ ...styles }}>{text}</TextBase>
            </View>
        )
    );
};

const languageStyles = StyleSheet.create({
    english: { fontFamily: "NotoSerif_400Regular" },
    coptic: { fontFamily: "CopticForAll" },
    coptic_english: { fontFamily: "NotoSerif_400Regular" },
    arabic: { fontFamily: "Rubik_400Regular", writingDirection: "rtl" },
});

const spacingStyles = StyleSheet.create({
    xs: { marginBottom: 4 * ZOOM_MULTIPLIER },
    s: { marginBottom: 8 * ZOOM_MULTIPLIER },
    m: { marginBottom: 16 * ZOOM_MULTIPLIER },
    l: { marginBottom: 24 * ZOOM_MULTIPLIER },
    xl: { marginBottom: 32 * ZOOM_MULTIPLIER },
});

const variantStyles = StyleSheet.create({
    title: {
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 36 * ZOOM_MULTIPLIER,
        lineHeight: 42 * ZOOM_MULTIPLIER,
    },
    heading: {
        textAlign: "center",
        fontSize: 28 * ZOOM_MULTIPLIER,
        lineHeight: 30 * ZOOM_MULTIPLIER,
    },
    body: {
        fontSize: 18 * ZOOM_MULTIPLIER,
        lineHeight: 26 * ZOOM_MULTIPLIER,
    },
    date: {},
    menuEntry: {
        writingDirection: "ltr",
        textAlign: "left",
    },
    menuEntryIndex: {
        fontSize: 20,
    },
});
