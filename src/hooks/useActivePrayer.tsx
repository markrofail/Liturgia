import { Dispatch, SetStateAction, createContext, useContext } from "react";
import { Liturgy, PrayerRef } from "../types";

const initialRef: PrayerRef = { current: undefined };
const setActiveRef: Dispatch<SetStateAction<PrayerRef>> = () => {};
const liturgy: Liturgy = [];

const ActivePrayerContext = createContext({ activeRef: initialRef, setActiveRef, liturgy });

export const ActivePrayerProvider = ActivePrayerContext.Provider;
export const useActivePrayer = () => useContext(ActivePrayerContext);
