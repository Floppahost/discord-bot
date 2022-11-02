import { MessageEmbed, CommandInteraction, Client } from "discord.js";
import { Command } from "../interfaces/Command";

export const Unblacklist: Command = {
    name: "unblacklist",
    description: "Unblacklist a user.",
    type: 1,
    defaultMemberPermissions: 'ADMINISTRATOR',
    options: [
        {
            type: "USER",
            name: "user",
            description: "The user you want to unblacklist.",
            required: true,
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

        /* user.id = user discord id
            fetch unblacklist
            if (!success) return;
        */

        const embed = new MessageEmbed({
            color: user?.accentColor,
            title: `Successfully unblacklisted ${user!.username}#${user!.discriminator}!`,
            fields: [
                { name: 'Unblacklisted User', value: `Username: <@${user!.id}> \nUser ID: \`hostUser.uid\` \nDiscord ID: \`${user!.id}\`` },
                { name: 'Unblacklisted by:', value: `<@${interaction.user.id}>` }
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