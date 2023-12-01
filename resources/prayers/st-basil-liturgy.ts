import { generatePrayerIds } from "./utils";

import matins from "./00-matins";
import offertoryOfTheLamb from "./01-offertory-of-the-lamb";
import liturgyOfTheWord from "./02-liturgy-of-the-word";
import liturgyOfTheBelievers from "./03-liturgy-of-the-believers";
import distribution from "./04-distribution";

export default generatePrayerIds([
    { title: "Matins", prayers: matins },
    { title: "The Offertory", prayers: offertoryOfTheLamb },
    { title: "The Liturgy of the Word", prayers: liturgyOfTheWord },
    { title: "The Liturgy of the Believers", prayers: liturgyOfTheBelievers },
    { title: "Distribution", prayers: distribution },
])
