import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { FlatList, View } from "react-native";
import { useGlobalRefs } from "../../hooks/useGlobalRefs";
import { DrawerActions } from "@react-navigation/routers";
import { useNavigation } from "@react-navigation/core";
import { DrawerHeader } from "./DrawerHeader";
import { Box, HStack, Pressable, Text, VStack } from "@gluestack-ui/themed";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getLiturgy, Prayer as NewPrayer } from "@/utils/getLiturgy";

export const DrawerContent = () => {
    const insets = useSafeAreaInsets();
    const { currentPrayerId } = useGlobalRefs();
    const scrollRef = useRef<FlatList>(null);

    const liturgy = useMemo(() => getLiturgy(), []);
    const prayers = useMemo(() => liturgy.flatMap(({ prayers }) => prayers), [liturgy]);

    useEffect(() => {
        const currentPrayer = prayers.find(({ id }) => id === currentPrayerId);
        scrollRef?.current?.scrollToItem({ item: currentPrayer, animated: false });
    }, [currentPrayerId]);

    const getSectionTitle = (prayerId: string) =>
        liturgy && liturgy.find(({ prayers }) => prayers[0].id === prayerId)?.title;

    const renderItem = useCallback(
        ({ item, index }: { item: NewPrayer; index: number }) => (
            <ListItem index={index} title={getSectionTitle(item.id)} prayer={item} />
        ),
        [],
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

interface ListItemProps {
    index: number;
    title?: string;
    prayer: NewPrayer;
}
const ListItem = ({ index, title, prayer }: ListItemProps) => {
    const navigation = useNavigation();
    const { currentPrayerId, setCurrentPrayerId } = useGlobalRefs();
    const toggleDrawer = () => navigation.dispatch(DrawerActions.toggleDrawer());
    const isActive = prayer.id === currentPrayerId;

    return (
        <Box marginBottom={12}>
            {!!title && (
                <Box paddingTop={index !== 0 ? 14 : undefined} paddingBottom={6}>
                    <Text color="$white" size="lg" bold>
                        {title}
                    </Text>
                </Box>
            )}
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
        </Box>
    );
};
