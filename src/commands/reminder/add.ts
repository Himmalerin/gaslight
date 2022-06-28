import {Client, CommandInteraction} from "discord.js";
import {randomBytes} from "crypto";
import {addReminder, addUser, getUserById} from "../../scripts/databaseActions";
import {parseTime} from "../../scripts/parseTime";
import {scheduleReminder} from "../../scripts/scheduleReminder";
import {truncateString} from "../../scripts/utils";
import {Reminder, User} from "../../typings/interfaces";

export const add: Function = async (client: Client, interaction: CommandInteraction): Promise<void> => {
    const time: string = interaction.options.getString("time");
    const message: string = interaction.options.getString("message");
    const isPrivate: boolean = interaction.options.getBoolean("private");

    // The time must be at least one number, followed by a space, followed by at least one letter
    const pattern: RegExp = new RegExp(/\d+ [a-zA-Z]+/);

    if (pattern.test(time) === false) {
        await interaction.reply(`\`${time}\` isn't a valid time.`);
        return;
    }

    const lengthOfTime: number = Number(time.split(" ")[0]);
    const unitOfTime: string = time.split(" ")[1];

    try {
        const parsedTime: Date = parseTime(lengthOfTime, unitOfTime);

        // If the parsed time is less than the current time then the reminder was set in the past and is invalid.
        // This should never happen, but just to be sure.
        if (parsedTime.getTime() < Date.now()) {
            await interaction.reply("You can't set reminders in the past!");
            return;
        }

        const user: User = getUserById().get(interaction.user.id);

        if (user === undefined) {
            addUser().run({
                id: interaction.user.id,
            });
        }

        const reminderId: string = randomBytes(3).toString("hex");

        const reminder: Reminder = {
            id: reminderId,
            due_at: parsedTime.getTime(),
            message: message,
            owner_id: interaction.user.id,
            channel_id: interaction.channelId,
            is_private: isPrivate ? 1 : 0,
            created_at: Date.now(),
        };

        addReminder().run(reminder);
        scheduleReminder(client, reminder);

        const timestamp: number = Math.floor(parsedTime.getTime() / 1000);
        const truncatedMessage: string = truncateString(message);

        let interactionReplyContent: string = `[\`${reminderId}\`] - <t:${timestamp}:R> you'll be reminded about "${truncatedMessage}"`;

        if (isPrivate) {
            interactionReplyContent += `\nThis is a private reminder.  You must be able to recieve DMs from this bot to be reminded.`;
        }

        await interaction.reply({
            content: interactionReplyContent,
            ephemeral: isPrivate,
            allowedMentions: {parse: []},
        });

    } catch (e) {
        if (e === "invalid time") {
            await interaction.reply(`\`${time}\` isn't a valid time.`);
            return;
        }

        await interaction.reply(`Something went wrong (\`${e}\`)`);

        console.error(e);
    }
};
