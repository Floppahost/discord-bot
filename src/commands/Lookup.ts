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
            `${process.env.baseurl}/api/profile/get`,
            {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${process.env.jwt}`
                },
                data: { username: user }
            }
        );

        if (status === 401) {
            await interaction.followUp({
                ephemeral: true,
                content: 'An error occured while fetching the requested data.'
            });
            return;
        } else if (status === 404) {
            await interaction.followUp({
                ephemeral: true,
                content: 'There is no user with this username.'
            });
            return;
        } else {
            if (status != 200) {
                await interaction.followUp({
                    ephemeral: true,
                    content: 'An error occured while fetching the requested data.'
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
                    footer: { text: `Profile of hostUser.name`, iconURL: interaction.user.displayAvatarURL() }
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
                    footer: { text: `Profile of hostUser.name`, iconURL: interaction.user.displayAvatarURL() }
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
                    footer: { text: `Profile of hostUser.name`, iconURL: interaction.user.displayAvatarURL() }
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
                    footer: { text: `Profile of hostUser.name`, iconURL: interaction.user.displayAvatarURL() }
                });

                await interaction.followUp({
                    ephemeral: true,
                    embeds: [ embed ]
                });
            }
        }
    }
}; 