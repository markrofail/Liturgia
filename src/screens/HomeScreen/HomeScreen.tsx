import React from "react";
import { ScrollView, View } from "react-native";
import { LiturgyPart } from "../../components/LiturgyPart";
import { prayers } from "../../data";

export const HomeScreen = () => {
    return (
        <View
            style={{
                flex: 1,
                padding: 25,
                alignItems: "center",
                justifyContent: "flex-start",
                backgroundColor: "black",
            }}
        >
            <ScrollView>
                {Object.entries(prayers).map(([title, prayers], i) => (
                    <LiturgyPart key={i} title={title} prayers={prayers} />
                ))}
            </ScrollView>
        </View>
    );
};
