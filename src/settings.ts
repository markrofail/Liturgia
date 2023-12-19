import { MMKV } from 'react-native-mmkv'

export const storage = new MMKV()

export const getZoomMultiplier = () => storage.getNumber("fontSize") ?? 1.4;
