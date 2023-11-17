import React from "react";
import { Text } from "react-native-paper";
import { TouchableOpacity, View } from "react-native";
import { LiturgyPart } from "../../types";
import { useActivePrayer } from "../../hooks/useActivePrayer";

export const DrawerContent = () => {
    const { liturgy } = useActivePrayer();

    return (
        <View style={{ flex: 1, backgroundColor: "black", padding: 20 }}>
            {liturgy.map(({ title, prayers }, i) => (
                <SubMenu key={i} title={title} prayers={prayers} />
            ))}
        </View>
    );
};

interface SubMenuProps extends LiturgyPart {}

const SubMenu = ({ title, prayers }: SubMenuProps) => {
    const { activeRef, setActiveRef } = useActivePrayer();

    return (
        <View style={{ marginBottom: 10 }}>
            <Text style={{ marginBottom: 5 }}>{title}</Text>

            {prayers.map(({ prayerRef, title }, i) => (
                <TouchableOpacity key={i} onPress={() => prayerRef && setActiveRef(prayerRef)}>
                    <Text
                        style={{ marginLeft: 25, marginBottom: 5, color: prayerRef === activeRef ? "grey" : undefined }}
                    >
                        {title.english}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};
