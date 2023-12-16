import React from "react";
import { View } from "react-native";
import { Text, TextProps } from "./Text";

interface MultiLingualTextProps extends Pick<TextProps, "variant" | "color"> {
    text: {
        english?: string;
        coptic?: string;
        coptic_english?: string;
        arabic?: string;
    };
    direction?: "row" | "column";
    gap?: number;
    centered?: boolean;
}

export const MultiLingualText = ({ direction, gap, centered, text, ...rest }: MultiLingualTextProps) => {
    return (
        <View style={{ flexDirection: direction ?? "row", justifyContent: centered ? "center" : undefined, gap }}>
            {Object.entries(text).map(([key, value]) => (
                <Text {...rest} key={key} language={key as any} text={value} fill />
            ))}
        </View>
    );
};
