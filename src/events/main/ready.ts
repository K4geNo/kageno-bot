import { Event } from '../../types/Event'
import { client } from '../..'

export default new Event({
    name: 'ready',
    once: true,
    async run() {
        const { commands, buttons, selects, modals } = client

        console.log('✅ Bot is online!')
        console.log(`🔍 Commands loaded: ${commands.size}`)
        console.log(`🔍 Buttons loaded: ${buttons.size}`)
        console.log(`🔍 Select menus loaded: ${selects.size}`)
        console.log(`🔍 Modals loaded: ${modals.size}`)
    },
})
