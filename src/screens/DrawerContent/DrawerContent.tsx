import React, { useEffect, useRef } from "react";
import { Drawer, Icon, TouchableRipple } from "react-native-paper";
import { FlatList, View } from "react-native";
import { getCopticDate } from "../../utils/copticCalendar";
import liturgy from "../../data/st-basil-liturgy";
import { Prayer } from "../../types";
import { useGlobalRefs } from "../../hooks/useGlobalRefs";
import { Text } from "../../components/Text";
import { DrawerActions } from "@react-navigation/routers";
import { useNavigation } from "@react-navigation/core";
import { ZOOM_MULTIPLIER } from "../../constants";

export const DrawerContent = () => {
    const { currentPrayerId } = useGlobalRefs();
    const scrollRef = useRef<FlatList>(null);
    const prayers = liturgy.flatMap(({ prayers }) => prayers);

    useEffect(() => {
        console.debug(JSON.stringify({ event: "onCurrentPrayerIdChange (drawer)", currentPrayerId }));

        const currentPrayer = prayers.find(({ id }) => id === currentPrayerId);
        scrollRef?.current?.scrollToItem({ item: currentPrayer, animated: false });
    }, [currentPrayerId]);

    const getSectionTitle = (prayerId: string) => liturgy.find(({ prayers }) => prayers[0].id === prayerId)?.title;

    return (
        <View style={{ flex: 1, backgroundColor: "black", paddingHorizontal: 12, height: 300 }}>
            <Drawer.Section>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 25,
                        paddingVertical: 20,
                    }}
                >
                    <CopticDate />
                </View>
            </Drawer.Section>

            <FlatList
                ref={scrollRef}
                data={prayers}
                keyExtractor={(prayer) => prayer.id}
                renderItem={({ item, index }) => (
                    <>
                        {getSectionTitle(item.id) && (
                            <View
                                style={{
                                    marginTop: index !== 0 ? 25 * ZOOM_MULTIPLIER : undefined,
                                    marginBottom: 10 * ZOOM_MULTIPLIER,
                                }}
                            >
                                <Text variant="menuEntry" language="english" text={getSectionTitle(item.id)} />
                            </View>
                        )}
                        <MenuEntry index={index} prayer={item} />
                    </>
                )}
                initialNumToRender={prayers.length}
                viewabilityConfig={{
                    itemVisiblePercentThreshold: 100,
                    minimumViewTime: 200,
                }}
            />
        </View>
    );
};

const CopticDate = () => {
    const { day, month, year } = getCopticDate();

    return (
        <View
            style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 10,
            }}
        >
            <Icon source="calendar" size={20} />
            <Text variant="date" language="english" text={`${day} ${month} ${year}`} />
        </View>
    );
};

interface MenuEntry {
    index: number;
    prayer: Prayer;
}
const MenuEntry = ({ index, prayer: { id, title } }: MenuEntry) => {
    const navigation = useNavigation();
    const { currentPrayerId, setCurrentPrayerId } = useGlobalRefs();
    const toggleDrawer = () => navigation.dispatch(DrawerActions.toggleDrawer());
    const isActive = id === currentPrayerId;

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
                toggleDrawer();
                setCurrentPrayerId(id);
            }}
        >
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                <Text variant="menuEntryIndex" inverse={isActive} text={`${index + 1}`} />
                <View>
                    <Text variant="menuEntry" language="english" inverse={isActive} text={title.english} />
                    <Text variant="menuEntry" language="arabic" inverse={isActive} text={title.arabic} />
                </View>
            </View>
        </TouchableRipple>
    );
};
