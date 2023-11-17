import React from "react";
import { Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { MultiLingualText } from "../../types";

interface VerseProps {
    verse: MultiLingualText;
}

export const Verse = ({ verse: { english, arabic, coptic, coptic_english } }: VerseProps) => {
    return (
        <View style={{ flexDirection: "row" }}>
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
                <Text>{text}</Text>
            </View>
        )
    );
};

const ArabicText = ({ text }: { text?: string }) => {
    return (
        text && (
            <View style={{ flex: 1 }}>
                <Text>{text}</Text>
            </View>
        )
    );
};

const CopticText = ({ text }: { text?: string }) => {
    return (
        text && (
            <View style={{ flex: 1 }}>
                <Text>{text}</Text>
            </View>
        )
    );
};

const CopticEnglishText = ({ text }: { text?: string }) => {
    return (
        text && (
            <View style={{ flex: 1 }}>
                <Text>{text}</Text>
            </View>
        )
    );
};
