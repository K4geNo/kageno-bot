import {
    ApplicationCommandOptionType,
    ApplicationCommandType,
} from 'discord.js'

import { Command } from '../../types/Command'

export default new Command({
    name: 'limpar',
    description: 'Limpa mensagens do chat',
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'quantidade',
            description: 'Quantidade de mensagens a serem apagadas',
            type: ApplicationCommandOptionType.Integer,
            required: true,
        },
        {
            name: 'autor',
            description: 'Autor das mensagens a serem apagadas',
            type: ApplicationCommandOptionType.User,
            required: false,
        },
    ],
    async run({ interaction, options }) {
        if (!interaction.isChatInputCommand() || !interaction.inCachedGuild())
            return

        const { channel } = interaction

        await interaction.deferReply({
            ephemeral: true,
        })

        const amount = Math.min(options.getInteger('quantidade', true), 100)

        const mention = options.getUser('autor')

        if (!channel) {
            return interaction.editReply({
                content: 'Não foi possível encontrar o canal',
            })
        }

        const messages = await channel.messages.fetch()

        if (mention) {
            const messages = channel.messages.cache
                .filter((message) => message.author.id === mention.id)
                .first(amount)

            if (messages.length < 1) {
                await interaction.editReply({
                    content: `Não foram encontradas mensagens de ${mention} em ${channel}!`,
                })
                return
            }

            channel
                .bulkDelete(messages, true)
                .then((cleared) => {
                    interaction.editReply({
                        content: `Foram apagadas ${cleared.size} mensagens de ${mention} em ${channel}!`,
                    })
                })
                .catch((error) => {
                    interaction.editReply({
                        content: `Ocorreu um erro ao tentar apagar as mensagens: ${error}`,
                    })
                })

            return
        }

        channel
            .bulkDelete(messages.first(amount), true)
            .then((cleared) => {
                interaction.editReply({
                    content: `Foram apagadas ${cleared.size} mensagens em ${channel}!`,
                })
            })
            .catch((error) => {
                interaction.editReply({
                    content: `Ocorreu um erro ao tentar apagar as mensagens: ${error}`,
                })
            })
    },
})
