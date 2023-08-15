import { CommandInteractionOptionResolver } from 'discord.js'
import { Event } from '../../types/Event'
import { client } from '../..'

export default new Event({
    name: 'interactionCreate',
    async run(interaction) {
        if (!interaction.isCommand()) return

        const command = client.commands.get(interaction.commandName)

        if (!command) return

        const options = interaction.options as CommandInteractionOptionResolver

        command.run({
            client,
            interaction,
            options,
        })
    },
})
