import React from "react";
import { FAB } from "react-native-paper";
import { DrawerActions, useNavigation } from "@react-navigation/native";

export const DrawerButton = () => {
    const navigation = useNavigation();
    const toggleDrawer = () => navigation.dispatch(DrawerActions.toggleDrawer());

    return (
        <FAB
            icon="menu"
            color="black"
            size="small"
            style={{ backgroundColor: "white", borderRadius: 100, marginTop: 5, marginLeft: 5 }}
            onPress={toggleDrawer}
        />
    );
};
