import { MessageEmbed, CommandInteraction, Client } from "discord.js";
import { Command } from "../interfaces/Command";

export const Lookup: Command = {
    name: "lookup",
    description: "Lookup a user.",
    type: 1,
    options: [
        {
            type: "USER",
            name: "user",
            description: "The user you want to look up.",
            required: false,
        }
    ],
    run: async (client: Client, interaction: CommandInteraction) => {
        console.log(interaction)
        let user = interaction.options.getUser('user');
        if (!interaction.options.getUser('user')) {
            user = interaction.user;
        }
        if (user?.accentColor === null) {
            user.accentColor = undefined;
        }

        /* fetch user information
            fetch returns data

            hostUser {
                name<string>: data.name,
                uid<number>: data.uid,
                invites<number>: data.invites,
                invited<number>: data.invitedUsers.length,
                files<number>: data.files,
                storageUsed<number>: data.storageUsed, // in MB
                invitedBy<string>: data.invitedBy,
                currentDomain<string>: data.domain,
            }
        /*

            if (!hostUser) {
                ...
            }
        */

        const embed = new MessageEmbed({
            color: user?.accentColor,
            title: `${user!.username}#${user!.discriminator}`,
            // url: 'link to user profile'
            fields: [
                { name: 'General', value: `Username: \`hostUser.name\` \nUser ID: \`hostUser.uid\` \nDiscord ID: \`${user!.id}\`` },
                { name: 'Stats', value: `Invites: \`hostUser.invites\` \nInvited: \`hostUser.invited\` \nFiles: \`hostUser.files\` \nStorage used: \`hostUser.storageUsed\`` },
                { name: 'Misc', value: `Invited by: \`hostUser.invitedBy\` \nCurrent domain: \`hostUser.currentDomain\`` },
            ],
            footer: { text: `Profile of hostUser.name`, iconURL: interaction.user.displayAvatarURL() }
        });

        await interaction.followUp({
            ephemeral: true,
            embeds: [ embed ]
        });
    }
}; 