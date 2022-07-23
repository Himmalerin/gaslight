import {ApplicationCommandOptionType, ApplicationCommandType, ChatInputCommandInteraction, Client} from "discord.js";
import {SubCommands} from "./reminder";
import {Command} from "../typings/interfaces";

export const Reminder: Command = {
    name: "reminder",
    description: "Add, remove, or edit a reminder.",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            type: ApplicationCommandOptionType.Subcommand,
            name: "add",
            description: "Add a new reminder.",
            options: [
                {
                    type: ApplicationCommandOptionType.String,
                    name: "time",
                    description: "When you want to be reminded.",
                    required: true,
                },
                {
                    type: ApplicationCommandOptionType.String,
                    name: "message",
                    description: "What you want to be reminded about.",
                    required: true,
                },
                {
                    type: ApplicationCommandOptionType.Boolean,
                    name: "private",
                    description: "Whether or not the reminder should sent privately via DM.",
                    required: false,
                },
            ],
        },
        {
            type: ApplicationCommandOptionType.Subcommand,
            name: "remove",
            description: "Remove an existing reminder by its ID.",
            options: [
                {
                    type: ApplicationCommandOptionType.String,
                    name: "id",
                    description: "ID of the reminder that should be removed.",
                    required: true,
                },
            ],
        },
        {
            type: ApplicationCommandOptionType.Subcommand,
            name: "list",
            description: "View your active reminders.",
            options: [
                {
                    type: ApplicationCommandOptionType.Boolean,
                    name: "private",
                    description: "Whether or not private reminders should be shown.  List will be hidden from others if true.",
                },
            ],
        },
        {
            type: ApplicationCommandOptionType.Subcommand,
            name: "help",
            description: "Get some help with reminders.",
        },
    ],
    run: async (client: Client, interaction: ChatInputCommandInteraction): Promise<void> => {
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
