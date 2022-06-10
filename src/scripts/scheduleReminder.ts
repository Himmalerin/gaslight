import {Client, TextChannel} from "discord.js";
import schedule from "node-schedule";
import {Reminder} from "../typings/interfaces";
import {removeReminder} from "./databaseActions";

export const scheduleReminder = (client: Client, reminder: Reminder) => {
    const date = new Date(reminder.due_at);

    const job = schedule.scheduleJob(date, function () {
        const timestamp: number = Math.floor(reminder.created_at / 1000);

        if (reminder.is_private) {
            sendDMReminder(client, reminder, timestamp);
        } else {
            sendChannelReminder(client, reminder, timestamp);
        }


        try {
            removeReminder().run(reminder.id);
            globalThis.__REMINDERS__.delete(reminder.id);
        } catch (e) {
            console.error(e);
        }
    });

    globalThis.__REMINDERS__.set(reminder.id, job);
};

const sendDMReminder: Function = async (client: Client, reminder: Reminder, timestamp): Promise<void> => {
    try {
        const dmChannel = await client.users.createDM(reminder.owner_id);

        await dmChannel.send(`<t:${timestamp}:R> <@${reminder.owner_id}> set a reminder: ${reminder.message}`);
    } catch (e) {
        console.error(e);
    }
};

const sendChannelReminder: Function = async (client: Client, reminder: Reminder, timestamp): Promise<void> => {
    try {
        const channel: TextChannel = client.channels.cache.get(reminder.channel_id) as TextChannel;

        await channel.send(`<t:${timestamp}:R> <@${reminder.owner_id}> set a reminder: ${reminder.message}`);
    } catch (e) {
        console.error(e);
    }
};