import React from "react";
import { StyleSheet, Text as TextBase, View } from "react-native";
import { getZoomMultiplier } from "../../settings";

type Variant = "title" | "heading" | "body" | "date" | "menuEntry" | "menuEntryIndex";
export type Language = "english" | "coptic" | "coptic_english" | "arabic";

export interface TextProps {
    language?: Language;
    variant: Variant;
    text?: string;
    fill?: boolean;
    color?: string;
    inverse?: boolean;
}

export const Text = ({ fill, language, variant, color, inverse, text }: TextProps) => {
    const zoomMultiplier = getZoomMultiplier();
    const styles = {
        color: color ?? (inverse ? "black" : "white"),
        ...languageStyles[language ?? "english"],
        ...variantStyles(zoomMultiplier)[variant],
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

const variantStyles = (zoomMultiplier: number) =>
    StyleSheet.create({
        title: {
            fontWeight: "bold",
            textAlign: "center",
            fontSize: 36 * zoomMultiplier,
            lineHeight: 42 * zoomMultiplier,
        },
        heading: {
            textAlign: "center",
            fontSize: 28 * zoomMultiplier,
            lineHeight: 30 * zoomMultiplier,
        },
        body: {
            fontSize: 18 * zoomMultiplier,
            lineHeight: 26 * zoomMultiplier,
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
