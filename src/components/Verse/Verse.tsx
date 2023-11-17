import React from "react";
import { Text } from "react-native-paper";
import { View } from "react-native";
import { MultiLingualText } from "../../types";

interface VerseProps {
    verse: MultiLingualText;
}

export const Verse = ({ verse: { english, arabic, coptic, coptic_english } }: VerseProps) => {
    return (
        <View style={{ flexDirection: "row", gap: 5, marginBottom: 10 }}>
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
                <Text style={{ fontSize: 18 }}>{text}</Text>
            </View>
        )
    );
};

const ArabicText = ({ text }: { text?: string }) => {
    return (
        text && (
            <View style={{ flex: 1 }}>
                <Text style={{ textAlign: "right", fontSize: 22 }}>{text}</Text>
            </View>
        )
    );
};

const CopticText = ({ text }: { text?: string }) => {
    return (
        text && (
            <View style={{ flex: 1 }}>
                <Text style={{ fontFamily: "NotoSansCoptic", fontSize: 18 }}>{text}</Text>
            </View>
        )
    );
};

const CopticEnglishText = ({ text }: { text?: string }) => {
    return (
        text && (
            <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 18 }}>{text}</Text>
            </View>
        )
    );
};
