import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { FlatList, View } from "react-native";
import { DrawerActions } from "@react-navigation/routers";
import { useNavigation } from "@react-navigation/core";
import { Box, HStack, Pressable, Text, VStack } from "@gluestack-ui/themed";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DataEntry, Prayer as NewPrayer, getLiturgy } from "@src/utils/getLiturgy";
import { useGlobalRefs } from "@src/hooks/useGlobalRefs";
import { DrawerHeader } from "./DrawerHeader";

export const DrawerContent = () => {
    const { currentPrayerId } = useGlobalRefs();
    const scrollRef = useRef<FlatList>(null);

    const data = useMemo(() => getLiturgy(), []);
    const prayers = useMemo(() => data.filter(({ type }) => type === "data") as NewPrayer[], [data]);

    useEffect(() => {
        const currentPrayer = prayers.find(({ id }) => id === currentPrayerId);
        scrollRef?.current?.scrollToItem({ item: currentPrayer, animated: false });
    }, [currentPrayerId]);

    const insets = useSafeAreaInsets();
    const padding = {
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left + 12,
        paddingRight: insets.right + 12,
    };

    const renderItem = useCallback(
        ({ index, item }: { index: number; item: DataEntry }) => (
            <Box marginBottom={12}>
                {item.type === "title" ? (
                    <Box paddingTop={index !== 0 ? 14 : undefined} paddingBottom={6}>
                        <Text color="$white" size="lg" bold>
                            {item?.title?.english}
                        </Text>
                    </Box>
                ) : (
                    <ListItem index={index - 1} prayer={item} />
                )}
            </Box>
        ),
        []
    );

    return (
        <View style={{ flex: 1, backgroundColor: "black", ...padding }}>
            <DrawerHeader />
            <FlatList ref={scrollRef} data={data} keyExtractor={(item) => item.id!} renderItem={renderItem} />
        </View>
    );
};

interface ListItemProps {
    index: number;
    title?: string;
    prayer: NewPrayer;
}
const ListItem = ({ index, prayer }: ListItemProps) => {
    const navigation = useNavigation();
    const { currentPrayerId, setCurrentPrayerId } = useGlobalRefs();
    const toggleDrawer = () => navigation.dispatch(DrawerActions.toggleDrawer());
    const isActive = prayer.id === currentPrayerId;

    return (
        <Pressable
            bgColor={isActive ? "white" : "transparent"}
            paddingVertical={6}
            paddingHorizontal={20}
            borderRadius="$full"
            onPress={() => {
                toggleDrawer();
                setCurrentPrayerId(prayer.id);
            }}
        >
            <HStack alignItems="center" space="lg">
                <Text size="xl" color={isActive ? "$black" : "$white"}>
                    {index + 1}
                </Text>
                <VStack overflow="hidden" justifyContent="center">
                    <Text color={isActive ? "$black" : "$white"} direction="ltr" textAlign="left">
                        {prayer.title.english}
                    </Text>
                    <Text color={isActive ? "$black" : "$white"} direction="ltr" textAlign="left">
                        {prayer.title.arabic}
                    </Text>
                </VStack>
            </HStack>
        </Pressable>
    );
};
