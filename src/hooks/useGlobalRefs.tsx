import { Dispatch, MutableRefObject, SetStateAction, createContext, useContext } from "react";
import { FlatList } from "react-native";

interface GlobalRefs {
    liturgyContainerRef: MutableRefObject<FlatList | null>;
    currentPrayerId: string;
    setCurrentPrayerId: Dispatch<SetStateAction<string>>;
}

export const initDefaultGlobalRefs = (overrides?: Partial<GlobalRefs>): GlobalRefs => ({
    liturgyContainerRef: { current: null },
    currentPrayerId: "",
    setCurrentPrayerId: () => {},
    ...overrides,
});

const GlobalRefsContext = createContext<GlobalRefs>(initDefaultGlobalRefs());
export const GlobalRefsProvider = GlobalRefsContext.Provider;
export const useGlobalRefs = () => useContext(GlobalRefsContext);
