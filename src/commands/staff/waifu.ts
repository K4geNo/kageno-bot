import {
    ActionRowBuilder,
    ApplicationCommandOptionType,
    ApplicationCommandType,
    ButtonBuilder,
    ButtonStyle,
    CommandInteraction,
    ComponentType,
    PermissionsBitField,
} from 'discord.js'

import { ButtonComponent } from '../../components/ButtonComponent'
import { Command } from '../../types/Command'
import { EmbedComponent } from '../../components/EmbedComponent'
import { UserVotes } from '../../types/Users'
import { calculateTime } from '../../utils/calculate-time'

// import { calculateTime } from '../../utils/calculate-time'

export default new Command({
    name: 'waifu-league',
    description: 'Crie um campeonato de waifu',
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'campeonato',
            description: 'Selecione o campeonato que deseja fazer',
            type: ApplicationCommandOptionType.String,
            choices: [
                {
                    name: 'Waifus League - Segunda Fase',
                    value: 'Waifus League - Segunda Fase',
                },
                {
                    name: 'Waifus League - Oitavas de Final',
                    value: 'Waifus League - Oitavas de Final',
                },
                {
                    name: 'Waifus League - Quartas de Final',
                    value: 'Waifus League - Quartas de Final',
                },
                {
                    name: 'Waifus League - Semifinal',
                    value: 'Waifus League - Semifinal',
                },
                {
                    name: 'Waifus League - Final',
                    value: 'Waifus League - Final',
                },
            ],
            required: true,
        },
        {
            name: 'waifu-one',
            description: 'Selecione a primeira waifu',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: 'waifu-two',
            description: 'Selecione a segunda waifu',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: 'image',
            description: 'Envie a foto das duelistas',
            type: ApplicationCommandOptionType.Attachment,
            required: true,
        },
        {
            name: 'hora',
            description: 'Escolha quando o campeonato irá acabar',
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [
                {
                    name: '12:00',
                    value: '12:00',
                },
                {
                    name: '18:00',
                    value: '18:00',
                },
                {
                    name: '20:00',
                    value: '20:00',
                },
                {
                    name: '24:00',
                    value: '24:00',
                },
            ],
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

        // Captura dos dados
        const campeonato = options.getString('campeonato', true)
        const waifuOne = options.getString('waifu-one', true)
        const waifuTwo = options.getString('waifu-two', true)
        const image = options.getAttachment('image', true)
        const endTime = options.getString('hora', true)

        let voteQuantityWaifuOne = 0
        let voteQuantityWaifuTwo = 0

        const extractNameOne = waifuOne.split(' - ')[0]
        const extractNameTwo = waifuTwo.split(' - ')[0]

        const embedComponent = EmbedComponent({
            title: campeonato,
            description: `\n\n💙 **${waifuOne}** \n\n❤️ **${waifuTwo}**\n\n`,
            thumbnailUrl: interaction.user.displayAvatarURL(),
            imageUrl: image.url,
            authorName: interaction.user.username,
            authorIconUrl: interaction.user.displayAvatarURL(),
            fields: [
                {
                    name: extractNameOne,
                    value: `Votos: \`${voteQuantityWaifuOne}\``,
                    inline: true,
                },
                {
                    name: extractNameTwo,
                    value: `Votos: \`${voteQuantityWaifuTwo}\``,
                    inline: true,
                },
            ],
            footer: {
                text: 'Clique nos botões abaixo para votar! ⬇️',
            },
            timestamp: new Date(),
        })

        const voteOneComponent = ButtonComponent({
            customId: 'voteOne',
            label: extractNameOne,
            style: ButtonStyle.Secondary,
            emoji: '💙',
        })

        const voteTwoComponent = ButtonComponent({
            customId: 'voteTwo',
            label: extractNameTwo,
            style: ButtonStyle.Secondary,
            emoji: '❤️',
        })

        const embed = embedComponent
        const voteOne = voteOneComponent
        const voteTwo = voteTwoComponent

        const row = new ActionRowBuilder<ButtonBuilder>({
            components: [voteOne, voteTwo],
        })

        const embedButton = await interaction.reply({
            embeds: [embed],
            components: [row],
        })

        const calculateEndTime = calculateTime(endTime)

        const collector = embedButton.createMessageComponentCollector({
            componentType: ComponentType.Button,
            time: calculateEndTime,
        })

        const userVotes: UserVotes = {}

        collector.on('collect', async (buttonInteraction) => {
            const previousVote = userVotes[buttonInteraction.user.id]
            const newVote = buttonInteraction.customId

            if (previousVote) {
                voteQuantityWaifuOne -= previousVote === 'voteOne' ? 1 : 0
                voteQuantityWaifuTwo -= previousVote === 'voteTwo' ? 1 : 0
            }

            userVotes[buttonInteraction.user.id] = newVote

            voteQuantityWaifuOne += newVote === 'voteOne' ? 1 : 0
            voteQuantityWaifuTwo += newVote === 'voteTwo' ? 1 : 0

            const updatedEmbedComponent = EmbedComponent({
                title: campeonato,
                description: `\n\n💙 **${waifuOne}** \n\n❤️ **${waifuTwo}**\n\n`,
                thumbnailUrl: interaction.user.displayAvatarURL(),
                imageUrl: image.url,
                authorName: interaction.user.username,
                authorIconUrl: interaction.user.displayAvatarURL(),
                fields: [
                    {
                        name: extractNameOne,
                        value: `Votos: \`${voteQuantityWaifuOne}\``,
                        inline: true,
                    },
                    {
                        name: extractNameTwo,
                        value: `Votos: \`${voteQuantityWaifuTwo}\``,
                        inline: true,
                    },
                ],
                footer: {
                    text: 'Clique nos botões abaixo para votar! ⬇️',
                },
                timestamp: new Date(),
            })

            const updatedEmbed = updatedEmbedComponent

            await buttonInteraction.update({
                embeds: [updatedEmbed],
                components: [row],
            })
        })
    },
})
