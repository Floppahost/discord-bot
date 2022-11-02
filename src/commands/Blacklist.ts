import { MessageEmbed, CommandInteraction, Client } from "discord.js";
import { Command } from "../interfaces/Command";

export const Blacklist: Command = {
    name: "blacklist",
    description: "Blacklist a user.",
    type: 1,
    defaultMemberPermissions: 'ADMINISTRATOR',
    options: [
        {
            type: "USER",
            name: "user",
            description: "The user you want to blacklist.",
            required: true,
        },
        {
            type: "STRING",
            name: "reason",
            description: "Reason for blacklist.",
            required: false,
        }
    ],
    run: async (client: Client, interaction: CommandInteraction) => {
        let user = interaction.options.getUser('user');
        if (!interaction.options.getUser('user')) {
            user = interaction.user;
        }
        if (user?.accentColor === null) {
            user.accentColor = undefined;
        }
        let reason: string | null = "No reason provided."
        if (interaction.options.getString('reason') != null) {
            reason = interaction.options.getString('reason');
        }

        /* user.id = user discord id
            fetch blacklist
            if (!success) return;
        */

        const embed = new MessageEmbed({
            color: user?.accentColor,
            title: `Successfully blacklisted ${user!.username}#${user!.discriminator}!`,
            fields: [
                { name: 'Blacklisted User', value: `Username: <@${user!.id}> \nUser ID: \`hostUser.uid\` \nDiscord ID: \`${user!.id}\`` },
                { name: 'Reason', value: `${reason}`, inline: true },
                { name: 'Blacklisted by:', value: `<@${interaction.user.id}>`, inline: true }
            ],
            footer: { text: `${interaction.user.username}#${interaction.user.discriminator}`, iconURL: interaction.user.displayAvatarURL() }
        });

        await interaction.followUp({
            ephemeral: true,
            content: `<@${user!.id}>`,
            embeds: [ embed ]
        });
    }
}; 