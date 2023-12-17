import React, { Fragment, useEffect, useRef } from "react";
import { Drawer, Icon, TouchableRipple } from "react-native-paper";
import { ScrollView, View } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { getCopticDate } from "../../utils/copticCalendar";
import liturgy from "../../data/st-basil-liturgy";
import { Liturgy, Prayer } from "../../types";
import { ZOOM_MULTIPLIER } from "../../constants";
import { useGlobalRefs } from "../../hooks/useGlobalRefs";
import { Text } from "../../components/Text";
import { DrawerActions } from "@react-navigation/routers";
import { useNavigation } from "@react-navigation/core";
import { measureComponents } from "../../utils/measureComponents";

export const DrawerContent = () => {
    const { currentPrayerId } = useGlobalRefs();
    const scrollRef = useRef<ScrollView>(null);

    const prayers: Prayer[] = liturgy.flatMap(({ prayers }) => prayers);
    const prayerRefMap = Object.fromEntries(prayers.map((prayer) => [prayer.id, useRef<View>(null)]));

    useEffect(() => {
        async function updateScrollPosition() {
            const prayerMap = await measureComponents(prayerRefMap);
            const newY = prayerMap[currentPrayerId].y;

            scrollRef?.current?.scrollTo({ y: newY });
        }

        currentPrayerId && updateScrollPosition();
    }, [currentPrayerId]);

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

            <DrawerContentScrollView ref={scrollRef}>
                {(liturgy as Liturgy).map(({ title, prayers }) => (
                    <Fragment key={title}>
                        {prayers.map((prayer, i) => (
                            <Fragment key={prayer.id}>
                                {i === 0 && (
                                    <View
                                        style={{ marginTop: 25 * ZOOM_MULTIPLIER, marginBottom: 10 * ZOOM_MULTIPLIER }}
                                    >
                                        <Text variant="menuEntry" language="english" text={title} />
                                    </View>
                                )}
                                <View ref={prayerRefMap[prayer.id]}>
                                    <MenuEntry index={i} prayer={prayer} />
                                </View>
                            </Fragment>
                        ))}
                    </Fragment>
                ))}
            </DrawerContentScrollView>
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
