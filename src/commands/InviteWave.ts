import { CommandInteraction, Client } from "discord.js";
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
            const content = `Successfully gave an invite to everyone.`;

            await interaction.followUp({
                ephemeral: true,
                content
            });
            return;
        } else if (status === 400) {
            const content = `Invite only is turned off.`;

            await interaction.followUp({
                ephemeral: true,
                content
            });
            return;
        } else {
            const content = `Error while creating invite wave.`;

            await interaction.followUp({
                ephemeral: true,
                content
            });
            return;
        }
    }
}; 