import 'colors'

import { ExtendedClient } from './structs/ExtendedClient'
import config from './structs/config.json'

const client = new ExtendedClient()

client.start()

export { client, config }
