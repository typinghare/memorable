import { Command } from './Command'
import { CommandNotFoundException } from './CommandNotFoundException'

export class CommandManager {
    /**
     * Mapping from the word of commands and commands
     * @private
     */
    private readonly byWord: Map<string, Command[]> = new Map()

    /**
     * Registers a command.
     * @param command
     */
    public register(command: Command): Command {
        const word = command.getWord()

        const commandList = this.byWord.get(word)

        if (commandList) {
            commandList.push(command)
        } else {
            this.byWord.set(word, [command])
        }

        return command
    }

    /**
     * Gets a command.
     * @param word
     * @param numArgs
     */
    public getCommand(word: string, numArgs: number): Command {
        const command = this.find(word, numArgs)

        if (!command) {
            throw new CommandNotFoundException(word, numArgs)
        }

        return command
    }

    /**
     * Finds a command.
     * @param word
     * @param numArgs
     * @throws CommandNotFoundException if command does not exist
     * @private
     */
    private find(word: string, numArgs: number): Command | undefined {
        const commandList = this.byWord.get(word)

        if (commandList) {
            for (const command of commandList) {
                if (command.getNumArgs() === numArgs) {
                    return command
                }
            }
        }

        return undefined
    }
}