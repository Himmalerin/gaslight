import {ChatInputCommandInteraction, Client, GuildMember} from "discord.js";
import {getReminderByOwnerId} from "../../scripts/databaseActions";
import {truncateString} from "../../scripts/utils";
import {Reminder} from "../../typings/interfaces";

const generateReminderList = (array: Array<Reminder>): Array<string> => {
    array.sort((a, b) => a.due_at - b.due_at);

    return array.map((reminder: Reminder) => {
        const timestamp: number = Math.floor(reminder.due_at / 1000);
        const truncatedMessage: string = truncateString(reminder.message);
        const location = reminder.is_private ? "via DM" : `in <#${reminder.channel_id}>`;

        return `[\`${reminder.id}\`] - <t:${timestamp}:R> you'll be reminded about "${truncatedMessage}" ${location}.`;
    });
};

export const list: Function = async (client: Client, interaction: ChatInputCommandInteraction): Promise<void> => {
    const showPrivateReminders = interaction.options.getBoolean("private");

    try {
        const guildMember: GuildMember = await interaction.guild.members.fetch(interaction.user.id);

        const reminders: Array<Reminder> = getReminderByOwnerId().all(guildMember.user.id);

        if (reminders.length === 0) {
            await interaction.reply(`You don't have any reminders at this time.`);
            return;
        }

        const privateReminders: Array<Reminder> = reminders.filter((reminder: Reminder) => reminder.is_private === 1);
        const publicReminders: Array<Reminder> = reminders.filter((reminder: Reminder) => reminder.is_private === 0);

        if (showPrivateReminders) {
            const reminderList: Array<string> = generateReminderList(reminders);

            const interactionReplyContent: Array<string> = [
                "Your reminders:",
                ...reminderList,
            ];

            await interaction.reply({
                content: interactionReplyContent.join("\n"),
                ephemeral: true,
            });
        } else {
            if (publicReminders.length === 0) {
                await interaction.reply(`You don't have any public reminders at this time.`);
                return;
            }

            const reminders: Array<string> = generateReminderList(publicReminders);

            const interactionReplyContent: Array<string> = [
                "Your reminders:",
                ...reminders,
                privateReminders.length > 0 ? "You have additional private reminders." : undefined,
            ];

            await interaction.reply(interactionReplyContent.join("\n"));
        }
    } catch (e) {
        await interaction.reply(`Something went wrong (\`${e}\`)`);

        console.error(e);
    }
};
