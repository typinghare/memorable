import { App } from './App'
import { Lathes } from './LatheManager'

/**
 * Abstract enhancer.
 */
export abstract class Enhancer {
    /**
     * Creates an enhancer.
     * @param app The application
     * @protected
     */
    public constructor(protected readonly app: App) {
    }

    /**
     * Initializes this enhancer.
     */
    public init(): void {
    }

    /**
     * Retrieves a lathe.
     * @param latheName
     * @protected
     */
    protected lathe<L extends keyof Lathes>(latheName: L): Lathes[L] {
        return this.app.getLatheManager().getLathe(latheName)
    }
}