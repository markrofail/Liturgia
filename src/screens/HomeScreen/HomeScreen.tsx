import React, { useEffect, useRef, useState } from "react";
import { NativeScrollEvent, NativeSyntheticEvent, ScrollView, View } from "react-native";
import { useActivePrayer } from "../../hooks/useActivePrayer";
import { Prayer } from "../../components/Prayer";
import liturgy from "../../../resources/prayers/st-basil-liturgy";

export const HomeScreen = () => {
    const scrollRef = useRef<ScrollView>();
    const [currentY, setCurrentY] = useState(0);
    const { activeId, setActiveId } = useActivePrayer();
    const [prayerMap, setPrayerMap] = useState<Record<string, number>>({});

    useEffect(() => {
        setActiveId(liturgy[0].prayers[0].id);
    }, []);

    useEffect(() => {
        const prayerIds = Object.keys(prayerMap);

        const nextPrayer = prayerIds[prayerIds.indexOf(activeId) + 1];
        const nextY = prayerMap[nextPrayer];

        const activeY = prayerMap[activeId];
        const activePrayerBounds = { top: activeY, bottom: nextY };

        if (currentY < activePrayerBounds.top || currentY > activePrayerBounds.bottom) {
            scrollRef?.current?.scrollTo({ y: prayerMap[activeId], animated: false });
        }
    }, [activeId]);

    const handleScrollChange = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const scrollY = event.nativeEvent.contentOffset.y;
        setCurrentY(scrollY);

        const prayerIds = Object.keys(prayerMap);
        const activeY = prayerMap[activeId];

        const nextPrayer = prayerIds[prayerIds.indexOf(activeId) + 1];
        const nextY = prayerMap[nextPrayer];

        const prevPrayer = prayerIds[prayerIds.indexOf(activeId) - 1];

        if (scrollY > nextY) {
            setActiveId(nextPrayer);
        } else if (scrollY < activeY - 10) {
            setActiveId(prevPrayer);
        }
    };

    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "flex-start",
                backgroundColor: "black",
            }}
        >
            <ScrollView
                ref={scrollRef}
                style={{ width: "100%", padding: 20 }}
                scrollEventThrottle={16}
                onScroll={handleScrollChange}
            >
                {liturgy
                    .flatMap(({ prayers }) => prayers)
                    .map((prayer) => (
                        <Prayer
                            {...prayer}
                            key={prayer.id}
                            onLayout={(event) => {
                                setPrayerMap((prayerMap) => ({
                                    ...prayerMap,
                                    [prayer.id]: event?.nativeEvent?.layout?.y,
                                }));
                            }}
                        />
                    ))}
            </ScrollView>
        </View>
    );
};
