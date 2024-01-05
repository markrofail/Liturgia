import React, { useCallback, useEffect, useRef, useState } from "react";
import { ViewToken, FlatList, View } from "react-native";
import { Prayer } from "@/components/Prayer";
import { useGlobalRefs } from "@/hooks/useGlobalRefs";
import { Liturgy, Prayer as PrayerT } from "@/types";
import { Text, Stack } from "@/components";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getLiturgy } from "@/utils/getLiturgy";

const ListItem = ({ title, prayer }: { title?: string; prayer: PrayerT }) => {
    return (
        <>
            {title && (
                <Stack spaceBelow="m">
                    <Text variant="title" language="english" text={title} />
                </Stack>
            )}
            <Prayer {...prayer} />
        </>
    );
};

export const HomeScreen = () => {
    const insets = useSafeAreaInsets();
    const { currentPrayerId, setCurrentPrayerId, liturgyContainerRef: scrollRef } = useGlobalRefs();
    const [liturgy, setLiturgy] = useState<Liturgy>();
    const prayers = liturgy ? liturgy.flatMap(({ prayers }) => prayers) : [];

    useEffect(() => {
        getLiturgy().then(setLiturgy);
    }, []);

    useEffect(() => {
        prayers.length > 0 && setCurrentPrayerId(prayers[0].id);
    }, [prayers.length > 0]);

    useEffect(() => {
        const index = prayers.findIndex(({ id }) => id === currentPrayerId);
        if (index > -1) scrollRef?.current?.scrollToIndex({ index, animated: false });
    }, [currentPrayerId]);

    const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: Array<ViewToken> }) => {
        const visiblePrayerId = (viewableItems[0]?.item as PrayerT)?.id;
        if (!!visiblePrayerId && visiblePrayerId !== currentPrayerId) setCurrentPrayerId(visiblePrayerId);
    }).current;

    const getSectionTitle = (prayerId: string) =>
        liturgy && liturgy.find(({ prayers }) => prayers[0].id === prayerId)?.title;

    const renderItem = useCallback(
        ({ item: prayer }: { item: PrayerT }) => (
            <ListItem title={getSectionTitle(prayer.id)} prayer={prayer} key={prayer.id} />
        ),
        []
    );

    if (!liturgy) return null;
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
