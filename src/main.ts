import * as process from 'process'
import { App } from './core/App'
import { Configuration } from './core/Configuration'
import net from 'net'

const argv = process.argv
const args = argv.slice(2)

const app = new App()
app.loadConfig()
app.loadEnhancer()

// Create a server
if (args[1] === 'server') {
    app.loadData()

    const configuration = app.getSingleton(Configuration)
    const serverPort = configuration.getDatum('serverPort').value

    const server = net.createServer((socket): void => {
        socket.on('data', (commandBuffer: string): void => {
            const commandString = commandBuffer.toString()
            console.log('receive: ' + commandString)
        })
    })

    process.on('SIGINT', (): void => {
        console.log('Closing server ...')
        app.saveData()
        console.log('Memorable server is closed.')
    })

    server.listen(serverPort, (): void => {
        console.log(`Server listening on port ${serverPort}...`)
    })
} else {
    try {
        app.loadData()
        app.executeCommand(args)
        app.saveData()
    } catch (e) {
        if (e instanceof Error) {
            console.log(e.message)
        }
    }
}