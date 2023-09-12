import { LatheManager } from './LatheManager'
import { EnhancerManager } from './EnhancerManager'
import { Enhancer } from './Enhancer'
import { ItemManager } from './ItemManager'

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
}