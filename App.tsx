import "react-native-gesture-handler";

import React from "react";
import { Text } from "react-native-paper";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { MD3DarkTheme, PaperProvider } from "react-native-paper";
import { Rubik_400Regular, Rubik_700Bold } from "@expo-google-fonts/rubik";
import { NotoSansCoptic_400Regular } from "@expo-google-fonts/noto-sans-coptic";
import { OpenSans_400Regular, OpenSans_700Bold } from "@expo-google-fonts/open-sans";
import { Main } from "./src/Main";

export default function App() {
    const [fontsLoaded] = useFonts({
        Rubik_400Regular,
        Rubik_700Bold,
        NotoSansCoptic_400Regular,
        OpenSans_400Regular,
        OpenSans_700Bold,
    });

    if (!fontsLoaded) {
        return <Text>Loading...</Text>;
    }
    return (
        <NavigationContainer>
            <PaperProvider theme={MD3DarkTheme}>
                <Main />
            </PaperProvider>
        </NavigationContainer>
    );
}
