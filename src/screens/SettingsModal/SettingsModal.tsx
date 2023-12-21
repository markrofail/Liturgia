import React from "react";
import {
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
import { FontSizeSlider } from "./FontSizeSlider";
import { ChangeDateCalendar } from "./ChangeDateCalendar";

interface SettingsModalProps {
    open: boolean;
    onClose: () => void;
}

export const SettingsModal = ({ open, onClose }: SettingsModalProps) => {
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
                        <FontSizeSlider />
                        <ChangeDateCalendar />
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
