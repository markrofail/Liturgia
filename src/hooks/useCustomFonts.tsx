import { useFonts } from "expo-font";
import { Rubik_400Regular, Rubik_700Bold } from "@expo-google-fonts/rubik";
import { NotoSansCoptic_400Regular } from "@expo-google-fonts/noto-sans-coptic";
import { OpenSans_400Regular, OpenSans_700Bold } from "@expo-google-fonts/open-sans";

export const useCustomFonts = () =>
    useFonts({
        Rubik_400Regular,
        Rubik_700Bold,
        NotoSansCoptic_400Regular,
        OpenSans_400Regular,
        OpenSans_700Bold,
        CopticForAll: require("../../assets/fonts/CopticForAll.ttf"),
        Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
        InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
    });
