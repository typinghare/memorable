import { App } from '../App'
import { LatheManager, Lathes } from '../lathe/LatheManager'
import { EnhancerManager } from './EnhancerManager'
import { EnhancerNotFound } from './EnhancerNotFound'

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
        return this.app.getSingleton(LatheManager).getLathe(latheName)
    }

    /**
     * Check prerequisite.
     * @protected
     */
    protected require(enhancerName: string): void {
        const enhancerList = this.app.getSingleton(EnhancerManager).getEnhancerList()
        for (const enhancer of enhancerList) {
            if (Object.getPrototypeOf(enhancer).constructor.name === enhancerName) {
                return
            }
        }

        throw new EnhancerNotFound(enhancerName)
    }
}