import { LatheManager } from './LatheManager'
import { EnhancerManager } from './EnhancerManager'
import { Enhancer } from './Enhancer'
import { ItemManager } from './ItemManager'
import { CommandManager } from './command/CommandManager'
import { Command } from './command/Command'
import { Constants } from '../Constants'
import { CommandNotFoundException } from './command/CommandNotFoundException'

/**
 * Enhancer class.
 */
export type EnhancerClass = new (app: App) => Enhancer

/**
 * Application.
 */
export class App {
    /**
     * Item manager.
     * @private
     */
    private readonly ItemManager: ItemManager = new ItemManager(this)

    /**
     * Lathe manager.
     * @private
     */
    private readonly latheManager: LatheManager = new LatheManager()

    /**
     * Lathe manager.
     * @private
     */
    private readonly enhancerManger: EnhancerManager = new EnhancerManager()

    /**
     * Command manager.
     * @private
     */
    private readonly commandManager: CommandManager = new CommandManager()

    /**
     * Creates an app.
     */
    public constructor() {
        this.registerGlobalCommands()
        this.registerCommands()
    }

    /**
     * Returns item manager.
     * @private
     */
    public getItemManger(): ItemManager {
        return this.ItemManager
    }

    /**
     * Returns lathe manager.
     */
    public getLatheManager(): LatheManager {
        return this.latheManager
    }

    /**
     * Returns enhancer manager.
     */
    public loadEnhancer(enhancerClass: EnhancerClass): void {
        const enhancer = this.enhancerManger.registerEnhancer(new enhancerClass(this))

        // Initialize the enhancer
        enhancer.init()
    }

    /**
     * Registers a command.
     * @param command The command to register
     */
    public registerCommand(command: Command): void {
        this.commandManager.register(command)
    }

    /**
     *
     * @param args
     */
    public executeCommand(args: string[]): void {
        const word: string = args[1] || ''
        const commandArgs: string[] = args.slice(2)

        try {
            const command = this.commandManager.getCommand(word, commandArgs.length)
            const callback = command.getCallback()
            callback(commandArgs)
        } catch (e) {
            if (e instanceof CommandNotFoundException) {
                console.log(e.message)
            }
        }
    }

    private registerGlobalCommands(): void {
        // $ --version
        this.commandManager.register(new Command('--version', 0, (): void => {
            console.log(`${Constants.APP_NAME} v${Constants.APP_VERSION}`)
        }))

        // $ -v
        this.commandManager.register(new Command('-v', 0, (): void => {
            console.log(`${Constants.APP_NAME} v${Constants.APP_VERSION}`)
        }))
    }

    private registerCommands(): void {
        // $ new
        this.commandManager.register(new Command('new', 0, (): void => {
            const item = this.getItemManger().createItem()
            console.log(this.getLatheManager().getLathe('printItem').process(item))
        }))

        // $ item [id]
        this.commandManager.register(new Command('item', 1, ([id]): void => {
            const numId = parseInt(id)
            const item = this.getItemManger().getById(numId)

            console.log(item)
        }))
    }
}