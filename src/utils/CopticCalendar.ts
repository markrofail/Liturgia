const COPTIC_DATE_FORMATTER = new Intl.DateTimeFormat("en-u-ca-coptic", {
    year: "numeric",
    month: "long",
    day: "2-digit",
});

export const getCopticDate = (date = new Date()): Record<"year" | "month" | "day", string> => {
    const dateParts = COPTIC_DATE_FORMATTER.formatToParts(date)
        .filter(({ type }) => type !== "literal" && type !== "era")
        .map(({ type, value }) => [type, value]);

    return Object.fromEntries(dateParts);
};
