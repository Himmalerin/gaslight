import {Client, Collection, Intents} from "discord.js";
import {randomInt} from "crypto";
import {getReminders} from "./scripts/databaseActions";
import {scheduleReminder} from "./scripts/scheduleReminder";
import {interactionCreate, ready} from "./events";
import {Reminder} from "./typings/interfaces";
import {TimesInMilliseconds} from "./typings/enums";
import {token} from "../config.json";

const client: Client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
    ],
    partials: [
        "MESSAGE",
        "REACTION",
    ],
});

declare global {
    var __REMINDERS__: Collection<string, any>;
}

globalThis.__REMINDERS__ = new Collection()

try {
    const reminders: Array<Reminder> = getReminders().all();

    for (const reminder of reminders) {
        // Ensure any reminders that would have triggered when the bot was offline get sent out.
        if (reminder.due_at <= Date.now()) {
            // Generate a random amount of time between half a minute and two minutes to stagger out the reminders,
            // so we don't hit a rate limit by trying to send a ton of reminders at once.
            const randomMilliseconds = randomInt(TimesInMilliseconds.Minute / 2, TimesInMilliseconds.Minute * 2);

            reminder.due_at = Date.now() + TimesInMilliseconds.Minute + randomMilliseconds;
        }

        scheduleReminder(client, reminder);
    }
} catch (e) {
    console.error(e);
}

ready(client);

interactionCreate(client);

client.login(token);
