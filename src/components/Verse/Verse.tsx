import React from "react";
import { Text } from "react-native-paper";
import { View } from "react-native";
import { MultiLingualText } from "../../types";
import { ZOOM_MULTIPLIER } from "../../constants";

interface VerseProps {
    verse: MultiLingualText;
}

export const Verse = ({ verse: { english, arabic, coptic, coptic_english } }: VerseProps) => {
    return (
        <View style={{ flexDirection: "row", gap: 10 * ZOOM_MULTIPLIER, marginBottom: 10 * ZOOM_MULTIPLIER }}>
            <EnglishText text={english} />
            <CopticText text={coptic} />
            <CopticEnglishText text={coptic_english} />
            <ArabicText text={arabic} />
        </View>
    );
};

const EnglishText = ({ text }: { text?: string }) => {
    return (
        text && (
            <View style={{ flex: 1 }}>
                <Text
                    style={{
                        fontFamily: "OpenSans_400Regular",
                        fontSize: 18 * ZOOM_MULTIPLIER,
                        lineHeight: 28 * ZOOM_MULTIPLIER,
                    }}
                >
                    {text}
                </Text>
            </View>
        )
    );
};

const ArabicText = ({ text }: { text?: string }) => {
    return (
        text && (
            <View style={{ flex: 1 }}>
                <Text
                    style={{
                        textAlign: "right",
                        fontFamily: "Rubik_400Regular",
                        fontSize: 22 * ZOOM_MULTIPLIER,
                        lineHeight: 30 * ZOOM_MULTIPLIER,
                    }}
                >
                    {text}
                </Text>
            </View>
        )
    );
};

const CopticText = ({ text }: { text?: string }) => {
    return (
        text && (
            <View style={{ flex: 1 }}>
                <Text style={{ fontFamily: "CopticForAll", fontSize: 24 * ZOOM_MULTIPLIER }}>{text}</Text>
            </View>
        )
    );
};

const CopticEnglishText = ({ text }: { text?: string }) => {
    return (
        text && (
            <View style={{ flex: 1 }}>
                <Text style={{ fontFamily: "OpenSans_400Regular", fontSize: 18 * ZOOM_MULTIPLIER }}>{text}</Text>
            </View>
        )
    );
};
