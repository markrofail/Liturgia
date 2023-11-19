import { Dispatch, SetStateAction, createContext, useContext } from "react";

const activeId = "";
const setActiveId: Dispatch<SetStateAction<string>> = () => {};
const ActivePrayerContext = createContext({ activeId, setActiveId });

export const ActivePrayerProvider = ActivePrayerContext.Provider;
export const useActivePrayer = () => useContext(ActivePrayerContext);
