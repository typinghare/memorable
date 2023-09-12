export class CommandExecution {
    private buffer: string = ''

    public log(string: string): void {
        this.buffer += string
    }

    public getStringBuffer(): string {
        return this.buffer
    }
}