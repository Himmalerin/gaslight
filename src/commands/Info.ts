import {Client, CommandInteraction, MessageActionRow, MessageButton} from "discord.js";
import {ApplicationCommandTypes, MessageButtonStyles} from "discord.js/typings/enums";
import {Command} from "../typings/interfaces";
import {inviteLink} from "../../config.json";

export const info: Command = {
    name: "bot",
    description: "Information about the bot.",
    type: ApplicationCommandTypes.CHAT_INPUT,
    run: async (client: Client, interaction: CommandInteraction): Promise<void> => {
        try {
            const row = new MessageActionRow();

            if (inviteLink.show) {
                row.addComponents(new MessageButton()
                    .setStyle(MessageButtonStyles.LINK)
                    .setURL(inviteLink.url)
                    .setLabel("Invite link"));
            }

            row.addComponents(new MessageButton()
                .setStyle(MessageButtonStyles.LINK)
                .setURL("https://github.com/himmalerin/gaslight")
                .setLabel("Source code"));

            await interaction.reply({
                content: `${client.user.username} is an open-source bot licensed under the EUPL-1.2.`,
                components: [row],
            });
        } catch (e) {
            await interaction.reply(`Something went wrong (\`${e}\`)`);

            console.error(e);
        }
    },
};
