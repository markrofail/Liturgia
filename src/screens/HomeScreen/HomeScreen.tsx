import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { ViewToken, FlatList, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Prayer } from "@src/components/Prayer";
import { useGlobalRefs } from "@src/hooks/useGlobalRefs";
import { Prayer as PrayerT } from "@src/types";
import { Stack, MultiLingualText } from "@src/components";
import { DataEntry, Prayer as NewPrayer, getLiturgy } from "@src/utils/getLiturgy";

export const HomeScreen = () => {
    const { currentPrayerId, setCurrentPrayerId, liturgyContainerRef: scrollRef } = useGlobalRefs();

    const data = useMemo(() => getLiturgy(), []);
    const prayers = useMemo(() => data.filter(({ type }) => type === "data") as NewPrayer[], [data]);

    useEffect(() => {
        data && setCurrentPrayerId(prayers[0].id);
    }, [!data]);

    useEffect(() => {
        const index = data.findIndex(({ id }) => id === currentPrayerId);
        if (index > -1) scrollRef?.current?.scrollToIndex({ index, animated: false });
    }, [currentPrayerId]);

    const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: Array<ViewToken> }) => {
        const visiblePrayerId = (viewableItems[0]?.item as PrayerT)?.id;
        if (!!visiblePrayerId && visiblePrayerId !== currentPrayerId) setCurrentPrayerId(visiblePrayerId);
    }).current;

    const renderItem = useCallback(
        ({ item }: { item: DataEntry }) => (
            <Stack spaceBelow="m">
                {item.type === "title" ? (
                    <MultiLingualText variant="title" text={item.title!} />
                ) : (
                    <Prayer key={item.id} prayer={item} />
                )}
            </Stack>
        ),
        []
    );

    const insets = useSafeAreaInsets();
    const padding = {
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left + 12,
        paddingRight: insets.right + 12,
    };

    if (!data) return null;
    return (
        <View style={{ flex: 1, backgroundColor: "black", ...padding }}>
            <FlatList
                ref={scrollRef}
                data={data}
                keyExtractor={(item) => item.id!}
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
