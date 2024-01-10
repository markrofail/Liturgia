import { getCopticDate } from "@src/utils/copticCalendar";

export const getIsoDateString = (currentDate: Date) => {
    return currentDate.toISOString().substring(0, 10);
};

export const getGeorgianDateString = (currentDate: Date) => {
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
    } as const;

    return currentDate.toLocaleDateString("en-GB", options);
};

export const getCopticDateString = (currentDate: Date) => {
    const { day, month, year } = getCopticDate(currentDate);
    return `${day} ${month} ${year}`;
};
