import React, { useRef, useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { GlobalRefsProvider, initDefaultGlobalRefs } from "./hooks/useGlobalRefs";
import { DrawerButton, DrawerContent } from "./screens/DrawerContent";
import { HomeScreen } from "./screens/HomeScreen";
import { SettingsModal } from "./screens/SettingsModal";

const Drawer = createDrawerNavigator();

export const Main = () => {
    const liturgyContainerRef = useRef(null);
    const [currentPrayerId, setCurrentPrayerId] = useState("");
    const [settingsOpen, setSettingsOpen] = useState(false);
    const toggleSettingsOpen = () => setSettingsOpen(!settingsOpen);

    const globalRefs = initDefaultGlobalRefs({
        liturgyContainerRef,
        currentPrayerId,
        setCurrentPrayerId,
        settingsOpen,
        toggleSettingsOpen,
    });

    return (
        <GlobalRefsProvider value={globalRefs}>
            <SettingsModal open={settingsOpen} onClose={toggleSettingsOpen} />
            <Drawer.Navigator
                initialRouteName="Home"
                drawerContent={() => <DrawerContent />}
                screenOptions={{ headerTitle: "", headerTransparent: true, headerLeft: DrawerButton }}
            >
                <Drawer.Screen name="Home" component={HomeScreen} />
            </Drawer.Navigator>
        </GlobalRefsProvider>
    );
};
