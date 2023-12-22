export const getGeorgianDateString = (currentDate: Date = new Date()) => {
    return currentDate.toLocaleDateString("en-GB", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};
