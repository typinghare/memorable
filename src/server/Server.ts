import { App } from '../core/App'
import { Configuration } from '../core/Configuration'
import net from 'net'
import process from 'process'

export class Server {
    public constructor(private readonly app: App) {
        this.init()
    }

    public init(): void {
        this.app.loadData()

        const configuration = this.app.getSingleton(Configuration)
        const serverPort = configuration.getDatum('serverPort').value

        const server = net.createServer((socket): void => {
            socket.on('data', (commandBuffer: string): void => {
                const commandString = commandBuffer.toString()

                if (commandString === 'Memorable?') {
                    socket.write('Yes!')
                } else {
                    const args: string[] = JSON.parse(commandString)

                    try {
                        const execution = this.app.executeCommand(args)
                        socket.write(execution.getStringBuffer())
                    } catch (e: any) {
                        socket.write(e.toString())
                    }
                }
            })
        })

        process.on('SIGINT', (): void => {
            console.log('\nClosing server ...')
            this.app.saveData()

            console.log('Memorable server is closed.')
            process.exit(0)
        })

        server.listen(serverPort, (): void => {
            console.log(`Server listening on port ${serverPort}...`)
        })
    }
}