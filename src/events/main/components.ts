import { Event } from '../../types/Event'
import { client } from '../..'

export default new Event({
    name: 'interactionCreate',
    async run(interaction) {
        if (interaction.isModalSubmit()) {
            client.modals.get(interaction.customId)?.(interaction)
        }

        if (interaction.isButton()) {
            client.buttons.get(interaction.customId)?.(interaction)
        }

        if (interaction.isStringSelectMenu()) {
            client.selects.get(interaction.customId)?.(interaction)
        }
    },
})
