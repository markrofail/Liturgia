import React, { useEffect, useRef } from "react";
import { FlatList } from "react-native";
import liturgy from "../../data/st-basil-liturgy";
import { Prayer } from "../../types";
import { useGlobalRefs } from "../../hooks/useGlobalRefs";
import { DrawerActions } from "@react-navigation/routers";
import { useNavigation } from "@react-navigation/core";
import { SafeAreaView } from "react-native-safe-area-context";
import { DrawerHeader } from "./DrawerHeader";
import { Box, HStack, Pressable, Text, VStack } from "@gluestack-ui/themed";

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
        <SafeAreaView style={{ flex: 1, backgroundColor: "black", paddingHorizontal: 12 }}>
            <DrawerHeader />

            <FlatList
                ref={scrollRef}
                data={prayers}
                keyExtractor={(prayer) => prayer.id}
                renderItem={({ item, index }) => (
                    <Box marginBottom={12}>
                        {getSectionTitle(item.id) && (
                            <Box paddingTop={index !== 0 ? 14 : undefined} paddingBottom={6}>
                                <Text color="$white" size="lg" bold>
                                    {getSectionTitle(item.id)}
                                </Text>
                            </Box>
                        )}
                        <MenuEntry index={index} prayer={item} />
                    </Box>
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
        <Pressable
            bgColor={isActive ? "white" : "transparent"}
            paddingVertical={6}
            paddingHorizontal={20}
            borderRadius="$full"
            onPress={() => {
                toggleDrawer();
                setCurrentPrayerId(id);
            }}
        >
            <HStack alignItems="center" space="lg">
                <Text size="xl" color={isActive ? "$black" : "$white"}>
                    {index + 1}
                </Text>
                <VStack>
                    <Text color={isActive ? "$black" : "$white"} direction="ltr">
                        {title.english}
                    </Text>
                    <Text color={isActive ? "$black" : "$white"} direction="ltr">
                        {title.arabic}
                    </Text>
                </VStack>
            </HStack>
        </Pressable>
    );
};
