import React from "react";
import { Text } from "react-native-paper";
import { View } from "react-native";
import { Prayer as PrayerT } from "../../types";
import { Prayer } from "../../components/Prayer";

interface LiturgyPartProps {
    title: string;
    prayers: PrayerT[];
}

export const LiturgyPart = ({ title, prayers }: LiturgyPartProps) => {
    return (
        <View>
            <Text variant="displayMedium" style={{ textAlign: "center" }}>
                {title}
            </Text>
            {prayers.map((prayer, i) => (
                <Prayer key={i} {...prayer} />
            ))}
        </View>
    );
};
