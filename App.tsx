import "react-native-gesture-handler";

import React from "react";
import { Text } from "react-native-paper";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { MD3DarkTheme, PaperProvider } from "react-native-paper";
import { Main } from "./src/Main";
import { Rubik_400Regular } from "@expo-google-fonts/rubik";
import { NotoSansCoptic_400Regular } from "@expo-google-fonts/noto-sans-coptic";

export default function App() {
    const [fontsLoaded] = useFonts({ Rubik_400Regular, NotoSansCoptic_400Regular });
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
