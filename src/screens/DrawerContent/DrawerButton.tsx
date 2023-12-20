import React from "react";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { Box, Button, ButtonIcon, MenuIcon } from "@gluestack-ui/themed";

export const DrawerButton = () => {
    const navigation = useNavigation();
    const toggleDrawer = () => navigation.dispatch(DrawerActions.toggleDrawer());

    return (
        <Box padding={10}>
            <Button borderRadius="$full" size="lg" p="$3.5" bg="$white" borderColor="$white" onPress={toggleDrawer}>
                <ButtonIcon color="black" as={MenuIcon} />
            </Button>
        </Box>
    );
};
