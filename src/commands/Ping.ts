import { CommandInteraction, Client, MessageEmbed } from "discord.js";
import { Command } from "../interfaces/Command";

export const Ping: Command = {
    name: "ping",
    description: "Returns latency.",
    type: 1,
    run: async (client: Client, interaction: CommandInteraction) => {
        const embed = new MessageEmbed({
            title: `🏓 Pong!`,
            fields: [
                { name: 'Latency', value: `${Math.abs(Date.now() - interaction.createdTimestamp)}ms `, inline: true },
                { name: 'API Latency', value: `${Math.round(client.ws.ping)}ms`, inline: true }
            ],
            footer: { text: `${interaction.user.username}#${interaction.user.discriminator}`, iconURL: interaction.user.displayAvatarURL() }
        });

        await interaction.followUp({
            ephemeral: true,
            embeds: [ embed ]
        });
    }
}; 