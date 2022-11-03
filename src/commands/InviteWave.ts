import { CommandInteraction, Client, MessageEmbed } from "discord.js";
import axios from "axios";
import dotenv from 'dotenv';
import { Command } from "../interfaces/Command";
import GetUsersResponse from "./../types/GetUsersResponse";

dotenv.config();

export const InviteWave: Command = {
    name: "invitewave",
    description: "Gives an invite to all users.",
    type: 1,
    defaultMemberPermissions: 'ADMINISTRATOR',
    run: async (client: Client, interaction: CommandInteraction) => {
        const { status, data } = await axios.get<GetUsersResponse>(
            `${process.env.baseurl}/api/profile/get`,
            {
                headers: {
                    Accept: 'application/json',
                    Authorization: `${process.env.jwt}`
                },
            }
        );

        if (status === 200) {
            const embed = new MessageEmbed({
                title: `Successfully gave an invite to everyone!`,
                footer: { text: `${interaction.user.username}#${interaction.user.discriminator}`, iconURL: interaction.user.displayAvatarURL() }
            });

            await interaction.followUp({
                ephemeral: true,
                embeds: [ embed ]
            });
            return;
        } else if (status === 400) {
            const embed = new MessageEmbed({
                title: `Invite only is turned off.`,
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