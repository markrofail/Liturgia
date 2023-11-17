import React from "react";
import { IconButton } from "react-native-paper";
import { DrawerActions, useNavigation } from "@react-navigation/native";

export const DrawerButton = () => {
    const navigation = useNavigation();

    return (
        <IconButton icon="menu" iconColor="white" onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />
    );
};
