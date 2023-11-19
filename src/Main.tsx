import React, { useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerButton, DrawerContent } from "./screens/DrawerContent";
import { HomeScreen } from "./screens/HomeScreen";
import { ActivePrayerProvider } from "./hooks/useActivePrayer";

const Drawer = createDrawerNavigator();

export const Main = () => {
    const [activeId, setActiveId] = useState("");

    return (
        <ActivePrayerProvider value={{ activeId, setActiveId }}>
            <Drawer.Navigator
                drawerContent={DrawerContent}
                screenOptions={{ headerTitle: "", headerTransparent: true, headerLeft: DrawerButton }}
            >
                <Drawer.Screen name="Liturgia" component={HomeScreen} />
            </Drawer.Navigator>
        </ActivePrayerProvider>
    );
};
