import React, { useEffect, useRef, useState } from "react";
import { ScrollView, View } from "react-native";
import { useScrollIntoView, wrapScrollView } from "react-native-scroll-into-view";
import { useActivePrayer } from "../../hooks/useActivePrayer";
import { Prayer } from "../../components/Prayer";
import liturgy from "../../../resources/prayers/st-basil-liturgy";
import { ZOOM_MULTIPLIER } from "../../constants";

const CustomScrollView = wrapScrollView(ScrollView);
const SPACE_BETWEEN_PRAYERS = 10 * ZOOM_MULTIPLIER;

export const HomeScreen = () => {
    const [currentY, setCurrentY] = useState(0);

    return (
        <View
            style={{
                flex: 1,
                width: "100%",
                alignItems: "center",
                justifyContent: "flex-start",
                backgroundColor: "black",
            }}
        >
            <CustomScrollView
                onScroll={(event) => {
                    const { y } = event.nativeEvent.contentOffset;
                    setCurrentY(y);
                }}
            >
                <ScrollViewContent scrollY={currentY} />
            </CustomScrollView>
        </View>
    );
};

const ScrollViewContent = ({ scrollY }: { scrollY: number }) => {
    const { activeId, setActiveId } = useActivePrayer();
    const [prayerMap, setPrayerMap] = useState<Record<string, number>>({});
    const scrollIntoView = useScrollIntoView();

    useEffect(() => {
        console.log(JSON.stringify(prayerMap, null, 2));
    }, [prayerMap]);

    const prayerRefMap = Object.fromEntries(
        liturgy.flatMap(({ prayers }) => prayers).map(({ id }) => [id, useRef<View>()])
    );

    useEffect(() => {
        setActiveId(liturgy[0].prayers[0].id);
    }, []);

    useEffect(() => {
        const prayerIds = Object.keys(prayerMap);

        const nextPrayer = prayerIds[prayerIds.indexOf(activeId) + 1];
        const nextY = prayerMap[nextPrayer];

        const activeY = prayerMap[activeId];
        const activePrayerBounds = { top: activeY, bottom: nextY };

        // console.log(JSON.stringify({ activeId, activeY }));
        // console.log(JSON.stringify({ scrollY, activePrayerBounds }));
        // console.log(JSON.stringify({ nextPrayer, nextY }));

        if (scrollY < activePrayerBounds.top || scrollY > activePrayerBounds.bottom) {
            const newRef = prayerRefMap[activeId];
            newRef?.current && scrollIntoView(newRef.current, { animated: false });
        }
    }, [activeId]);

    useEffect(() => {
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
    }, [scrollY]);

    return (
        <>
            {liturgy
                .flatMap(({ prayers }) => prayers)
                .map((prayer) => (
                    <Prayer
                        {...prayer}
                        key={prayer.id}
                        ref={prayerRefMap[prayer.id]}
                        onLayout={(event: any) => {
                            const { y } = event.nativeEvent.layout;
                            setPrayerMap((prayerMap) => ({ ...prayerMap, [prayer.id]: y }));
                        }}
                    />
                ))}
        </>
    );
};
