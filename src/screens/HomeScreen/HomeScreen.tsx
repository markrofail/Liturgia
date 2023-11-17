import React from "react";
import { ScrollView, View } from "react-native";
import { Prayer } from "../../components/Prayer";

export const HomeScreen = () => {
    const prayers = [
        require("../../../resources/prayers/hiten-ne-epresvia.json"),
        require("../../../resources/prayers/tai-shoori.json"),
    ];

    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "flex-start", backgroundColor: "black" }}>
            <ScrollView>
                {prayers.map((prayer, i) => (
                    <Prayer key={i} {...prayer} />
                ))}
            </ScrollView>
        </View>
    );
};
