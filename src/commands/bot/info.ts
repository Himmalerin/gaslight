import {Client, CommandInteraction, MessageActionRow, MessageButton} from "discord.js";
import {MessageButtonStyles} from "discord.js/typings/enums";

export const info: Function = async (client: Client, interaction: CommandInteraction): Promise<void> => {
    try {
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setStyle(MessageButtonStyles.LINK)
                    .setURL("https://github.com/himmalerin/gaslight")
                    .setLabel("Source code"),
            );


        await interaction.reply({
            content: `${client.user.username} is an open-source bot licensed under the EUPL-1.2.`,
            components: [row],
        });
    } catch (e) {
        await interaction.reply(`Something went wrong (\`${e}\`)`);

        console.error(e);
    }
};
