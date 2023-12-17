import React, { Fragment, useEffect, useRef, useState } from "react";
import { View, ScrollView } from "react-native";
import { Prayer } from "../../components/Prayer";
import liturgy from "../../data/st-basil-liturgy";
import { ZOOM_MULTIPLIER } from "../../constants";
import { useGlobalRefs } from "../../hooks/useGlobalRefs";
import { Text } from "../../components/Text";
import { measureComponents } from "../../utils/measureComponents";

export const HomeScreen = () => {
    const [currentY, setCurrentY] = useState(0);
    const { currentPrayerId, setCurrentPrayerId, liturgyContainerRef } = useGlobalRefs();

    const prayers = liturgy.flatMap(({ prayers }) => prayers);
    const prayerIds = prayers.map(({ id }) => id);
    const prayerRefMap = Object.fromEntries(prayers.map((prayer) => [prayer.id, useRef<View>(null)]));

    useEffect(() => {
        setCurrentPrayerId(prayerIds[0]);
    }, []);

    useEffect(() => {
        async function updateScrollPosition() {
            const prayerMap = await measureComponents(prayerRefMap);

            const nextPrayer = prayerIds[prayerIds.indexOf(currentPrayerId) + 1];
            const nextY = prayerMap[nextPrayer].y;

            const activeY = prayerMap[currentPrayerId].y;
            const activePrayerBounds = { top: activeY, bottom: nextY };

            const shouldScroll = currentY < activePrayerBounds.top || currentY > activePrayerBounds.bottom;
            if (shouldScroll) {
                liturgyContainerRef?.current?.scrollTo({ y: activeY, animated: false });
            }
            // console.log(JSON.stringify({ activeY, shouldScroll }));
        }

        currentPrayerId && updateScrollPosition();
    }, [currentPrayerId]);

    useEffect(() => {
        async function updateActivePrayer() {
            const prayerMap = await measureComponents(prayerRefMap);

            const nextPrayer = prayerIds[prayerIds.indexOf(currentPrayerId) + 1];
            const nextY = prayerMap[nextPrayer].y;

            const prevPrayer = prayerIds[prayerIds.indexOf(currentPrayerId) - 1];
            const activeY = prayerMap[currentPrayerId].y;

            if (currentY > nextY) {
                setCurrentPrayerId(nextPrayer);
            } else if (currentY < activeY) {
                setCurrentPrayerId(prevPrayer);
            }
        }

        currentPrayerId && updateActivePrayer();
    }, [currentY]);

    return (
        <View style={{ flex: 1, backgroundColor: "black" }}>
            <ScrollView
                ref={liturgyContainerRef}
                style={{ flex: 1, paddingHorizontal: 12 }}
                scrollEventThrottle={30}
                contentContainerStyle={{ flexGrow: 1 }}
                onScroll={(event) => setCurrentY(event.nativeEvent.contentOffset.y)}
            >
                {liturgy.map(({ title, prayers }) => (
                    <Fragment key={title}>
                        {prayers.map((prayer, i) => (
                            <Fragment key={prayer.id}>
                                {i === 0 && (
                                    <View style={{ marginBottom: 18 * ZOOM_MULTIPLIER }}>
                                        <Text variant="title" language="english" text={title} />
                                    </View>
                                )}
                                <Prayer {...prayer} ref={prayerRefMap[prayer.id]} />
                            </Fragment>
                        ))}
                    </Fragment>
                ))}
            </ScrollView>
        </View>
    );
};
