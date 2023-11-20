import React, { useEffect, useRef, useState } from "react";
import { ScrollView, View } from "react-native";
import { useScrollIntoView, wrapScrollView } from "react-native-scroll-into-view";
import { useActivePrayer } from "../../hooks/useActivePrayer";
import { loadLiturgy } from "../../utils/LiturgyLoader";
import { Prayer } from "../../components/Prayer";

const CustomScrollView = wrapScrollView(ScrollView);

export const HomeScreen = () => {
    const [currentY, setCurrentY] = useState(0);

    return (
        <View
            style={{
                flex: 1,
                padding: 25,
                alignItems: "center",
                justifyContent: "flex-start",
                backgroundColor: "black",
            }}
        >
            <CustomScrollView
                onScroll={(event) => {
                    setCurrentY(event.nativeEvent.contentOffset.y);
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

    const liturgy = loadLiturgy();
    const prayers = liturgy.flatMap(({ prayers }) => prayers);
    const prayerRefMap = Object.fromEntries(prayers.map(({ id }) => [id, useRef<View>()]));

    useEffect(() => {
        setActiveId(prayers[0].id);
    }, []);

    useEffect(() => {
        const prayerIds = Object.keys(prayerMap);

        const nextPrayer = prayerIds[prayerIds.indexOf(activeId) + 1];
        const nextY = prayerMap[nextPrayer];

        const activeY = prayerMap[activeId];
        const activePrayerBounds = { top: activeY, bottom: nextY - 1 };

        const newRef = prayerRefMap[activeId];
        if (scrollY < activePrayerBounds.top || scrollY > activePrayerBounds.bottom) {
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
        } else if (scrollY < activeY - 35) {
            setActiveId(prevPrayer);
        }
    }, [scrollY]);

    return (
        <>
            {prayers.map((prayer) => (
                <Prayer
                    {...prayer}
                    key={prayer.id}
                    ref={prayerRefMap[prayer.id]}
                    onLayout={(event: any) => {
                        const y = event.nativeEvent.layout.y;
                        setPrayerMap((prayerMap) => ({ ...prayerMap, [prayer.id]: y }));
                    }}
                />
            ))}
        </>
    );
};
