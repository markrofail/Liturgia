import React, { useEffect } from "react";
import { ScrollView, View } from "react-native";
import { LiturgyPart } from "../../components/LiturgyPart";
import { useScrollIntoView, wrapScrollView } from "react-native-scroll-into-view";
import { useActivePrayer } from "../../hooks/useActivePrayer";

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
    const { liturgy, activeRef } = useActivePrayer();

    const scrollIntoView = useScrollIntoView();
    useEffect(() => {
        activeRef?.current && scrollIntoView(activeRef.current);
    }, [activeRef]);

    return (
        <>
            {liturgy.map(({ title, prayers }, i) => (
                <LiturgyPart key={i} title={title} prayers={prayers} />
            ))}
        </>
    );
};
