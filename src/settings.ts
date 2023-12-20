import { MMKV } from 'react-native-mmkv'

export const storage = new MMKV()

export const getZoomMultiplier = () => storage.getNumber("zooMultiplier") ?? 1.4;
export const setZoomMultiplier = (value: number) => storage.set("zooMultiplier", value);

export const getFontSize = () => getZoomMultiplier() * 10;
export const setFontSize = (value: number) => setZoomMultiplier(value / 10);


export const getOverrideDate = () => {
    const overrideDate = storage.getString("overrideDate")
    return overrideDate ? new Date(overrideDate) : null
}
export const setOverrideDate = (date: string) => storage.set("overrideDate", date)
export const clearOverrideDate = () => storage.delete("overrideDate")

export const getGlobalDate = () => {
    const overrideDate = getOverrideDate()
    return overrideDate ? overrideDate : new Date()
}
