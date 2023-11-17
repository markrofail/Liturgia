import "react-native-gesture-handler";

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { MD3DarkTheme, PaperProvider } from "react-native-paper";
import { Main } from "./src/Main";

export default function App() {
  return (
    <NavigationContainer>
      <PaperProvider theme={MD3DarkTheme}>
        <Main />
      </PaperProvider>
    </NavigationContainer>
  );
}
