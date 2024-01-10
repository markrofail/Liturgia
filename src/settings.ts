import { MMKV } from "react-native-mmkv";
import { getIsoDateString } from "@src/utils/dateUtils";

const TEST_MODE = false
export const storage = !TEST_MODE ? new MMKV() : {
    getNumber: (_key: string) => undefined,
    getString: (_key: string) => undefined,
    set: (_key: string, _value: any) => { },
    delete: (_key: string) => { },
};

export const getZoomMultiplier = () => storage.getNumber("zooMultiplier") ?? 1.4;
export const setZoomMultiplier = (value: number) => storage.set("zooMultiplier", value);

export const getFontSize = () => getZoomMultiplier() * 10;
export const setFontSize = (value: number) => setZoomMultiplier(value / 10);

export const getOverrideDate = () => {
    const overrideDate = storage.getString("overrideDate");
    return overrideDate ? new Date(overrideDate) : null;
};
export const setOverrideDate = (date: Date | null) => {
    if (!date) storage.delete("overrideDate")
    else storage.set("overrideDate", getIsoDateString(date))
};

export const getGlobalDate = () => getOverrideDate() || new Date();
