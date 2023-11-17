import React from "react";
import { Text } from "react-native-paper";
import { View } from "react-native";
import { prayers } from "../../data";
import { Prayer, LiturgyPart } from "../../types";

export const DrawerContent = () => {
    return (
        <View style={{ flex: 1, backgroundColor: "black", padding: 20 }}>
            {Object.entries(prayers).map(([title, prayers], i) => (
                <SubMenu key={i} title={title} prayers={prayers} />
            ))}
        </View>
    );
};

interface SubMenuProps extends LiturgyPart {}
const SubMenu = ({ title, prayers }: SubMenuProps) => {
    return (
        <View style={{ marginBottom: 10 }}>
            <Text style={{ marginBottom: 5 }}>{title}</Text>

            {prayers.map((prayer, i) => (
                <Text key={i} style={{ marginLeft: 25, marginBottom: 5 }}>
                    {(prayer as Prayer).title.english}
                </Text>
            ))}
        </View>
    );
};
