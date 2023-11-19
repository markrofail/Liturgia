import React from "react";
import { Text } from "react-native-paper";
import { TouchableOpacity, View } from "react-native";
import { LiturgyPart } from "../../types";
import { useActivePrayer } from "../../hooks/useActivePrayer";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { getCopticDate } from "../../utils/CopticCalendar";
import { Drawer } from "react-native-paper";
import { DrawerItem, DrawerContentScrollView } from "@react-navigation/drawer";
export const DrawerContent = () => {
    const { liturgy } = useActivePrayer();

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
    const { activeRef, setActiveRef } = useActivePrayer();
    const navigation = useNavigation();

    return (
        <View style={{ marginBottom: 10 }}>
            <Drawer.Section title={title}>
                {prayers.map(({ prayerRef, title }, i) => (
                    <Drawer.Item
                        key={i}
                        label={`${i + 1}. ${title.english}`}
                        active={prayerRef === activeRef}
                        onPress={() => {
                            prayerRef && setActiveRef(prayerRef);
                            navigation.dispatch(DrawerActions.toggleDrawer());
                        }}
                    />
                ))}
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
