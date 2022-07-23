import {ChatInputCommandInteraction, Client} from "discord.js";
import {TimesUnits} from "../../typings/enums";

export const help: Function = async (client: Client, interaction: ChatInputCommandInteraction): Promise<void> => {
    try {
        const timeUnitsList = Object.values(TimesUnits).map((value) => `\`${value}\``);

        await interaction.reply(`
• \`/reminder add\`: Add a new reminder.
• \`/reminder remove\`: Remove an existing reminder by its ID.
• \`/reminder list\`: View a list of your reminders.

Example times: \`5 minutes\`, \`1 day\`, or \`4 weeks\`.
Valid units of time: ${timeUnitsList.join(", ")}.

You can choose to have reminders sent to your DMs instead of to a server channel by setting the \`private\` option to \`true\`.
Private reminders are unencrypted and remain viewable by the bot's operator.
`);
    } catch (e) {
        await interaction.reply(`Something went wrong (\`${e}\`)`);

        console.error(e);
    }
};
