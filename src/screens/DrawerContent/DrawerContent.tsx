import React, { useCallback, useEffect, useRef, useState } from "react";
import { FlatList, View } from "react-native";
import { Prayer } from "../../types";
import { useGlobalRefs } from "../../hooks/useGlobalRefs";
import { DrawerActions } from "@react-navigation/routers";
import { useNavigation } from "@react-navigation/core";
import { DrawerHeader } from "./DrawerHeader";
import { Box, HStack, Pressable, Text, VStack } from "@gluestack-ui/themed";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getLiturgy } from "@/utils/getLiturgy";

const ListItem = ({
    title,
    content,
    index,
    id,
}: {
    title?: string;
    id: string;
    content: Promise<Prayer>;
    index: number;
}) => {
    const [data, setData] = useState<Prayer>();
    useEffect(() => {
        content.then(setData);
    }, []);

    return (
        <Box marginBottom={12}>
            {title && (
                <Box paddingTop={index !== 0 ? 14 : undefined} paddingBottom={6}>
                    <Text color="$white" size="lg" bold>
                        {title}
                    </Text>
                </Box>
            )}
            {data && <MenuEntry index={index} prayer={{ ...data, id }} />}
        </Box>
    );
};
type Liturgy = {
    title: string;
    prayers: {
        id: string;
        content: Promise<Omit<Prayer, "id">>;
    }[];
}[];

export const DrawerContent = () => {
    const insets = useSafeAreaInsets();
    const { currentPrayerId } = useGlobalRefs();
    const scrollRef = useRef<FlatList>(null);
    const [liturgy, setLiturgy] = useState<Liturgy>();
    const prayers = liturgy ? liturgy.flatMap(({ prayers }) => prayers) : [];

    useEffect(() => {
        const data = getLiturgy();
        setLiturgy(data);
    }, []);

    useEffect(() => {
        const currentPrayer = prayers.find(({ id }) => id === currentPrayerId);
        scrollRef?.current?.scrollToItem({ item: currentPrayer, animated: false });
    }, [currentPrayerId]);

    const getSectionTitle = (prayerId: string) =>
        liturgy && liturgy.find(({ prayers }) => prayers[0].id === prayerId)?.title;

    const renderItem = useCallback(
        ({ item, index }: { item: { id: string; content: Promise<Prayer> }; index: number }) => (
            <ListItem
                title={getSectionTitle(item.id)}
                content={item.content}
                key={item.id}
                id={item.id}
                index={index}
            />
        ),
        []
    );

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
            <DrawerHeader />
            <FlatList ref={scrollRef} data={prayers} keyExtractor={(prayer) => prayer.id} renderItem={renderItem} />
        </View>
    );
};

interface MenuEntry {
    index: number;
    prayer: Prayer;
}
const MenuEntry = ({ index, prayer: { id, title } }: MenuEntry) => {
    const navigation = useNavigation();
    const { currentPrayerId, setCurrentPrayerId } = useGlobalRefs();
    const toggleDrawer = () => navigation.dispatch(DrawerActions.toggleDrawer());
    const isActive = id === currentPrayerId;

    return (
        <Pressable
            bgColor={isActive ? "white" : "transparent"}
            paddingVertical={6}
            paddingHorizontal={20}
            borderRadius="$full"
            onPress={() => {
                toggleDrawer();
                setCurrentPrayerId(id);
            }}
        >
            <HStack alignItems="center" space="lg">
                <Text size="xl" color={isActive ? "$black" : "$white"}>
                    {index + 1}
                </Text>
                <VStack overflow="hidden" justifyContent="center">
                    <Text color={isActive ? "$black" : "$white"} direction="ltr" textAlign="left">
                        {title.english}
                    </Text>
                    <Text color={isActive ? "$black" : "$white"} direction="ltr" textAlign="left">
                        {title.arabic}
                    </Text>
                </VStack>
            </HStack>
        </Pressable>
    );
};
