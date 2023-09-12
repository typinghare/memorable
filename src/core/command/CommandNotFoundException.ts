export class CommandNotFoundException extends Error {
    public constructor(
        private readonly word: string,
        private readonly numArgs: number,
    ) {
        super(`Command not found: [ ${word}(${numArgs}) ].`)
    }
}