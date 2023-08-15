import {
    ActionRowBuilder,
    ApplicationCommandType,
    ButtonBuilder,
    ButtonStyle,
    Collection,
} from 'discord.js'

import { Command } from '../../types/Command'

export default new Command({
    name: 'ping',
    type: ApplicationCommandType.ChatInput,
    description: 'Pong!',
    run: ({ interaction }) => {
        const row = new ActionRowBuilder<ButtonBuilder>({
            components: [
                new ButtonBuilder({
                    customId: 'test-button',
                    label: 'Test Button',
                    style: ButtonStyle.Success,
                }),
            ],
        })

        interaction.reply({
            content: 'Pong!',
            ephemeral: true,
            components: [row],
        })
    },
    buttons: new Collection([
        [
            'test-button',
            async (interaction) => {
                interaction.reply({
                    content: 'Button Clicked!',
                    ephemeral: true,
                })
            },
        ],
    ]),
})
