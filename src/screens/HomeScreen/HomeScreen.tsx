import React, { MutableRefObject, useEffect, useRef } from "react";
import { ScrollView, View } from "react-native";
import { LiturgyPart } from "../../components/LiturgyPart";
import { useScrollIntoView, wrapScrollView } from "react-native-scroll-into-view";
import { useActivePrayer } from "../../hooks/useActivePrayer";
import { loadLiturgy } from "../../utils/LiturgyLoader";

const CustomScrollView = wrapScrollView(ScrollView);

export const HomeScreen = () => {
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
            <CustomScrollView>
                <ScrollViewContent />
            </CustomScrollView>
        </View>
    );
};

const ScrollViewContent = () => {
    const { activeId } = useActivePrayer();
    const scrollIntoView = useScrollIntoView();

    const liturgy = loadLiturgy();
    liturgy.forEach(({ prayers }) =>
        prayers.forEach((prayer) => {
            prayer.prayerRef = useRef<View>();
        })
    );

    const prayerRefMap = Object.fromEntries(
        liturgy.flatMap(({ prayers }) => prayers.map(({ id, prayerRef }) => [id, prayerRef]))
    );

    useEffect(() => {
        const activeRef = prayerRefMap[activeId];
        activeRef?.current && scrollIntoView(activeRef.current);
    }, [activeId]);

    return (
        <>
            {liturgy.map(({ title, prayers }, i) => (
                <LiturgyPart key={i} title={title} prayers={prayers} />
            ))}
        </>
    );
};
