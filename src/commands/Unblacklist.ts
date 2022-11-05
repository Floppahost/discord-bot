import { CommandInteraction, Client, MessageEmbed } from "discord.js";
import axios from "axios";
import dotenv from 'dotenv';
import { Command } from "../interfaces/Command";
import GetUsersResponse from "./../types/GetUsersResponse";

dotenv.config();

export const Unblacklist: Command = {
    name: "unblacklist",
    description: "Unblacklist a user.",
    type: 1,
    defaultMemberPermissions: 'ADMINISTRATOR',
    options: [
        {
            type: "STRING",
            name: "username",
            description: "The username of the user you want to unblacklist.",
            required: true,
        }
    ],
    run: async (client: Client, interaction: CommandInteraction) => {
        const user = interaction.options.getUser('user');

        const { status, data } = await axios.get<GetUsersResponse>(
            `${process.env.baseurl}/admin/unblacklist`,
            {
                headers: {
                    Accept: 'application/json',
                    Authorization: `${process.env.jwt}`
                },
                data: { username: user }
            }
        );

        if (status === 200) {
            const embed = new MessageEmbed({
                title: `Successfully unblacklisted ${user}!`,
                footer: { text: `${interaction.user.username}#${interaction.user.discriminator}`, iconURL: interaction.user.displayAvatarURL() }
            });

            await interaction.followUp({
                ephemeral: true,
                embeds: [ embed ]
            });
        } else if (status === 404) {
            const embed = new MessageEmbed({
                title: `There is no user with the name ${user}!`,
                footer: { text: `${interaction.user.username}#${interaction.user.discriminator}`, iconURL: interaction.user.displayAvatarURL() }
            });

            await interaction.followUp({
                ephemeral: true,
                embeds: [ embed ]
            });
        } else {
            const embed = new MessageEmbed({
                title: `Error while unblacklisting user.`,
                footer: { text: `${interaction.user.username}#${interaction.user.discriminator}`, iconURL: interaction.user.displayAvatarURL() }
            });

            await interaction.followUp({
                ephemeral: true,
                embeds: [ embed ]
            });
        }
    }
}; 