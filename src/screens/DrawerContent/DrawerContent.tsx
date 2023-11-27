import React, { useEffect, useMemo, useRef } from "react";
import { Icon, Text, TouchableRipple } from "react-native-paper";
import { View } from "react-native";
import { useActivePrayer } from "../../hooks/useActivePrayer";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { getCopticDate } from "../../utils/CopticCalendar";
import { Drawer } from "react-native-paper";
import { useScrollIntoView, wrapScrollView } from "react-native-scroll-into-view";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import liturgy from "../../../resources/prayers/st-basil-liturgy";
import { Liturgy, Prayer } from "../../types";

const CustomScrollView = wrapScrollView(DrawerContentScrollView);

export const DrawerContent = () => {
    return (
        <View style={{ flex: 1, backgroundColor: "black", padding: 20 }}>
            <CopticDate />
            <CustomScrollView>
                <ScrollViewContent />
            </CustomScrollView>
        </View>
    );
};

const CopticDate = () => {
    const { day, month, year } = getCopticDate();

    return (
        <Drawer.Section>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: 10,
                    gap: 10,
                }}
            >
                <Icon source="calendar" size={20} />
                <Text variant="bodyLarge" style={{ fontWeight: "bold" }}>
                    {day} {month} {year}
                </Text>
            </View>
        </Drawer.Section>
    );
};

const ScrollViewContent = () => {
    const { activeId } = useActivePrayer();
    const scrollIntoView = useScrollIntoView();

    const prayerRefMap = Object.fromEntries(
        liturgy.flatMap(({ prayers }) => prayers).map(({ id }) => [id, useRef<View>()])
    );

    useEffect(() => {
        const newRef = prayerRefMap[activeId];
        newRef?.current && scrollIntoView(newRef.current, { animated: false });
    }, [activeId]);

    return (
        <>
            {(liturgy as Liturgy).map(({ title, prayers }) => (
                <View key={title} style={{ marginBottom: 10 }}>
                    <Drawer.Section title={title}>
                        <View style={{ marginLeft: 25 }}>
                            {prayers.map((prayer, i) => (
                                <View key={prayer.id} ref={prayerRefMap[prayer.id]}>
                                    <MenuEntry prayer={prayer} index={i} />
                                </View>
                            ))}
                        </View>
                    </Drawer.Section>
                </View>
            ))}
        </>
    );
};

interface MenuEntry {
    index: number;
    prayer: Prayer;
}
const MenuEntry = ({ index, prayer: { id, title } }: MenuEntry) => {
    const { activeId, setActiveId } = useActivePrayer();
    const navigation = useNavigation();

    const isActive = id === activeId;
    const textStyles = { color: isActive ? "black" : "white" };

    return (
        <TouchableRipple
            borderless
            style={{
                paddingVertical: 8,
                paddingHorizontal: 20,
                borderRadius: 100,
                backgroundColor: isActive ? "white" : "transparent",
            }}
            onPress={() => {
                setActiveId(id);
                navigation.dispatch(DrawerActions.toggleDrawer());
            }}
        >
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                <Text style={{ ...textStyles, fontSize: 20 }}>{index + 1}</Text>
                <View>
                    {title.english && <Text style={textStyles}>{title.english}</Text>}
                    {title.arabic && (
                        <Text style={{ ...textStyles, fontFamily: "Rubik_400Regular" }}>{title.arabic}</Text>
                    )}
                </View>
            </View>
        </TouchableRipple>
    );
};
