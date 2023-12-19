import React, { useEffect, useRef } from "react";
import { ViewToken, FlatList, SafeAreaView } from "react-native";
import { Prayer } from "../../components/Prayer";
import liturgy from "../../data/st-basil-liturgy";
import { useGlobalRefs } from "../../hooks/useGlobalRefs";
import { Prayer as PrayerT } from "src/types";
import { Text } from "../../components/Text";
import { Stack } from "../../components/Stack";

export const HomeScreen = () => {
    const { currentPrayerId, setCurrentPrayerId, liturgyContainerRef: scrollRef } = useGlobalRefs();
    const prayers = liturgy.flatMap(({ prayers }) => prayers);

    useEffect(() => {
        console.debug(JSON.stringify({ event: "onCurrentPrayerIdChange (screen)", currentPrayerId }));

        const currentPrayer = prayers.find(({ id }) => id === currentPrayerId);
        scrollRef?.current?.scrollToItem({ item: currentPrayer, animated: false });
    }, [currentPrayerId]);

    const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: Array<ViewToken> }) => {
        const visiblePrayer = viewableItems[0].item as PrayerT;
        console.debug(
            JSON.stringify({ event: "onVisiblePrayerChanged", visiblePrayer: visiblePrayer.id, currentPrayerId })
        );

        if (visiblePrayer.id !== currentPrayerId) setCurrentPrayerId(visiblePrayer.id);
    }).current;

    const getSectionTitle = (prayerId: string) => liturgy.find(({ prayers }) => prayers[0].id === prayerId)?.title;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
            <FlatList
                ref={scrollRef}
                data={prayers}
                keyExtractor={(prayer) => prayer.id}
                renderItem={({ item }) => (
                    <>
                        {getSectionTitle(item.id) && (
                            <Stack spaceBelow="m">
                                <Text variant="title" language="english" text={getSectionTitle(item.id)} />
                            </Stack>
                        )}
                        <Prayer {...item} />
                    </>
                )}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={{
                    itemVisiblePercentThreshold: 100,
                    minimumViewTime: 200,
                }}
                initialNumToRender={1000}
            />
        </SafeAreaView>
    );
};
