import React from "react";
import { Text, TouchableRipple, useTheme } from "react-native-paper";
import { View } from "react-native";
import { LiturgyPart } from "../../types";
import { useActivePrayer } from "../../hooks/useActivePrayer";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { getCopticDate } from "../../utils/CopticCalendar";
import { Drawer } from "react-native-paper";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { loadLiturgy } from "../../utils/LiturgyLoader";

export const DrawerContent = () => {
    const liturgy = loadLiturgy();

    return (
        <DrawerContentScrollView style={{ flex: 1, backgroundColor: "black", padding: 20 }}>
            <CopticDate />
            {liturgy.map(({ title, prayers }, i) => (
                <SubMenu key={i} title={title} prayers={prayers} />
            ))}
        </DrawerContentScrollView>
    );
};

interface SubMenuProps extends LiturgyPart {}

const SubMenu = ({ title, prayers }: SubMenuProps) => {
    const { activeId, setActiveId } = useActivePrayer();
    const navigation = useNavigation();
    const { colors, roundness } = useTheme();

    return (
        <View style={{ marginBottom: 10 }}>
            <Drawer.Section title={title}>
                <View style={{ marginLeft: 25 }}>
                    {prayers.map(({ id, title }, i) => (
                        <TouchableRipple
                            key={id}
                            borderless
                            style={{
                                marginHorizontal: 10,
                                marginVertical: 4,
                                padding: 8,
                                borderRadius: 7 * roundness,
                                backgroundColor: id === activeId ? colors.secondaryContainer : "transparent",
                            }}
                            onPress={() => {
                                setActiveId(id);
                                navigation.dispatch(DrawerActions.toggleDrawer());
                            }}
                        >
                            <Text>
                                {i + 1}. {title.english} {title.arabic}
                            </Text>
                        </TouchableRipple>
                    ))}
                </View>
            </Drawer.Section>
        </View>
    );
};

const CopticDate = () => {
    const { day, month, year } = getCopticDate();

    return (
        <Drawer.Section>
            <Text variant="bodyLarge" style={{ textAlign: "center", fontWeight: "bold", marginBottom: 10 }}>
                {day} {month} {year}
            </Text>
        </Drawer.Section>
    );
};
