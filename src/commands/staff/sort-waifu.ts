import {
    ApplicationCommandOptionType,
    ApplicationCommandType,
    CommandInteraction,
    EmbedBuilder,
    PermissionsBitField,
} from 'discord.js'

import { Command } from '../../types/Command'
import { waifus } from '../../data/waifus'

export default new Command({
    name: 'sort-waifu',
    description: 'Sorteia grupos de waifus',
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'group',
            description: 'Sorteie waifus em grupos',
            type: ApplicationCommandOptionType.Subcommand,
        },
    ],
    async run({ interaction, options }) {
        if (
            !interaction.memberPermissions?.bitfield || // If the member doesn't have any permissions
            !interaction.memberPermissions.has(
                PermissionsBitField.Flags.ManageChannels,
            ) // If the member doesn't have the administrator permission
        ) {
            await interaction.reply({
                content: 'Você não tem permissão para usar esse comando!',
                ephemeral: true,
            })

            if (interaction instanceof CommandInteraction) {
                return setTimeout(() => interaction.deleteReply(), 5000)
            }
        }

        const subcommand = options.getSubcommand(true)

        if (subcommand === 'group') {
            function shuffle(array: Array<string>) {
                for (let i = array.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1))
                    const temp = array[i]
                    array[i] = array[j]
                    array[j] = temp
                }
            }

            function sortGroup(array: Array<string>, maxGroups: number) {
                const groups = []
                const groupSize = 4
                const numGroups = Math.min(
                    maxGroups,
                    Math.ceil(array.length / groupSize),
                )

                shuffle(array) // embaralha os personagens sem repetição

                for (let i = 0; i < numGroups; i++) {
                    const group = array.slice(
                        i * groupSize,
                        (i + 1) * groupSize,
                    )
                    groups.push(group)
                }

                return groups
            }

            const maxGroups = 8
            const groups = sortGroup(waifus, maxGroups)

            const fields = []
            for (let i = 0; i < groups.length; i++) {
                const name = `Grupo ${i + 1}`
                const value = groups[i].join('\n')
                fields.push({ name, value })
            }

            const embed = new EmbedBuilder({
                title: 'Sorteio de grupos',
                description: `Foram sorteados ${groups.length} grupos com ${groups[0].length} waifus cada.`,
                thumbnail: {
                    url: interaction.user.displayAvatarURL(),
                },
                author: {
                    name: interaction.user.username,
                    iconURL: interaction.user.displayAvatarURL(),
                },
                fields,
            })

            return await interaction.reply({
                embeds: [embed],
                ephemeral: true,
            })
        }
    },
})
