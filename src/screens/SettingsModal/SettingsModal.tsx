import React, { useState } from "react";
import { storage, getZoomMultiplier } from "../../settings";
import {
    Button,
    ButtonText,
    Center,
    CloseIcon,
    HStack,
    Heading,
    Icon,
    Input,
    InputField,
    InputSlot,
    Modal,
    ModalBackdrop,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Slider,
    SliderFilledTrack,
    SliderThumb,
    SliderTrack,
    Text,
    Tooltip,
    TooltipContent,
    VStack,
} from "@gluestack-ui/themed";

interface SettingsModalProps {
    open: boolean;
    onClose: () => void;
}

export const SettingsModal = ({ open, onClose }: SettingsModalProps) => {
    const [fontSize, setFontSize] = useState<number>(getZoomMultiplier() * 10);
    const onFontSizeChange = (value: number) => {
        setFontSize(value);
        storage.set("fontSize", value / 10);
    };

    return (
        <Modal isOpen={open} onClose={onClose}>
            <ModalBackdrop />
            <ModalContent sx={{ backgroundColor: "$black" }}>
                <ModalHeader>
                    <Heading size="lg" color="white">
                        Settings
                    </Heading>
                    <ModalCloseButton>
                        <Icon as={CloseIcon} color="white" />
                    </ModalCloseButton>
                </ModalHeader>
                <ModalBody>
                    <VStack space="lg">
                        <HStack space="md">
                            <Text size="md" color="white" bold>
                                Font Size
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
                                            <SliderTrack>
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
                    </VStack>
                </ModalBody>
                <ModalFooter></ModalFooter>
            </ModalContent>
        </Modal>

        // <Portal>
        //     <Modal visible={open} onDismiss={onClose} contentContainerStyle={containerStyle}>
        //         <Text>{storage.getNumber("fontSize")}</Text>
        //         <TextInput label="Font Size" value={`${fontSize}`} onChangeText={onFontSizeChange} />
        //     </Modal>
        // </Portal>
    );
};
