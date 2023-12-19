import React, { useEffect, useRef } from "react";
import { Drawer, Icon, IconButton, TouchableRipple } from "react-native-paper";
import { FlatList, View } from "react-native";
import { getCopticDate } from "../../utils/copticCalendar";
import liturgy from "../../data/st-basil-liturgy";
import { Prayer } from "../../types";
import { useGlobalRefs } from "../../hooks/useGlobalRefs";
import { Text } from "../../components/Text";
import { MultiLingualText } from "../../components/MultiLingualText";
import { DrawerActions } from "@react-navigation/routers";
import { useNavigation } from "@react-navigation/core";
import { Stack } from "../../components/Stack";
import { SafeAreaView } from "react-native-safe-area-context";

export const DrawerContent = () => {
    const { currentPrayerId, toggleSettingsOpen } = useGlobalRefs();
    const scrollRef = useRef<FlatList>(null);
    const prayers = liturgy.flatMap(({ prayers }) => prayers);

    useEffect(() => {
        console.debug(JSON.stringify({ event: "onCurrentPrayerIdChange (drawer)", currentPrayerId }));

        const currentPrayer = prayers.find(({ id }) => id === currentPrayerId);
        scrollRef?.current?.scrollToItem({ item: currentPrayer, animated: false });
    }, [currentPrayerId]);

    const getSectionTitle = (prayerId: string) => liturgy.find(({ prayers }) => prayers[0].id === prayerId)?.title;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "black", paddingHorizontal: 12, height: 300 }}>
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
                    <IconButton icon="cog" onPress={toggleSettingsOpen} />
                </View>
            </Drawer.Section>

            <FlatList
                ref={scrollRef}
                data={prayers}
                keyExtractor={(prayer) => prayer.id}
                renderItem={({ item, index }) => (
                    <>
                        {getSectionTitle(item.id) && (
                            <Stack spaceBelow="m">
                                <Text variant="menuEntry" language="english" text={getSectionTitle(item.id)} />
                            </Stack>
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
        </SafeAreaView>
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
            <Stack direction="row" gap="s">
                <Text variant="menuEntryIndex" inverse={isActive} text={`${index + 1}`} />
                <MultiLingualText
                    direction="column"
                    variant="menuEntry"
                    inverse={isActive}
                    text={{ english: title.english, arabic: title.arabic }}
                />
            </Stack>
        </TouchableRipple>
    );
};
