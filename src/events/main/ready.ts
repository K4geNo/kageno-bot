import { Event } from '../../types/Event'
import { client } from '../..'

export default new Event({
    name: 'ready',
    once: true,
    async run() {
        const { commands, buttons, selects, modals } = client

        console.log('✅ Bot is online!'.green)
        console.log(`🔍 Commands loaded: ${commands.size}`.cyan)
        console.log(`🔍 Buttons loaded: ${buttons.size}`.cyan)
        console.log(`🔍 Select menus loaded: ${selects.size}`.cyan)
        console.log(`🔍 Modals loaded: ${modals.size}`.cyan)
    },
})
