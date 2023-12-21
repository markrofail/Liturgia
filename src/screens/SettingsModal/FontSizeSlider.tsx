import React, { useState } from "react";
import {
    Center,
    HStack,
    Slider,
    SliderFilledTrack,
    SliderThumb,
    SliderTrack,
    Text,
    Tooltip,
    TooltipContent,
} from "@gluestack-ui/themed";
import * as settings from "../../settings";

export const FontSizeSlider = () => {
    const [fontSize, setFontSize] = useState<number>(settings.getFontSize());
    const onFontSizeChange = (value: number) => {
        setFontSize(value);
        settings.setFontSize(value);
    };

    return (
        <HStack space="md">
            <Text size="md" color="white" bold>
                Font Size
            </Text>

            <Text size="md" color="white">
                {fontSize}pt
            </Text>

            <Tooltip
                placement={"top"}
                trigger={(triggerProps) => (
                    <Center w="$80">
                        <Slider
                            minValue={0}
                            step={1}
                            maxValue={30}
                            sliderTrackHeight={5}
                            size="md"
                            value={fontSize}
                            onChange={(value) => onFontSizeChange(value)}
                        >
                            <SliderTrack bg="#6e6e6e">
                                <SliderFilledTrack bg="$white" />
                            </SliderTrack>
                            <SliderThumb bg="$white" {...triggerProps} />
                        </Slider>
                    </Center>
                )}
            >
                <TooltipContent>
                    <Text color="white">{fontSize}</Text>
                </TooltipContent>
            </Tooltip>
        </HStack>
    );
};
