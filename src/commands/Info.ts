import {
    ActionRowBuilder,
    ApplicationCommandType,
    ButtonBuilder,
    ButtonStyle,
    Client,
    CommandInteraction,
} from "discord.js";
import {Command} from "../typings/interfaces";
import {inviteLink} from "../../config.json";

export const Info: Command = {
    name: "info",
    description: "Information about the bot.",
    type: ApplicationCommandType.ChatInput,
    run: async (client: Client, interaction: CommandInteraction): Promise<void> => {
        try {
            const row = new ActionRowBuilder() as ActionRowBuilder<ButtonBuilder>;

            if (inviteLink.show) {
                row.addComponents(new ButtonBuilder()
                    .setStyle(ButtonStyle.Link)
                    .setURL(inviteLink.url)
                    .setLabel("Invite link"));
            }

            row.addComponents(new ButtonBuilder()
                .setStyle(ButtonStyle.Link)
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
