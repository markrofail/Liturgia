import "react-native-gesture-handler";

import React from "react";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { NavigationContainer } from "@react-navigation/native";
import { useCustomFonts } from "./src/hooks/useCustomFonts";
import { Main } from "./src/Main";
import { StatusBar } from "expo-status-bar";

export default function App() {
    const [fontsLoaded] = useCustomFonts();
    if (!fontsLoaded) return null;

    return (
        <NavigationContainer>
            <GluestackUIProvider config={config}>
                <Main />
                <StatusBar style="dark" />
            </GluestackUIProvider>
        </NavigationContainer>
    );
}
