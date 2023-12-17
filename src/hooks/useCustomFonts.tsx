import { useFonts } from "expo-font";
import { Rubik_400Regular, Rubik_700Bold } from "@expo-google-fonts/rubik";
import { NotoSerif_400Regular, NotoSerif_700Bold } from "@expo-google-fonts/noto-serif";

export const useCustomFonts = () =>
    useFonts({
        Rubik_400Regular,
        Rubik_700Bold,
        NotoSerif_400Regular,
        NotoSerif_700Bold,
        CopticForAll: require("../../assets/fonts/CopticForAll.ttf"),
    });
