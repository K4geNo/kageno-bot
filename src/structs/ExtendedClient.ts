/* eslint-disable no-unsafe-optional-chaining */
import {
    ApplicationCommandDataResolvable,
    BitFieldResolvable,
    Client,
    ClientEvents,
    Collection,
    GatewayIntentsString,
    IntentsBitField,
    Partials,
} from 'discord.js'
import {
    CommandType,
    ComponentsButton,
    ComponentsModal,
    ComponentsSelect,
} from '../types/Command'

import { EventType } from '../types/Event'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'

dotenv.config()

const fileCondition = (fileName: string) =>
    fileName.endsWith('.ts') || fileName.endsWith('.js')

export class ExtendedClient extends Client {
    public commands: Collection<string, CommandType> = new Collection()
    public buttons: ComponentsButton = new Collection()
    public selects: ComponentsSelect = new Collection()
    public modals: ComponentsModal = new Collection()
    constructor() {
        super({
            intents: Object.keys(IntentsBitField.Flags) as BitFieldResolvable<
                GatewayIntentsString,
                number
            >,
            partials: [
                Partials.Channel,
                Partials.GuildMember,
                Partials.GuildScheduledEvent,
                Partials.Message,
                Partials.Reaction,
                Partials.ThreadMember,
                Partials.User,
            ],
        })
    }

    public start() {
        this.registerModules()
        this.registerEvents()
        this.login(process.env.BOT_TOKEN)
    }

    private registerCommands(
        commands: Array<ApplicationCommandDataResolvable>,
    ) {
        this.application?.commands
            .set(commands)
            .then(() => {
                console.log('✅ Slash Commands (/) defined')
            })
            .catch((error) => {
                console.log(
                    `❌ An error occurred while trying to set the Slash Commands (/): \n${error}`,
                )
            })
    }

    private registerModules() {
        const slashCommands: Array<ApplicationCommandDataResolvable> = []
        const commandsPath = path.join(__dirname, '..', 'commands')

        const registerCommand = async (local: string, fileName: string) => {
            const command: CommandType = (
                await import(`../commands/${local}/${fileName}`)
            )?.default

            const { name, buttons, selects, modals } = command

            if (name) {
                this.commands.set(name, command)
                slashCommands.push(command)

                if (buttons)
                    buttons.forEach((run, key) => this.buttons.set(key, run))
                if (selects)
                    selects.forEach((run, key) => this.selects.set(key, run))
                if (modals)
                    modals.forEach((run, key) => this.modals.set(key, run))
            }
        }

        const registerCommandsInDirectory = (local: string) => {
            const directoryPath = `${commandsPath}/${local}`
            fs.readdirSync(directoryPath)
                .filter(fileCondition)
                .forEach(async (fileName) => {
                    await registerCommand(local, fileName)
                })
        }

        fs.readdirSync(commandsPath).forEach((local) => {
            registerCommandsInDirectory(local)
        })

        this.on('ready', () => this.registerCommands(slashCommands))
    }

    private registerEvents() {
        const eventsPath = path.join(__dirname, '..', 'events')

        fs.readdirSync(eventsPath).forEach((local) => {
            fs.readdirSync(`${eventsPath}/${local}`)
                .filter(fileCondition)
                .forEach(async (fileName) => {
                    const { name, once, run }: EventType<keyof ClientEvents> = (
                        await import(`../events/${local}/${fileName}`)
                    )?.default

                    try {
                        if (name) {
                            if (once) {
                                this.once(name, run)
                            } else {
                                this.on(name, run)
                            }
                        }
                    } catch (error) {
                        console.log(
                            `An error occurred on event: ${name} \n${error}`,
                        )
                    }
                })
        })
    }
}
