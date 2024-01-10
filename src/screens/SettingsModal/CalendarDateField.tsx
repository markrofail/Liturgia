import React, { useState } from "react";
import { Calendar, DateData } from "react-native-calendars";
import { VStack, Text, Icon, ChevronRightIcon, ChevronLeftIcon, HStack, Switch } from "@gluestack-ui/themed";
import { getCopticDateString, getGeorgianDateString, getIsoDateString } from "@src/utils/dateUtils";

interface CalendarDateFieldProps {
    value: Date | null;
    onChange: (value: Date | null) => void;
}
export const CalendarDateField = ({ value, onChange }: CalendarDateFieldProps) => {
    const [enabled, setEnabled] = useState(!!value);
    const currentDate = value ?? new Date();
    const isDifferent = new Date().toDateString() !== currentDate.toDateString();

    const onToggle = () => {
        setEnabled((prev) => !prev);
        onChange(null);
    };
    const onDateChange = (date: DateData) => {
        const newDate = new Date(date.dateString);
        if (getIsoDateString(newDate) !== getIsoDateString(new Date())) onChange(newDate);
    };

    const georgianDateStr = getGeorgianDateString(currentDate);
    const copticDateStr = getCopticDateString(currentDate);
    const isoDateStr = getIsoDateString(currentDate);

    return (
        <VStack space="md">
            <HStack space="lg">
                <Text size="md" color="white" bold>
                    Current Date
                </Text>
                <Text size="md" color={isDifferent ? emphasis : white} bold={isDifferent}>
                    {georgianDateStr}
                </Text>
            </HStack>

            <HStack space="lg">
                <Text size="md" color="white" bold>
                    Coptic Date
                </Text>
                <Text size="md" color={isDifferent ? emphasis : white} bold={isDifferent}>
                    {copticDateStr}
                </Text>
            </HStack>

            <HStack space="lg" alignItems="center">
                <Text size="md" color="white" bold>
                    Override Date
                </Text>
                <Switch height={10} value={enabled} onToggle={onToggle} />
            </HStack>

            {enabled && (
                <Calendar
                    renderArrow={(direction) =>
                        direction === "left" ? (
                            <Icon as={ChevronLeftIcon} color="$white" />
                        ) : (
                            <Icon as={ChevronRightIcon} color="$white" />
                        )
                    }
                    enableSwipeMonths
                    onDayPress={onDateChange}
                    markedDates={{
                        [isoDateStr]: {
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

const emphasis = "#ede61c";
const disabled = "#6e6e6e";
const white = "#ffffff";
const black = "#000000";
