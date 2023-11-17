import React from "react";
import { DrawerNavigationProp, createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerContent } from "./screens/DrawerContent";
import { HomeScreen } from "./screens/HomeScreen";
import { IconButton } from "react-native-paper";
import { DrawerActions, ParamListBase, useNavigation } from "@react-navigation/native";

const Drawer = createDrawerNavigator();

export const Main = () => {
    return (
        <Drawer.Navigator
            drawerContent={DrawerContent}
            screenOptions={{ headerTitle: "", headerTransparent: true, headerLeft: DrawerButton }}
        >
            <Drawer.Screen name="Home" component={HomeScreen} />
        </Drawer.Navigator>
    );
};

const DrawerButton = () => {
    const navigation = useNavigation();

    return (
        <IconButton icon="menu" iconColor="white" onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />
    );
};