import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ViewToken, FlatList, View } from "react-native";
import { Prayer } from "@/components/Prayer";
import { useGlobalRefs } from "@/hooks/useGlobalRefs";
import { Prayer as PrayerT } from "@/types";
import { Text, Stack } from "@/components";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Prayer as NewPrayer, getLiturgy } from "@/utils/getLiturgy";

export const HomeScreen = () => {
    const insets = useSafeAreaInsets();
    const { currentPrayerId, setCurrentPrayerId, liturgyContainerRef: scrollRef } = useGlobalRefs();

    const liturgy = useMemo(() => getLiturgy(), []);
    const prayers = useMemo(() => liturgy.flatMap(({ prayers }) => prayers), [liturgy]);

    useEffect(() => {
        liturgy && setCurrentPrayerId(prayers[0].id);
    }, [!liturgy]);

    useEffect(() => {
        const index = prayers.findIndex(({ id }) => id === currentPrayerId);
        if (index > -1) scrollRef?.current?.scrollToIndex({ index, animated: false });
    }, [currentPrayerId]);

    const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: Array<ViewToken> }) => {
        const visiblePrayerId = (viewableItems[0]?.item as PrayerT)?.id;
        if (!!visiblePrayerId && visiblePrayerId !== currentPrayerId) setCurrentPrayerId(visiblePrayerId);
    }).current;

    const getSectionTitle = (prayerId: string) => liturgy.find(({ prayers }) => prayers[0].id === prayerId)?.title;

    const renderItem = useCallback(
        ({ item }: { item: NewPrayer }) => <ListItem key={item.id} title={getSectionTitle(item.id)} prayer={item} />,
        [],
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

interface ListItemProps {
    title?: string;
    prayer: NewPrayer;
}
const ListItem = ({ title, prayer }: ListItemProps) => {
    const [data, setData] = useState<PrayerT>();
    useEffect(() => {
        prayer.content.then(setData);
    }, []);

    if (!data) return null;
    return (
        <>
            {!!title && (
                <Stack spaceBelow="m">
                    <Text variant="title" language="english" text={title} />
                </Stack>
            )}
            {data && <Prayer {...data} />}
        </>
    );
};
