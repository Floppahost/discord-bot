import { MessageEmbed, CommandInteraction, Client } from "discord.js";
import axios from 'axios';
import dotenv from 'dotenv';
import { Command } from "../interfaces/Command";
import GetUsersResponse from "./../types/GetUsersResponse";

dotenv.config();

export const Lookup: Command = {
    name: "lookup",
    description: "Lookup a user.",
    type: 1,
    options: [
        {
            type: "STRING",
            name: "username",
            description: "The username of the user you want to look up.",
            required: true,
        }
    ],
    run: async (client: Client, interaction: CommandInteraction) => {
        const user = interaction.options.getString('username');

        const { status, data } = await axios.get<GetUsersResponse>(
            `${process.env.baseurl}/profile/get/${user}`,
            {
                headers: {
                    Accept: 'application/json',
                    Authorization: `${process.env.jwt}`
                },
            }
        );

        if (status === 401) {
            const embed = new MessageEmbed({
                title: `An error occured while fetching the requested data.`,
                footer: { text: `${interaction.user.username}#${interaction.user.discriminator}`, iconURL: interaction.user.displayAvatarURL() }
            });

            await interaction.followUp({
                ephemeral: true,            
                embeds: [ embed ]
            });
            return;
        } else if (status === 404) {
            const embed = new MessageEmbed({
                title: `There is no user with this username.`,
                footer: { text: `${interaction.user.username}#${interaction.user.discriminator}`, iconURL: interaction.user.displayAvatarURL() }
            });

            await interaction.followUp({
                ephemeral: true,
                embeds: [ embed ]
            });
            return;
        } else {
            if (status != 200) {
                const embed = new MessageEmbed({
                    title: `An error occured while fetching the requested data.`,
                    footer: { text: `${interaction.user.username}#${interaction.user.discriminator}`, iconURL: interaction.user.displayAvatarURL() }
                });

                await interaction.followUp({
                    ephemeral: true,
                    embeds: [ embed ]
                });
                return;
            }
        }
        
        if (typeof(data.data?.uploads) === undefined) {
            if (typeof(data.data?.bio) === undefined) {
                const embed = new MessageEmbed({
                    title: `Profile of ${user}`,
                    author: { name: user!, icon_url: data.data?.avatar },
                    fields: [
                        { name: 'General', value: `Username: \`${user}\` \nUser ID: \`${data.data?.uid}\`` },
                    ],
                     footer: { text: `${interaction.user.username}#${interaction.user.discriminator}`, iconURL: interaction.user.displayAvatarURL() }
                });

                await interaction.followUp({
                    ephemeral: true,
                    embeds: [ embed ]
                });
            } else {
                const embed = new MessageEmbed({
                    title: `Profile of ${user}`,
                    author: { name: user!, icon_url: data.data?.avatar },
                    fields: [
                        { name: 'General', value: `Username: \`${user}\` \nUser ID: \`${data.data?.uid}\` \nBio: \`${data.data?.bio}\`` },
                    ],
                     footer: { text: `${interaction.user.username}#${interaction.user.discriminator}`, iconURL: interaction.user.displayAvatarURL() }
                });

                await interaction.followUp({
                    ephemeral: true,
                    embeds: [ embed ]
                });
            }
        } else {
            if (typeof(data.data?.bio) === undefined) {
                const embed = new MessageEmbed({
                    title: `Profile of ${user}`,
                    author: { name: user!, icon_url: data.data?.avatar },
                    fields: [
                        { name: 'General', value: `Username: \`${user}\` \nUser ID: \`${data.data?.uid}\`` },
                        { name: 'Stats', value: `Uploads: \`${data.data?.uploads}\`` },
                    ],
                     footer: { text: `${interaction.user.username}#${interaction.user.discriminator}`, iconURL: interaction.user.displayAvatarURL() }
                });

                await interaction.followUp({
                    ephemeral: true,
                    embeds: [ embed ]
                });
            } else {
                const embed = new MessageEmbed({
                    title: `Profile of ${user}`,
                    author: { name: user!, icon_url: data.data?.avatar },
                    fields: [
                        { name: 'General', value: `Username: \`${user}\` \nUser ID: \`${data.data?.uid}\` \nBio: \`${data.data?.bio}\`` },
                        { name: 'Stats', value: `Uploads: \`${data.data?.uploads}\`` },
                    ],
                     footer: { text: `${interaction.user.username}#${interaction.user.discriminator}`, iconURL: interaction.user.displayAvatarURL() }
                });

                await interaction.followUp({
                    ephemeral: true,
                    embeds: [ embed ]
                });
            }
        }
    }
}; 