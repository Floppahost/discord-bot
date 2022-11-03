import { MessageEmbed, CommandInteraction, Client, ClientPresenceStatus } from "discord.js";
import { Command } from "../interfaces/Command";

export const ChangePresence: Command = {
    name: "changepresence",
    description: "Change the bot's presence.",
    type: 1,
    defaultMemberPermissions: 'ADMINISTRATOR',
    options: [
        {
            type: "STRING",
            name: "presence",
            description: "The presence status you want to set the bot to (valid options: 'online', 'idle' or 'dnd').",
            required: true,
        }
    ],
    run: async (client: Client, interaction: CommandInteraction) => {
        const supportedPresences: string[] = ['online', 'idle', 'dnd'] 
        const supportedPresencesInWords: string[] = ['Online', 'Idle', 'Do Not Disturb']

        const presence: any = interaction.options.getString('presence')!;
        
        if (presence != null && supportedPresences.includes(presence)) {
            client.user?.setStatus(presence);

            const embed = new MessageEmbed({
                title: `Presence successfully set to \`${supportedPresencesInWords[supportedPresences.indexOf(presence)]}\`!`,
                footer: { text: `${interaction.user.username}#${interaction.user.discriminator}`, iconURL: interaction.user.displayAvatarURL() }
            });

            await interaction.followUp({
                ephemeral: true,
                embeds: [ embed ]
            });
        } else {
            const embed = new MessageEmbed({
                title: `Error while setting presence!`,
                description: `You need to enter a valid presence such as: \`online\`, \`idle\`, \`dnd\`, \`invinsible\`,`,
                footer: { text: `${interaction.user.username}#${interaction.user.discriminator}`, iconURL: interaction.user.displayAvatarURL() }
            });

            await interaction.followUp({
                ephemeral: true,
                embeds: [ embed ]
            });
        }
    }
}; 