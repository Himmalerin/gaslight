import {Client, CommandInteraction, Interaction} from "discord.js";
import {Commands} from "../commands";
import {Command} from "../typings/interfaces";

export const interactionCreate: Function = (client: Client): void => {
    client.on("interactionCreate", async (interaction: Interaction): Promise<void> => {
        if (interaction.isCommand()) {
            await handleSlashCommand(client, interaction);
            return;
        }
    });
};


const handleSlashCommand: Function = async (client: Client, interaction: CommandInteraction): Promise<void> => {
    const slashCommand: Command = Commands.find(c => c.name === interaction.commandName);
    if (!slashCommand) {
        await interaction.reply("An error has occurred");
        return;
    }

    slashCommand.run(client, interaction);
};
