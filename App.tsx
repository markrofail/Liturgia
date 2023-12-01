import "react-native-gesture-handler";

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { MD3DarkTheme, PaperProvider } from "react-native-paper";
import { useCustomFonts } from "./src/hooks/useCustomFonts";
import { Main } from "./src/Main";
import { StatusBar } from "expo-status-bar";

export default function App() {
    const [fontsLoaded] = useCustomFonts();
    if (!fontsLoaded) return null;

    return (
        <NavigationContainer>
            <PaperProvider theme={MD3DarkTheme}>
                <Main />
                <StatusBar style="dark" />
            </PaperProvider>
        </NavigationContainer>
    );
}
