import { RefObject } from "react";
import { View } from "react-native";

type ComponentMeasurements = { x: number; y: number; width: number; height: number };

export const measureComponent = (id: string, ref: RefObject<View>) => {
    return new Promise<[string, ComponentMeasurements]>((resolve) => {
        ref.current?.measure((x, y, width, height) => {
            resolve([id, { x, y, width, height }]);
        });
    });
};

export const measureComponents = async (componentRefMap: Record<string, RefObject<View>>) => {
    const promises = Object.entries(componentRefMap).map(([id, ref]) => measureComponent(id, ref));
    const yMap = await Promise.all(promises);
    return Object.fromEntries(yMap);
};
