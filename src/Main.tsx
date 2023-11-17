import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerButton, DrawerContent } from "./screens/DrawerContent";
import { HomeScreen } from "./screens/HomeScreen";

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
