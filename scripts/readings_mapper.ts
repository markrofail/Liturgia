import * as fs from "fs";

const generateMap = (startDate: Date, endDate: Date) => {
    const oneDay = 24 * 60 * 60 * 1000; // milliseconds in one day
    const map: Record<string, any> = {};

    for (let date = startDate; date <= endDate; date = new Date(date.getTime() + oneDay)) {
        const formattedDate = date.toISOString().split("T")[0]; // format date to YYYY-MM-DD
        const filepath = (readingType: string) => `../../assets/text/readings/${readingType}/${formattedDate}.json`;

        map[formattedDate] = {
            "matins-psalm": filepath("matins-psalm"),
            "matins-gospel": filepath("matins-gospel"),
            "vespers-psalm": filepath("vespers-psalm"),
            "vespers-gospel": filepath("vespers-gospel"),
            "liturgy-psalm": filepath("liturgy-psalm"),
            "liturgy-gospel": filepath("liturgy-gospel"),
            "pauline-epistle": filepath("pauline-epistle"),
            "catholic-epistle": filepath("catholic-epistle"),
            "acts-of-the-apostles": filepath("acts-of-the-apostles"),
        };
    }

    return map;
};

const map = generateMap(new Date("2023-12-01"), new Date("2026-01-01"));
console.log(JSON.stringify(map, null, 2));
fs.writeFileSync("./readings_map.json", JSON.stringify(map, null, 2));
