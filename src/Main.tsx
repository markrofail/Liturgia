import React, { useRef, useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerButton, DrawerContent } from "./screens/DrawerContent";
import { HomeScreen } from "./screens/HomeScreen";
import { ActivePrayerProvider } from "./hooks/useActivePrayer";
import { View } from "react-native";
import { prayers } from "./data";
import { Prayer, PrayerRef } from "./types";

const Drawer = createDrawerNavigator();

export const Main = () => {
    const initialRef: PrayerRef = useRef<View>();
    const [activeRef, setActiveRef] = useState<PrayerRef>(initialRef);
    const prayersRegistry = Object.entries(prayers).map(([title, prayers]) => ({
        title,
        prayers: prayers.map((p) => ({ ...(p as Prayer), prayerRef: useRef<View>() })),
    }));

    return (
        <ActivePrayerProvider value={{ activeRef, setActiveRef, liturgy: prayersRegistry }}>
            <Drawer.Navigator
                drawerContent={DrawerContent}
                screenOptions={{ headerTitle: "", headerTransparent: true, headerLeft: DrawerButton }}
            >
                <Drawer.Screen name="Home" component={HomeScreen} />
            </Drawer.Navigator>
        </ActivePrayerProvider>
    );
};
