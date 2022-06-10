import {Client, CommandInteraction} from "discord.js";
import {ApplicationCommandOptionTypes, ApplicationCommandTypes} from "discord.js/typings/enums";
import {SubCommands} from "./bot";
import {Command} from "../typings/interfaces";

export const bot: Command = {
    name: "bot",
    description: "View information about the bot.",
    type: ApplicationCommandTypes.CHAT_INPUT,
    options: [
        {
            type: ApplicationCommandOptionTypes.SUB_COMMAND,
            name: "info",
            description: "Display information about the bot.",
        },
    ],
    run: async (client: Client, interaction: CommandInteraction): Promise<void> => {
        const subCommand: string = interaction.options.getSubcommand();

        const command: Function = SubCommands.find((command) => {
            if (subCommand === command.name) {
                return command;
            }
        });

        if (command === undefined) {
            await interaction.reply("Something went wrong!  That command doesn't seem to exist.");
            return;
        }

        await command(client, interaction);
    },
};
