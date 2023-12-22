import React, { useCallback, useEffect, useRef } from "react";
import { ViewToken, FlatList, View } from "react-native";
import { Prayer } from "@/components/Prayer";
import liturgy from "@/data/st-basil-liturgy";
import { useGlobalRefs } from "@/hooks/useGlobalRefs";
import { Prayer as PrayerT } from "@/types";
import { Text, Stack } from "@/components";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const getSectionTitle = (prayerId: string) => liturgy.find(({ prayers }) => prayers[0].id === prayerId)?.title;

const ListItem = (prayer: PrayerT) => {
    return (
        <>
            {getSectionTitle(prayer.id) && (
                <Stack spaceBelow="m">
                    <Text variant="title" language="english" text={getSectionTitle(prayer.id)} />
                </Stack>
            )}
            <Prayer {...prayer} />
        </>
    );
};

export const HomeScreen = () => {
    const insets = useSafeAreaInsets();
    const { currentPrayerId, setCurrentPrayerId, liturgyContainerRef: scrollRef } = useGlobalRefs();
    const prayers = liturgy.flatMap(({ prayers }) => prayers);

    useEffect(() => {
        setCurrentPrayerId(prayers[0].id);
    }, []);

    useEffect(() => {
        const index = prayers.findIndex(({ id }) => id === currentPrayerId);
        if (index > -1) scrollRef?.current?.scrollToIndex({ index, animated: false });
    }, [currentPrayerId]);

    const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: Array<ViewToken> }) => {
        const visiblePrayerId = (viewableItems[0]?.item as PrayerT)?.id;
        if (!!visiblePrayerId && visiblePrayerId !== currentPrayerId) setCurrentPrayerId(visiblePrayerId);
    }).current;

    const renderItem = useCallback(({ item: prayer }: { item: PrayerT }) => <ListItem {...prayer} />, []);

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "black",
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
                paddingLeft: insets.left + 12,
                paddingRight: insets.right + 12,
            }}
        >
            <FlatList
                ref={scrollRef}
                data={prayers}
                keyExtractor={(prayer) => prayer.id}
                renderItem={renderItem}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={{
                    viewAreaCoveragePercentThreshold: 90,
                    minimumViewTime: 50,
                }}
                initialNumToRender={prayers.length}
                removeClippedSubviews
            />
        </View>
    );
};
