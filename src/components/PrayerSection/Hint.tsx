import React from "react";
import { XStack, Text } from "tamagui";
import { MultiLingualText } from "../../types";

interface HintProps extends MultiLingualText {}

export const Hint = ({ english, arabic }: HintProps) => {
    return (
        <XStack space>
            {english && <Text color="yellow">{english}</Text>}
            {arabic && <Text color="yellow">{arabic}</Text>}
        </XStack>
    );
};
