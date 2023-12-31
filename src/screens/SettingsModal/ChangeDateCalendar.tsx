import React, { useEffect, useState } from "react";
import { Calendar } from "react-native-calendars";
import { VStack, Text, Icon, ChevronRightIcon, ChevronLeftIcon, Center, HStack } from "@gluestack-ui/themed";
import * as settings from "../../settings";
import { getCopticDate } from "../../utils/copticCalendar";
import { Switch } from "@gluestack-ui/themed";
import { getGeorgianDateString } from "@/utils/dateUtils";

export const ChangeDateCalendar = () => {
    const [overrideDate, setOverrideDate] = useState(settings.getOverrideDate());
    const [isOverridden, setIsOverridden] = useState(!!overrideDate);

    const currentDate = isOverridden && overrideDate ? overrideDate : new Date();
    const copticDate = getCopticDate(currentDate);
    const isDifferent = new Date().toDateString() !== currentDate.toDateString();

    const dateStr = getGeorgianDateString(currentDate);
    const copticDateStr = `${copticDate.day} ${copticDate.month} ${copticDate.year}`;

    const dateISO = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
    useEffect(() => {
        if (!isDifferent) settings.clearOverrideDate();
        else settings.setOverrideDate(dateISO);
    }, [dateISO]);

    return (
        <VStack space="lg">
            <HStack space="lg">
                <HStack space="lg">
                    <Text size="md" color="white" bold>
                        Current Date
                    </Text>
                    <Text size="md" color={isDifferent ? "#ede61c" : "white"} bold={isDifferent}>
                        {dateStr}
                    </Text>
                </HStack>
            </HStack>
            <HStack space="lg">
                <Text size="md" color="white" bold>
                    Coptic Date
                </Text>
                <Text size="md" color={isDifferent ? "#ede61c" : "white"} bold={isDifferent}>
                    {copticDateStr}
                </Text>
            </HStack>
            <HStack space="lg" alignItems="center">
                <Text size="md" color="white" bold>
                    Override Date
                </Text>
                <Switch height={10} value={isOverridden} onToggle={setIsOverridden} />
            </HStack>
            {isOverridden && (
                <Calendar
                    renderArrow={(direction) =>
                        direction === "left" ? (
                            <Icon as={ChevronLeftIcon} color="$white" />
                        ) : (
                            <Icon as={ChevronRightIcon} color="$white" />
                        )
                    }
                    enableSwipeMonths
                    onDayPress={(day) => setOverrideDate(new Date(day.dateString))}
                    markedDates={{
                        [dateISO]: {
                            selected: true,
                            disableTouchEvent: true,
                            selectedColor: white,
                            selectedTextColor: black,
                        },
                    }}
                    theme={{
                        backgroundColor: black,
                        calendarBackground: black,
                        arrowColor: white,
                        disabledArrowColor: white,
                        textSectionTitleColor: white,
                        todayTextColor: white,
                        dayTextColor: white,
                        monthTextColor: white,
                        textDisabledColor: disabled,
                        textInactiveColor: black,
                        textSectionTitleDisabledColor: disabled,
                    }}
                />
            )}
        </VStack>
    );
};

const disabled = "#6e6e6e";
const white = "#ffffff";
const black = "#000000";
