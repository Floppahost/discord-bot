import { CommandInteraction, Client, MessageEmbed } from "discord.js";
import axios from "axios";
import dotenv from 'dotenv';
import { Command } from "../interfaces/Command";
import GetUsersResponse from "./../types/GetUsersResponse";

dotenv.config();

export const Blacklist: Command = {
    name: "blacklist",
    description: "Blacklist a user.",
    type: 1,
    defaultMemberPermissions: 'ADMINISTRATOR',
    options: [
        {
            type: "STRING",
            name: "user",
            description: "The username of the user you want to blacklist.",
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
        const user = interaction.options.getUser('user');
        let reason: string = "No reason provided."
        if (interaction.options.getString('reason') != null) {
            reason = interaction.options.getString('reason')!;
        }

        const { status, data } = await axios.get<GetUsersResponse>(
            `${process.env.baseurl}/admin/blacklist`,
            {
                headers: {
                    Accept: 'application/json',
                    Authorization: `${process.env.jwt}`
                },
                data: { username: user, reason: reason }
            }
        );

        if (status === 200) {
            const embed = new MessageEmbed({
                title: `Successfully blacklisted ${user}!`,
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
        } else if (status === 404) {
            const embed = new MessageEmbed({
                title: `There is no user with the name ${user}!`,
                footer: { text: `${interaction.user.username}#${interaction.user.discriminator}`, iconURL: interaction.user.displayAvatarURL() }
            });

            await interaction.followUp({
                ephemeral: true,
                content: `<@${user!.id}>`,
                embeds: [ embed ]
            });
        } else {
            const embed = new MessageEmbed({
                title: `Error while blacklisting user.`,
                footer: { text: `${interaction.user.username}#${interaction.user.discriminator}`, iconURL: interaction.user.displayAvatarURL() }
            });

            await interaction.followUp({
                ephemeral: true,
                content: `<@${user!.id}>`,
                embeds: [ embed ]
            });
        }
    }
}; 