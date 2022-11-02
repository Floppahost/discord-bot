import { CommandInteraction, Client } from "discord.js";
import { Command } from "../interfaces/Command";

export const Ping: Command = {
    name: "ping",
    description: "Returns latency.",
    type: 1,
    run: async (client: Client, interaction: CommandInteraction) => {
        const content = `🏓 Pong! \n\`\`\`Latency: ${interaction.createdTimestamp - Date.now()}ms \nAPI Latency: ${Math.round(client.ws.ping)}ms\`\`\``;

        await interaction.followUp({
            ephemeral: true,
            content
        });
    }
}; 