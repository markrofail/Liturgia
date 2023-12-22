import React from "react";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { Fab, FabIcon, MenuIcon } from "@gluestack-ui/themed";

export const DrawerButton = () => {
    const navigation = useNavigation();
    const toggleDrawer = () => navigation.dispatch(DrawerActions.toggleDrawer());

    return (
        <Fab size="md" placement="top left" bg="$white" borderColor="$white" onPress={toggleDrawer}>
            <FabIcon color="black" as={MenuIcon} size="xl" />
        </Fab>
    );
};
