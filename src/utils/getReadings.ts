import { MultiLingualText } from "@src/types";
import { getCopticDate } from "@src/utils/copticCalendar";
import { getIsoDateString } from "@src/utils/dateUtils";
import ActsIndex from "@resources/readings/acts-of-the-apostles";
import CatholicEpistleIndex from "@resources/readings/catholic-epistle";
import PaulineEpistleIndex from "@resources/readings/pauline-epistle";
import SynaxariumIndex from "@resources/readings/synaxarium";
import MatinsPsalmIndex from "@resources/readings/matins-psalm";
import MatinsGospelIndex from "@resources/readings/matins-gospel";
import VespersPsalmIndex from "@resources/readings/vespers-psalm";
import VespersGospelIndex from "@resources/readings/vespers-gospel";
import LiturgyPsalmIndex from "@resources/readings/liturgy-psalm";
import LiturgyGospelIndex from "@resources/readings/liturgy-gospel";

export type ReadingType =
    | "matins-psalm"
    | "matins-gospel"
    | "vespers-psalm"
    | "vespers-gospel"
    | "pauline-epistle"
    | "catholic-epistle"
    | "acts-of-the-apostles"
    | "synaxarium"
    | "liturgy-psalm"
    | "liturgy-gospel";

export type Reading = {
    title: MultiLingualText;
    text: MultiLingualText;
};

export type Synaxarium = {
    title: MultiLingualText;
    commemorations: {
        title: MultiLingualText;
        text: MultiLingualText;
    }[];
};

type Index<T> = Record<
    string,
    {
        id: string;
        title: { english: string; arabic: string };
        content: Promise<T>;
    }
>;

const INDEX_MAP = {
    "matins-psalm": MatinsPsalmIndex as Index<Reading>,
    "matins-gospel": MatinsGospelIndex as Index<Reading>,
    "vespers-psalm": VespersPsalmIndex as Index<Reading>,
    "vespers-gospel": VespersGospelIndex as Index<Reading>,
    "liturgy-psalm": LiturgyPsalmIndex as Index<Reading>,
    "liturgy-gospel": LiturgyGospelIndex as Index<Reading>,
    "pauline-epistle": PaulineEpistleIndex as Index<Reading>,
    "catholic-epistle": CatholicEpistleIndex as Index<Reading>,
    "acts-of-the-apostles": ActsIndex as Index<Reading>,
    synaxarium: SynaxariumIndex as Index<Synaxarium>,
};

export const getReadings = async (globalDate: Date, readingType: ReadingType) => {
    if (readingType === "synaxarium") {
        const { month, day } = getCopticDate(globalDate);
        const filename = `${month}-${day}`.toLowerCase();
        return (await SynaxariumIndex[filename].content) as Synaxarium;
    } else {
        const filename = getIsoDateString(globalDate);
        return await INDEX_MAP[readingType][filename].content;
    }
};
