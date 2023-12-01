import React, { useEffect, useRef, useState } from "react";
import { Icon, Text, TouchableRipple } from "react-native-paper";
import { ScrollView, View } from "react-native";
import { useActivePrayer } from "../../hooks/useActivePrayer";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { getCopticDate } from "../../utils/CopticCalendar";
import { Drawer } from "react-native-paper";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import liturgy from "../../../resources/prayers/st-basil-liturgy";
import { Liturgy, Prayer } from "../../types";

export const DrawerContent = () => {
    const { activeId } = useActivePrayer();
    const scrollRef = useRef<ScrollView>();
    const [prayerMap, setPrayerMap] = useState<Record<string, number>>({});

    useEffect(() => {
        scrollRef?.current?.scrollTo({ y: prayerMap[activeId], animated: false });
    }, [activeId]);

    return (
        <View style={{ flex: 1, backgroundColor: "black", padding: 20 }}>
            <CopticDate />
            <DrawerContentScrollView ref={scrollRef}>
                {(liturgy as Liturgy).map(({ title, prayers }) => (
                    <Drawer.Section title={title} key={title} style={{ marginBottom: 10 }}>
                        {prayers.map((prayer, i) => (
                            <View
                                key={prayer.id}
                                onLayout={(event: any) => {
                                    setPrayerMap((prayerMap) => ({
                                        ...prayerMap,
                                        [prayer.id]: event?.nativeEvent?.layout?.y,
                                    }));
                                }}
                            >
                                <MenuEntry index={i} prayer={prayer} />
                            </View>
                        ))}
                    </Drawer.Section>
                ))}
            </DrawerContentScrollView>
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
                    {!!title.english && <Text style={textStyles}>{title.english}</Text>}
                    {!!title.arabic && (
                        <Text style={{ ...textStyles, fontFamily: "Rubik_400Regular" }}>{title.arabic}</Text>
                    )}
                </View>
            </View>
        </TouchableRipple>
    );
};
