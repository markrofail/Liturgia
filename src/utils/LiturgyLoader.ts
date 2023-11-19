import { liturgy } from "../../resources/prayers";
import { Prayer } from "../types";
import slugify from "slugify";

export const loadLiturgy = () => {
    return Object.entries(liturgy).map(([title, prayers]) => ({
        title,
        prayers: prayers.map((prayer) => ({ ...(prayer as Prayer), id: generatePrayerId(title, prayer) })),
    }));
};

const generatePrayerId = (prefix: string, prayer: Prayer) => slugify(`${prefix} ${prayer.title.english}`.toLowerCase());
