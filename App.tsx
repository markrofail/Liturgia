import "react-native-gesture-handler";

import React from "react";
import { Text } from "react-native-paper";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { MD3DarkTheme, PaperProvider } from "react-native-paper";
import { Main } from "./src/Main";

export default function App() {
    const [fontsLoaded] = useFonts({
        NotoSansCoptic: require("./assets/fonts/NotoSansCoptic-Regular.ttf"),
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
