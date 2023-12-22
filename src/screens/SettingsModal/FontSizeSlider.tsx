import React, { useState } from "react";
import { HStack, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text, VStack } from "@gluestack-ui/themed";
import * as settings from "@/settings";

export const FontSizeSlider = () => {
    const [fontSize, setFontSize] = useState<number>(settings.getFontSize());
    const onFontSizeChange = (value: number) => {
        setFontSize(value);
        settings.setFontSize(value);
    };

    return (
        <VStack space="md">
            <HStack space="md">
                <Text size="md" color="white" bold>
                    Font Size
                </Text>

                <Text size="md" color="white">
                    {fontSize}pt
                </Text>
            </HStack>
            <Slider
                width="100%"
                sliderTrackHeight={5}
                size="md"
                step={1}
                minValue={0}
                maxValue={30}
                value={fontSize}
                onChange={onFontSizeChange}
            >
                <SliderTrack bg="#6e6e6e">
                    <SliderFilledTrack bg="$white" />
                </SliderTrack>
                <SliderThumb bg="$white" />
            </Slider>
        </VStack>
    );
};
