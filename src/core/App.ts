import { LatheManager } from './lathe/LatheManager'
import { EnhancerManager } from './enhancer/EnhancerManager'
import { Enhancer } from './enhancer/Enhancer'
import { ItemManager } from './ItemManager'
import { CommandManager } from './command/CommandManager'
import { Command } from './command/Command'
import { Constants } from '../Constants'
import { CommandNotFoundException } from './command/CommandNotFoundException'
import { Loader } from './Loader'
import { Saver } from './Saver'
import { Class, SingletonContainer } from './SingletonContainer'
import { Configuration } from './Configuration'
import * as fs from 'fs'
import { getAbsolutePath } from './utils'
import { EnhancerNotFound } from './enhancer/EnhancerNotFound'
import { MissingRequiredEnhancer } from './enhancer/MissingRequiredEnhancer'

/**
 * Enhancer class.
 */
export type EnhancerClass = new (app: App) => Enhancer

/**
 * Application.
 */
export class App {
    /**
     * Singleton container.
     * @private
     */
    private readonly container: SingletonContainer = new SingletonContainer()

    /**
     * Creates an app.
     */
    public constructor() {
        // Singletons
        this.container.register(new Configuration())
        this.container.register(new ItemManager(this))
        this.container.register(new LatheManager())
        this.container.register(new EnhancerManager())
        this.container.register(new CommandManager())
        this.container.register(new Loader(this))
        this.container.register(new Saver(this))

        // Builtin commands
        this.registerGlobalCommands()
        this.registerCommands()
    }

    public loadConfig(): void {
        const configuration = this.getSingleton(Configuration)

        // Load convention config file
        const conventionContent = fs.readFileSync(Constants.CONVENTION_FILEPATH, 'utf-8')
        configuration.load(JSON.parse(conventionContent))

        // Load user config file
        const userConfigFilepath = configuration.getDatum('userConfigFilepath').value
        const userConfigFileAbsolutePath = getAbsolutePath(userConfigFilepath)
        if (fs.existsSync(userConfigFileAbsolutePath)) {
            const userConfigContent = fs.readFileSync(userConfigFileAbsolutePath, 'utf-8')
            configuration.load(JSON.parse(userConfigContent))
        }
    }

    public loadEnhancer(): void {
        const configuration = this.getSingleton(Configuration)
        const enhancerList = configuration.getDatum('enhancerList').value
        const enhancerManager = this.getSingleton(EnhancerManager)
        for (const enhancer of enhancerList) {
            const enhancerClass = Constants.ENHANCER_MAPPING[enhancer]
            if (!enhancerClass) {
                throw new EnhancerNotFound(enhancer)
            }

            try {
                const enhancer = enhancerManager.register(new enhancerClass(this))

                // Initialize the enhancer
                enhancer.init()
            } catch (e) {
                if (e instanceof EnhancerNotFound) {
                    throw new MissingRequiredEnhancer(enhancer, e.getEnhancerName())
                }
            }
        }
    }

    public loadData(): void {
        const configuration = this.getSingleton(Configuration)
        const dataFileAbsolutePath = getAbsolutePath(configuration.getDatum('dataFilepath').value)
        this.getSingleton(Loader).load(dataFileAbsolutePath)
    }

    /**
     * Initialize the app.
     */
    public init(): void {
        // Create "~/.mem" if it does not exist
        const userDir = getAbsolutePath('~/.mem')
        if (!fs.existsSync(userDir)) {
            fs.mkdirSync(userDir)
        }

        this.loadConfig()

        this.loadEnhancer()
    }

    /**
     * Returns a singleton object.
     * @param constructor The constructor of the singleton object
     */
    public getSingleton<T extends object>(constructor: Class<T>): T {
        return this.container.get(constructor)
    }

    /**
     * Registers a command.
     * @param command The command to register
     */
    public registerCommand(command: Command): void {
        this.getSingleton(CommandManager).register(command)
    }

    /**
     *
     * @param args
     */
    public executeCommand(args: string[]): void {
        const word: string = args[1] || ''
        const commandArgs: string[] = args.slice(2)

        try {
            const command = this.getSingleton(CommandManager).getCommand(word, commandArgs.length)
            const callback = command.getCallback()
            callback(commandArgs)
        } catch (e) {
            if (e instanceof CommandNotFoundException) {
                console.log(e.message)
            }
        }
    }

    public saveData(): void {
        const configuration = this.getSingleton(Configuration)
        const dataFilePath = configuration.getDatum('dataFilepath').value
        const absolutePath = getAbsolutePath(dataFilePath)

        this.getSingleton(Saver).saveAll(absolutePath)
    }

    private registerGlobalCommands(): void {
        const commandManager = this.getSingleton(CommandManager)

        // $ --version
        commandManager.register(new Command('--version', 0, (): void => {
            console.log(`${Constants.APP_NAME} v${Constants.APP_VERSION}`)
        }))

        // $ -v
        commandManager.register(new Command('-v', 0, (): void => {
            console.log(`${Constants.APP_NAME} v${Constants.APP_VERSION}`)
        }))
    }

    private registerCommands(): void {
        const commandManager = this.getSingleton(CommandManager)
        const itemManager = this.getSingleton(ItemManager)
        const latheManager = this.getSingleton(LatheManager)

        // $ new
        commandManager.register(new Command('new', 0, (): void => {
            const item = itemManager.createItem()
            console.log(latheManager.getLathe('printItem').process(item))
        }))

        // $ item [id]
        commandManager.register(new Command('item', 1, ([id]): void => {
            const item = itemManager.getById(parseInt(id))

            console.log(latheManager.getLathe('printItem').process(item))
        }))
    }
}