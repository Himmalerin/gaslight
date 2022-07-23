import {ChatInputCommandInteraction, Client} from "discord.js";
import {getReminderById, removeReminder} from "../../scripts/databaseActions";
import {Reminder} from "../../typings/interfaces";

export const remove: Function = async (client: Client, interaction: ChatInputCommandInteraction): Promise<void> => {
    const id: string = interaction.options.getString("id");

    // The id must be six characters long and can only contain lowercase letters a-f and numbers 0-9.
    const pattern: RegExp = new RegExp(/[a-f\d]{6}/);

    if (pattern.test(id) === false) {
        await interaction.reply(`[\`${id}\`] - invalid reminder ID.`);
        return;
    }

    try {
        const reminder: Reminder = getReminderById().get(id);

        if (reminder === undefined || reminder.owner_id !== interaction.user.id) {
            await interaction.reply(`[\`${id}\`] - that reminder doesn't exist or doesn't belong to you.`);
            return;
        }

        // Remove the reminder from the database.
        removeReminder().run(id);

        // Cancel the reminder job, so it doesn't run. Then remove it from the global collection.
        globalThis.__REMINDERS__.get(id).cancel();
        globalThis.__REMINDERS__.delete(id);

        await interaction.reply(`[\`${id}\`] - reminder successfully removed.`);
    } catch (e) {
        await interaction.reply(`Something went wrong (\`${e}\`)`);

        console.error(e);
    }
};
