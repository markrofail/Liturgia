import React from "react";
import { Text } from "react-native-paper";
import { View } from "react-native";
import { MultiLingualText } from "../../types";
import { ZOOM_MULTIPLIER } from "../../constants";

interface VerseProps {
    verse: MultiLingualText;
}

export const Verse = ({ verse: { english, coptic, coptic_english, arabic } }: VerseProps) => {
    return (
        <View style={{ flexDirection: "row", gap: 10 * ZOOM_MULTIPLIER, marginBottom: 10 * ZOOM_MULTIPLIER }}>
            {!!english && <EnglishText text={english} />}
            {!!coptic && <CopticText text={coptic} />}
            {!!coptic_english && <CopticEnglishText text={coptic_english} />}
            {!!arabic && <ArabicText text={arabic} />}
        </View>
    );
};

const EnglishText = ({ text }: { text: string }) => (
    <View style={{ flex: 1 }}>
        <Text
            style={{
                fontFamily: "OpenSans_400Regular",
                fontSize: 18 * ZOOM_MULTIPLIER,
                lineHeight: 20 * ZOOM_MULTIPLIER,
            }}
        >
            {text}
        </Text>
    </View>
);

const ArabicText = ({ text }: { text: string }) => (
    <View style={{ flex: 1 }}>
        <Text
            style={{
                textAlign: "right",
                fontFamily: "Rubik_400Regular",
                fontSize: 22 * ZOOM_MULTIPLIER,
                lineHeight: 24 * ZOOM_MULTIPLIER,
            }}
        >
            {text}
        </Text>
    </View>
);

const CopticText = ({ text }: { text: string }) => (
    <View style={{ flex: 1 }}>
        <Text
            style={{
                textAlign: "center",
                fontFamily: "CopticForAll",
                fontSize: 24 * ZOOM_MULTIPLIER,
                lineHeight: 26 * ZOOM_MULTIPLIER,
            }}
        >
            {text}
        </Text>
    </View>
);

const CopticEnglishText = ({ text }: { text: string }) => (
    <View style={{ flex: 1 }}>
        <Text
            style={{
                textAlign: "center",
                fontFamily: "OpenSans_400Regular",
                fontSize: 18 * ZOOM_MULTIPLIER,
                lineHeight: 20 * ZOOM_MULTIPLIER,
            }}
        >
            {text}
        </Text>
    </View>
);
