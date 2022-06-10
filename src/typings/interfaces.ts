import {ChatInputApplicationCommandData, Client, CommandInteraction} from "discord.js";

export interface Command extends ChatInputApplicationCommandData {
    run: (client: Client, interaction: CommandInteraction) => void;
}

export interface Reminder {
    id: string;
    due_at: number;
    message: string;
    owner_id: string;
    channel_id: string;
    is_private: number;
    created_at: number;
}

export interface User {
    id: string;
    created_at: number;
    updated_at: number;
}
