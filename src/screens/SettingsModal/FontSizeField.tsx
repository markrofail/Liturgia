import React from "react";
import { HStack, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text, VStack } from "@gluestack-ui/themed";

interface FontSizeFieldProps {
    value: number;
    onChange: (value: number) => void;
}

export const FontSizeField = ({ value, onChange }: FontSizeFieldProps) => {
    return (
        <VStack space="md">
            <HStack space="md">
                <Text size="md" color="white" bold>
                    Font Size
                </Text>

                <Text size="md" color="white">
                    {value}pt
                </Text>
            </HStack>
            <Slider
                width="100%"
                sliderTrackHeight={5}
                size="md"
                step={1}
                minValue={6}
                maxValue={30}
                value={value}
                onChange={onChange}
            >
                <SliderTrack bg="#6e6e6e">
                    <SliderFilledTrack bg="$white" />
                </SliderTrack>
                <SliderThumb bg="$white" />
            </Slider>
        </VStack>
    );
};
