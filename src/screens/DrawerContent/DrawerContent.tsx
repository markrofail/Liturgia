import React, { useEffect, useRef } from "react";
import { Icon, Text, TouchableRipple, useTheme } from "react-native-paper";
import { View } from "react-native";
import { useActivePrayer } from "../../hooks/useActivePrayer";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { getCopticDate } from "../../utils/CopticCalendar";
import { Drawer } from "react-native-paper";
import { loadLiturgy } from "../../utils/LiturgyLoader";
import { useScrollIntoView, wrapScrollView } from "react-native-scroll-into-view";
import { DrawerContentScrollView } from "@react-navigation/drawer";

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
    const liturgy = loadLiturgy();
    const { activeId, setActiveId } = useActivePrayer();
    const navigation = useNavigation();
    const { colors, roundness } = useTheme();
    const scrollIntoView = useScrollIntoView();

    const prayers = liturgy.flatMap(({ prayers }) => prayers);
    const prayerRefMap = Object.fromEntries(prayers.map(({ id }) => [id, useRef<View>()]));

    useEffect(() => {
        const newRef = prayerRefMap[activeId];
        newRef?.current && scrollIntoView(newRef.current, { animated: false });
    }, [activeId]);

    return (
        <>
            {liturgy.map(({ title, prayers }) => (
                <View key={title} style={{ marginBottom: 10 }}>
                    <Drawer.Section title={title}>
                        <View style={{ marginLeft: 25 }}>
                            {prayers.map(({ id, title }, i) => (
                                <View key={id} ref={prayerRefMap[id]}>
                                    <TouchableRipple
                                        borderless
                                        style={{
                                            marginHorizontal: 10,
                                            marginVertical: 4,
                                            padding: 8,
                                            borderRadius: 7 * roundness,
                                            backgroundColor:
                                                id === activeId ? colors.secondaryContainer : "transparent",
                                        }}
                                        onPress={() => {
                                            setActiveId(id);
                                            navigation.dispatch(DrawerActions.toggleDrawer());
                                        }}
                                    >
                                        <View style={{ flexDirection: "row", gap: 10 }}>
                                            <Text>{i + 1}.</Text>
                                            <View>
                                                {title.english && <Text>{title.english}</Text>}
                                                {title.arabic && (
                                                    <Text style={{ fontFamily: "Rubik_400Regular" }}>
                                                        {title.arabic}
                                                    </Text>
                                                )}
                                            </View>
                                        </View>
                                    </TouchableRipple>
                                </View>
                            ))}
                        </View>
                    </Drawer.Section>
                </View>
            ))}
        </>
    );
};
