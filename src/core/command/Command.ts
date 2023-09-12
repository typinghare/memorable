import { CommandExecution } from './CommandExecution'

/**
 * Command callback function.
 */
export type CommandCallback = (args: string[], execution: CommandExecution) => void

/**
 * Command.
 */
export class Command {
    /**
     * Creates a command.
     * @param word The word of this command
     * @param numArgs The number of arguments
     * @param callback The command callback function
     */
    public constructor(
        private readonly word: string,
        private readonly numArgs: number,
        private readonly callback: CommandCallback,
    ) {
    }

    public getWord(): string {
        return this.word
    }

    public getNumArgs(): number {
        return this.numArgs
    }

    public getCallback(): CommandCallback {
        return this.callback
    }
}