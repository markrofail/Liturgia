import React, { useCallback, useEffect, useRef, useState } from "react";
import { ViewToken, FlatList, View } from "react-native";
import { Prayer } from "@/components/Prayer";
import { useGlobalRefs } from "@/hooks/useGlobalRefs";
import { Prayer as PrayerT } from "@/types";
import { Text, Stack } from "@/components";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getLiturgy } from "@/utils/getLiturgy";

const ListItem = ({ title, content }: { title?: string; content: Promise<PrayerT> }) => {
    const [data, setData] = useState<PrayerT>();
    useEffect(() => {
        content.then(setData);
    }, []);

    return (
        <>
            {title && (
                <Stack spaceBelow="m">
                    <Text variant="title" language="english" text={title} />
                </Stack>
            )}
            {data && <Prayer {...data} />}
        </>
    );
};

type Liturgy = {
    title: string;
    prayers: {
        id: string;
        content: Promise<Omit<PrayerT, "id">>;
    }[];
}[];

export const HomeScreen = () => {
    const insets = useSafeAreaInsets();
    const { currentPrayerId, setCurrentPrayerId, liturgyContainerRef: scrollRef } = useGlobalRefs();
    const [liturgy, setLiturgy] = useState<Liturgy>();
    const prayers = liturgy ? liturgy.flatMap(({ prayers }) => prayers) : [];

    useEffect(() => {
        const data = getLiturgy();
        console.log(data);
        setLiturgy(data);
    }, []);

    useEffect(() => {
        liturgy && setCurrentPrayerId(liturgy[0].prayers[0].id);
    }, [!liturgy]);

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
        ({ item: prayer }: { item: { id: string; content: Promise<PrayerT> } }) => (
            <ListItem title={getSectionTitle(prayer.id)} content={prayer.content} key={prayer.id} />
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
                onScrollToIndexFailed={(error) => {
                    if (!scrollRef?.current) return;
                    scrollRef.current.scrollToOffset({
                        offset: error.averageItemLength * error.index,
                        animated: false,
                    });
                    setTimeout(() => {
                        if (liturgy.length !== 0 && scrollRef.current !== null) {
                            scrollRef.current.scrollToIndex({ index: error.index, animated: false });
                        }
                    }, 100);
                }}
                initialNumToRender={3}
                removeClippedSubviews
            />
        </View>
    );
};
