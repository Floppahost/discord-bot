import { CommandInteraction, Client, MessageEmbed } from "discord.js";
import axios from "axios";
import dotenv from 'dotenv';
import { Command } from "../interfaces/Command";
import GetUsersResponse from "./../types/GetUsersResponse";

dotenv.config();

export const Invite: Command = {
    name: "invite",
    description: "Give an invite to a user.",
    type: 1,
    options: [
        {
            type: "STRING",
            name: "username",
            description: "The username of the user you want to give an invite to.",
            required: true,
        }
    ],
    run: async (client: Client, interaction: CommandInteraction) => {
        const user = interaction.options.getString('username');
        const { status, data } = await axios.get<GetUsersResponse>(
            `${process.env.baseurl}/admin/invite/user`,
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
                title: `Successfully gave an invite to ${user}!`,
                footer: { text: `${interaction.user.username}#${interaction.user.discriminator}`, iconURL: interaction.user.displayAvatarURL() }
            });

            await interaction.followUp({
                ephemeral: true,
                embeds: [ embed ]
            });
            return;
        } else if (status === 501) {
            const embed = new MessageEmbed({
                title: `Invite only is turned off.`,
                footer: { text: `${interaction.user.username}#${interaction.user.discriminator}`, iconURL: interaction.user.displayAvatarURL() }
            });

            await interaction.followUp({
                ephemeral: true,
                embeds: [ embed ]
            });
            return;
        } else if (status === 404) {
            const embed = new MessageEmbed({
                title: `There is no user with this name.`,
                footer: { text: `${interaction.user.username}#${interaction.user.discriminator}`, iconURL: interaction.user.displayAvatarURL() }
            });

            await interaction.followUp({
                ephemeral: true,
                embeds: [ embed ]
            });
            return;
        } else {
            const embed = new MessageEmbed({
                title: `Error while creating invite wave.`,
                footer: { text: `${interaction.user.username}#${interaction.user.discriminator}`, iconURL: interaction.user.displayAvatarURL() }
            });

            await interaction.followUp({
                ephemeral: true,
                embeds: [ embed ]
            });
            return;
        }
    }
}; 