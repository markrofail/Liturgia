import React from "react";
import { Icon, CalendarDaysIcon, SettingsIcon, Button, ButtonIcon, Text, HStack } from "@gluestack-ui/themed";
import { getCopticDate } from "../../utils/copticCalendar";
import { useGlobalRefs } from "../../hooks/useGlobalRefs";
import { getGlobalDate } from "../../settings";

export const DrawerHeader = () => {
    const { toggleSettingsOpen } = useGlobalRefs();

    const globalDate = getGlobalDate();
    const { day, month, year } = getCopticDate(globalDate);
    const copticDateStr = `${day} ${month} ${year}`;

    return (
        <HStack space="4xl" padding={16} alignItems="center" justifyContent="flex-end">
            {/* Coptic Date */}
            <HStack space="md">
                <Icon as={CalendarDaysIcon} color="$white" size="xl" />
                <Text color="$white">{copticDateStr}</Text>
            </HStack>

            {/* Settings */}
            <Button borderRadius="$full" p="$2.5" bgColor="$white" onPress={toggleSettingsOpen}>
                <ButtonIcon as={SettingsIcon} color="$black" size="xl" />
            </Button>
        </HStack>
    );
};
