import React, { useRef, useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { GlobalRefsProvider, initDefaultGlobalRefs } from "./hooks/useGlobalRefs";
import { DrawerButton, DrawerContent } from "./screens/DrawerContent";
import { HomeScreen } from "./screens/HomeScreen";

const Drawer = createDrawerNavigator();

export const Main = () => {
    const liturgyContainerRef = useRef(null);
    const [currentPrayerId, setCurrentPrayerId] = useState("");

    const globalRefs = initDefaultGlobalRefs({
        liturgyContainerRef,
        currentPrayerId,
        setCurrentPrayerId,
    });

    return (
        <GlobalRefsProvider value={globalRefs}>
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
