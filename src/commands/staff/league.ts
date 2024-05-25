import {
    ApplicationCommandOptionType,
    ApplicationCommandType,
} from 'discord.js'
import { Command } from '../../types/Command'
import { waifus } from '../../data/waifus'
import { shuffle } from '../../utils/shuffle'

export default new Command({
    name: 'start',
    description:
        'Gera grupos de personagens para o campeonato de League of Legends',
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'começar',
            description: 'Inicia o campeonato de League of Legends',
            type: ApplicationCommandOptionType.Boolean,
            required: true,
        },
    ],
    async run({ interaction, options }) {
        const start = options.getBoolean('começar', true)

        if (start) {
            const waifusShuffle = shuffle(waifus)

            const groups = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
            let response = ''

            groups.forEach((group) => {
                const grupoPersonagens = []
                for (let i = 0; i < 4; i++) {
                    const randomIndex = Math.floor(
                        Math.random() * waifusShuffle.length,
                    )
                    grupoPersonagens.push(waifusShuffle[randomIndex])
                    waifusShuffle.splice(randomIndex, 1)
                }

                response += `Grupo ${group}: ${grupoPersonagens.map((waifu) => waifu).join(', ')}\n`
            })

            await interaction.reply({
                content: response,
            })
        } else {
            await interaction.reply({
                content: 'O campeonato foi cancelado!',
            })
        }
    },
})
