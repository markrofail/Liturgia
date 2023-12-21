import React, { useCallback, useEffect, useRef } from "react";
import { ViewToken, FlatList, SafeAreaView } from "react-native";
import { Prayer } from "../../components/Prayer";
import liturgy from "../../data/st-basil-liturgy";
import { useGlobalRefs } from "../../hooks/useGlobalRefs";
import { Prayer as PrayerT } from "src/types";
import { Text, Stack } from "../../components";

const getSectionTitle = (prayerId: string) => liturgy.find(({ prayers }) => prayers[0].id === prayerId)?.title;

export const HomeScreen = () => {
    const { currentPrayerId, setCurrentPrayerId, liturgyContainerRef: scrollRef } = useGlobalRefs();
    const prayers = liturgy.flatMap(({ prayers }) => prayers);

    useEffect(() => {
        console.debug(JSON.stringify({ event: "onCurrentPrayerIdChange (screen)", currentPrayerId }));

        const currentPrayer = prayers.find(({ id }) => id === currentPrayerId);
        scrollRef?.current?.scrollToItem({ item: currentPrayer, animated: false });
    }, [currentPrayerId]);

    const onViewableItemsChanged = ({ viewableItems }: { viewableItems: Array<ViewToken> }) => {
        const visiblePrayer = viewableItems[0].item as PrayerT;
        console.debug(
            JSON.stringify({ event: "onVisiblePrayerChanged", visiblePrayer: visiblePrayer.id, currentPrayerId })
        );

        if (visiblePrayer.id !== currentPrayerId) setCurrentPrayerId(visiblePrayer.id);
    };
    const onViewableItemsChangedRef = useRef(onViewableItemsChanged);

    const renderItem = useCallback(
        ({ item: prayer }: { item: PrayerT }) => (
            <>
                {getSectionTitle(prayer.id) && (
                    <Stack spaceBelow="m">
                        <Text variant="title" language="english" text={getSectionTitle(prayer.id)} />
                    </Stack>
                )}
                <Prayer {...prayer} />
            </>
        ),
        []
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
            <FlatList
                ref={scrollRef}
                data={prayers}
                keyExtractor={(prayer) => prayer.id}
                renderItem={renderItem}
                onViewableItemsChanged={onViewableItemsChangedRef.current}
                viewabilityConfig={{
                    itemVisiblePercentThreshold: 100,
                    minimumViewTime: 200,
                }}
                initialNumToRender={prayers.length}
            />
        </SafeAreaView>
    );
};
