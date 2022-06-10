import {Client, CommandInteraction} from "discord.js";
import {ApplicationCommandOptionTypes, ApplicationCommandTypes} from "discord.js/typings/enums";
import {SubCommands} from "./reminder";
import {Command} from "../typings/interfaces";

export const reminder: Command = {
    name: "reminder",
    description: "Add, remove, or edit a reminder.",
    type: ApplicationCommandTypes.CHAT_INPUT,
    options: [
        {
            type: ApplicationCommandOptionTypes.SUB_COMMAND,
            name: "add",
            description: "Add a new reminder.",
            options: [
                {
                    type: ApplicationCommandOptionTypes.STRING,
                    name: "time",
                    description: "When you want to be reminded.",
                    required: true,
                },
                {
                    type: ApplicationCommandOptionTypes.STRING,
                    name: "message",
                    description: "What you want to be reminded about.",
                    required: true,
                },
                {
                    type: ApplicationCommandOptionTypes.BOOLEAN,
                    name: "private",
                    description: "Whether or not the reminder should sent privately via DM.",
                    required: false,
                },
            ],
        },
        {
            type: ApplicationCommandOptionTypes.SUB_COMMAND,
            name: "remove",
            description: "Remove an existing reminder by its ID.",
            options: [
                {
                    type: ApplicationCommandOptionTypes.STRING,
                    name: "id",
                    description: "ID of the reminder that should be removed.",
                    required: true,
                },
            ],
        },
        {
            type: ApplicationCommandOptionTypes.SUB_COMMAND,
            name: "list",
            description: "View your active reminders.",
            options: [
                {
                    type: ApplicationCommandOptionTypes.BOOLEAN,
                    name: "private",
                    description: "Whether or not private reminders should be shown.  List will be hidden from others if true.",
                },
            ],
        },
        {
            type: ApplicationCommandOptionTypes.SUB_COMMAND,
            name: "help",
            description: "Get some help with reminders.",
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
