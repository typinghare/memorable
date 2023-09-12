import { App } from '../core/App'
import { Configuration } from '../core/Configuration'
import net from 'net'

export class Client {
    private readonly serverPort: number

    public constructor(private readonly app: App) {
        const configuration = this.app.getSingleton(Configuration)
        this.serverPort = configuration.getDatum('serverPort').value
    }

    public async testServer(): Promise<boolean> {
        const client = new net.Socket()
        return new Promise((resolve): void => {
            client.connect(this.serverPort, 'localhost', (): void => {
                client.write('Memorable?')
            })

            client.on('data', (data): void => {
                resolve(data.toString() === 'Yes!')
                client.end()
            })

            client.on('error', (): void => {
                resolve(false)
            })

            client.setTimeout(5000, (): void => {
                console.error('Connection timeout')
                client.destroy()
                resolve(false)
            })
        })
    }

    public async sendCommand(command: string): Promise<string> {
        const client = new net.Socket()
        return new Promise((resolve): void => {
            client.connect(this.serverPort, 'localhost', (): void => {
                client.write(command)
            })

            client.on('data', (data): void => {
                resolve(data.toString())
                client.end()
            })
        })
    }
}