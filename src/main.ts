import { App } from './core/App'
import process from 'process'
import { Constants } from './Constants'
import { Server } from './server/Server'
import { Client } from './server/Client'

const argv = process.argv
const args = argv.slice(2)

const app = new App()
app.init()

// Create a server
if (args[1] === '-v' || args[1] === '--version') {
    console.log(`${Constants.APP_NAME} v${Constants.APP_VERSION}`)
} else if (args[1] === 'server') {
    new Server(app)
} else {
    const promise = async (): Promise<void> => {
        const client = new Client(app)

        if (await client.testServer()) {
            const string = await client.sendCommand(JSON.stringify(args))
            console.log(string)
        } else {
            try {
                app.loadData()
                const execution = app.executeCommand(args)
                console.log(execution.getStringBuffer())

                app.saveData()
            } catch (e) {
                if (e instanceof Error) {
                    console.log(e.message)
                }
            }
        }
    }

    promise().then()
}