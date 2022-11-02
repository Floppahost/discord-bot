import { CommandInteraction, Client } from "discord.js";
import { Command } from "../interfaces/Command";

export const InviteWave: Command = {
    name: "invitewave",
    description: "Gives an invite to all users.",
    type: 1,
    defaultMemberPermissions: 'ADMINISTRATOR',
    run: async (client: Client, interaction: CommandInteraction) => {
        const members = interaction.guild!.members.cache.map(member => member.id);
        members.forEach(member => {
            /* member = discord id of member
                get host user id
                give host user invites
            */
        });
        const content = `Successfully gave an invite to everyone.`;

        await interaction.followUp({
            ephemeral: true,
            content
        });
    }
}; 