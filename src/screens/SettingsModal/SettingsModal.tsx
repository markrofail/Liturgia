import React, { useState } from "react";
import {
    Button,
    ButtonText,
    CloseIcon,
    Heading,
    Icon,
    Modal,
    ModalBackdrop,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    VStack,
} from "@gluestack-ui/themed";
import * as settings from "@src/settings";
import { FontSizeField } from "./FontSizeField";
import { CalendarDateField } from "./CalendarDateField";

interface SettingsModalProps {
    open: boolean;
    onClose: () => void;
}

export const SettingsModal = ({ open, onClose }: SettingsModalProps) => {
    const [fontSize, setFontSize] = useState(settings.getFontSize());
    const [overrideDate, setOverrideDate] = useState(settings.getOverrideDate());

    const onSave = () => {
        settings.setFontSize(fontSize);
        settings.setOverrideDate(overrideDate);
        onClose();
    };

    return (
        <Modal isOpen={open} onClose={onClose}>
            <ModalBackdrop />
            <ModalContent bgColor="$black">
                <ModalHeader paddingBottom={24}>
                    <Heading size="lg" color="white">
                        Settings
                    </Heading>
                    <ModalCloseButton>
                        <Icon as={CloseIcon} color="white" />
                    </ModalCloseButton>
                </ModalHeader>
                <ModalBody>
                    <VStack space="xl">
                        <FontSizeField value={fontSize} onChange={setFontSize} />
                        <CalendarDateField value={overrideDate} onChange={setOverrideDate} />
                    </VStack>
                </ModalBody>
                <ModalFooter>
                    <Button variant="outline" size="sm" action="secondary" mr="$3" onPress={onClose}>
                        <ButtonText color="$white">Cancel</ButtonText>
                    </Button>
                    <Button size="sm" action="positive" borderWidth="$0" onPress={onSave}>
                        <ButtonText>Save</ButtonText>
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
